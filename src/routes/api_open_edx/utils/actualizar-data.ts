import type { getUserIdSchemaProps } from '@/schemas/validation.js'
import { db, db_open_edx } from '@/db/db.js'

type Alumno = {
  user_id: number
  is_superuser: number
  is_staff: number
  is_active: number
  username: string
  first_name: string
  last_name: string
  email: string
}

type Instructor = {
  instructor_id: number
  instructor_is_superuser: number
  instructor_is_staff: number
  instructor_is_active: number
  instructor_username: string
  instructor_first_name: string
  instructor_last_name: string
  instructor_email: string
}

type Grouped = {
  course_id: string
  display_name: string
  alumnos: Alumno[]
  instructor: Instructor
}

export async function actualizarData({ item }: { item: getUserIdSchemaProps }) {
  const userId = item.user_id

  const data = await db_open_edx.$queryRaw<
    (Omit<Grouped, 'alumnos' | 'instructor'> & Alumno & Instructor)[]
  >`
    SELECT 
    e.course_id,
    c.display_name,

    u.id AS user_id,
    u.is_superuser,
    u.is_staff,
    u.is_active,
    u.username,
    u.first_name,
    u.last_name,
    u.email,
    
    iu.id AS instructor_id,
    iu.is_superuser AS instructor_is_superuser,
    iu.is_staff AS instructor_is_staff,
    iu.is_active AS instructor_is_active,
    iu.username AS instructor_username,
    iu.first_name AS instructor_first_name,
    iu.last_name AS instructor_last_name,
    iu.email AS instructor_email
    
    FROM student_courseaccessrole ar
    JOIN student_courseenrollment e 
    ON e.course_id = ar.course_id
    JOIN course_overviews_courseoverview c 
    ON c.id = e.course_id
    JOIN auth_user u
    ON u.id = e.user_id
    LEFT JOIN student_courseaccessrole ar2 
    ON ar2.user_id = e.user_id 
    AND ar2.course_id = e.course_id
    WHERE ar.user_id = ${userId}
    AND ar.role IN ('instructor', 'staff')
    AND ar2.user_id IS NULL
    AND c.display_name IS NOT NULL
    AND c.display_name <> '';
    `

  const result = Object.values(
    data.reduce<Record<string, Grouped>>(
      (
        acc,
        {
          course_id,
          display_name,
          instructor_id,
          instructor_is_superuser,
          instructor_is_staff,
          instructor_is_active,
          instructor_username,
          instructor_first_name,
          instructor_last_name,
          instructor_email,
          ...alumno
        }
      ) => {
        const key = `${course_id}-${display_name}`
        if (!acc[key]) {
          acc[key] = {
            course_id,
            display_name,
            alumnos: [],
            instructor: {
              instructor_id,
              instructor_is_superuser,
              instructor_is_staff,
              instructor_is_active,
              instructor_username,
              instructor_first_name,
              instructor_last_name,
              instructor_email,
            },
          }
        }
        acc[key].alumnos.push(alumno)
        return acc
      },
      {}
    )
  )

  db.$transaction(async prisma => {
    for (const item of result) {
      const { course_id, display_name, alumnos, instructor } = item

      const user = await prisma.user.upsert({
        where: {
          id: instructor.instructor_id,
        },
        update: {
          is_superuser: instructor.instructor_is_superuser === 1,
          is_staff: instructor.instructor_is_staff === 1,
          is_active: instructor.instructor_is_active === 1,
          username: instructor.instructor_username,
          first_name: instructor.instructor_first_name,
          last_name: instructor.instructor_last_name,
          email: instructor.instructor_email,
        },
        create: {
          id: instructor.instructor_id,
          is_superuser: instructor.instructor_is_superuser === 1,
          is_staff: instructor.instructor_is_staff === 1,
          is_active: instructor.instructor_is_active === 1,
          username: instructor.instructor_username,
          first_name: instructor.instructor_first_name,
          last_name: instructor.instructor_last_name,
          email: instructor.instructor_email,
        },
      })

      await prisma.curso.upsert({
        where: {
          id: course_id,
        },
        update: {
          name: display_name,
        },
        create: {
          id: course_id,
          name: display_name,
        },
      })

      await prisma.usuarioCurso.upsert({
        where: {
          user_id_curso_id: {
            user_id: user.id,
            curso_id: course_id,
          },
        },
        update: {
          is_instructor: true,
        },
        create: {
          user_id: user.id,
          curso_id: course_id,
          is_instructor: true,
        },
      })

      for (const alumno of alumnos) {
        const { user_id, is_superuser, is_staff, is_active, ...rest } = alumno
        const user_aux = {
          is_superuser: is_superuser === 1,
          is_staff: is_staff === 1,
          is_active: is_active === 1,
          ...rest,
        }
        await prisma.user.upsert({
          where: {
            id: user_id,
          },
          update: user_aux,
          create: {
            id: user_id,
            ...user_aux,
          },
        })

        await prisma.usuarioCurso.upsert({
          where: {
            user_id_curso_id: {
              user_id,
              curso_id: course_id,
            },
          },
          update: {
            is_instructor: false,
          },
          create: {
            user_id,
            curso_id: course_id,
            is_instructor: false,
          },
        })
      }
    }
  })
}
