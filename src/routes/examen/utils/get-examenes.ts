import type { dbTransaction } from '@/db/db.js'
import type { getUserIdSchemaProps } from '@/schemas/validation.js'

export async function getExamenes({
  item,
  prisma,
  incluirCorrecta = false,
}: {
  item: getUserIdSchemaProps
  prisma: dbTransaction
  incluirCorrecta?: boolean
}) {
  const examenes = await prisma.examen.findMany({
    where: {
      user_id: item.user_id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      curso: {
        select: {
          id: true,
          name: true,
        },
      },
      preguntas: {
        select: {
          id: true,
        },
      },
      state: {
        select: {
          name: true,
        },
      },
    },
  })

  return examenes
}
