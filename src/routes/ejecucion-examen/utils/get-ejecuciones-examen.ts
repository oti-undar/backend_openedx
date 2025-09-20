import type { dbTransaction } from '@/db/db.js'
import type { GetEjecucionesExamenSchemaProps } from '../docs/doc-get-ejecuciones-examen.js'

export async function getEjecucionesExamen({
  item,
  prisma,
}: {
  item: GetEjecucionesExamenSchemaProps
  prisma: dbTransaction
}) {
  const { examen_id, user_id } = item

  const result = await prisma.ejecucionExamen.findMany({
    where: {
      examen_id,
      user_id: {
        not: user_id,
      },
      examen: {
        user_id,
      },
    },
    include: {
      user: true,
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
  })

  return result
}
