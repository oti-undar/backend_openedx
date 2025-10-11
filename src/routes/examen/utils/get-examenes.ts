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
      tipo_examen: true,
      curso: {
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              usuarios: {
                where: {
                  id: {
                    not: item.user_id,
                  },
                },
              },
            },
          },
        },
      },
      ejecuciones: {
        select: {
          id: true,
          preguntas_resueltas: {
            include: {
              pregunta: {
                include: {
                  respuestas: true,
                  indicadores: true,
                },
              },
              respuesta: true,
            },
          },
        },
      },
      preguntas: {
        select: {
          id: true,
          puntos: true,
          indicadores: {
            select: {
              id: true,
            },
          },
        },
      },
      state: {
        select: {
          name: true,
        },
      },
      rubrica_analitica: {
        select: {
          id: true,
          name: true,
          indicadores: {
            select: {
              id: true,
              name: true,
              niveles_de_logro: {
                select: {
                  id: true,
                  name: true,
                  nota: true,
                },
              },
            },
          },
        },
      },
      rubrica_holistica: {
        select: {
          id: true,
          name: true,
          niveles_de_logro: {
            select: {
              id: true,
              name: true,
              nota: true,
            },
          },
        },
      },
    },
  })

  return examenes
}
