import type { dbTransaction } from '@/db/db.js'
import type { Examen, Prisma } from '@prisma/client'
import { getExamen } from './get-examen.js'
import type { UpdateExamenSchemaProps } from '../docs/doc-update-examen.js'

const includeGetExamenTiempoReal = {
  curso: {
    include: {
      usuarios: {
        select: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              username: true,
              examenes_resueltos: {
                select: {
                  examen_id: true,
                  preguntas_resueltas: {
                    select: {
                      pregunta: {
                        select: {
                          puntos: true,
                        },
                      },
                      respuesta: {
                        select: {
                          correcta: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  ejecuciones: {
    select: {
      preguntas_resueltas: {
        select: {
          pregunta_id: true,
        },
      },
    },
    take: 1,
  },
}

export async function updateExamen({
  item,
  examen_id,
  prisma,
}: {
  item: UpdateExamenSchemaProps
  examen_id: Examen['id']
  prisma: dbTransaction
}) {
  const examen = await prisma.examen.update({
    where: {
      id: examen_id,
    },
    data: item,
  })

  const examenActual = await getExamen({
    item: {
      examen_id: examen.id,
      includes: includeGetExamenTiempoReal,
    },
    prisma,
  })

  return examenActual
}
