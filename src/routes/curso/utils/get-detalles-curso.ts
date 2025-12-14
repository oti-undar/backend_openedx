import type { dbTransaction } from '@/db/db.js'
import type { getDetallesCursoSchemaProps } from '../docs/doc-get-detalles-curso.js'

export async function getDetallesCurso({
  item,
  prisma,
}: {
  item: getDetallesCursoSchemaProps
  prisma: dbTransaction
}) {
  const { id } = item
  const curso = await prisma.curso.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      usuarios: {
        select: {
          id: true,
          user_id: true,
          user: {
            select: {
              id: true,
              username: true,
              first_name: true,
              last_name: true,
              examenes_resueltos: {
                select: {
                  id: true,
                  examen_id: true,
                  examen: {
                    select: {
                      id: true,
                      peso: true,
                      preguntas: {
                        select: {
                          id: true,
                          puntos: true,
                        },
                      },
                    },
                  },
                  preguntas_resueltas: {
                    select: {
                      id: true,
                      respuesta_id: true,
                      pregunta: {
                        select: {
                          id: true,
                          puntos: true,
                        },
                      },
                      respuesta: {
                        select: {
                          id: true,
                          correcta: true,
                        },
                      },
                    },
                  },
                },
                where: {
                  examen: {
                    curso_id: id,
                  },
                },
              },
            },
          },
        },
      },
      examenes: {
        select: {
          peso: true,
        },
      },
    },
  })

  return curso
}
