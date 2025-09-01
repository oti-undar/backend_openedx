import type { dbTransaction } from '@/db/db.js'
import type { getEjecucionExamenRouteSchemaProps } from '../docs/doc-get-ejecucion-examen.js'

export async function getEjecucionExamen({
  item,
  prisma,
}: {
  item: getEjecucionExamenRouteSchemaProps
  prisma: dbTransaction
}) {
  const { examen_id, user_id } = item

  const result = await prisma.ejecucionExamen.findFirstOrThrow({
    where: {
      examen_id,
      user_id,
    },
    include: {
      pregunta_ejecucion_actual: {
        include: {
          pregunta: {
            include: {
              respuestas: true,
            },
          },
        },
      },
      preguntas_resueltas: {
        where: {
          respuesta_id: {
            not: null,
          },
        },
        include: {
          pregunta: true,
        },
      },
    },
  })

  const res = {
    ...result,
    pregunta_ejecucion_actual: {
      ...result.pregunta_ejecucion_actual!,
      pregunta: {
        ...result.pregunta_ejecucion_actual?.pregunta,
        respuestas: result.pregunta_ejecucion_actual?.pregunta?.respuestas.map(
          respuesta => ({
            ...respuesta,
            correcta: undefined,
          })
        ),
      },
    },
    preguntas_resueltas: result.preguntas_resueltas,
  }

  return res
}
