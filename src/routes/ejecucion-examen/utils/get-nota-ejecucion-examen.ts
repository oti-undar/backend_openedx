import type { dbTransaction } from '@/db/db.js'
import type { getUserIdSchemaProps } from '@/schemas/validation.js'
import type { EjecucionExamen, Prisma } from '@prisma/client'

export async function getNotaEjecucionExamen({
  item,
  prisma,
}: {
  item: getUserIdSchemaProps & { examen_id: EjecucionExamen['id'] }
  prisma: dbTransaction
}) {
  const { examen_id, user_id } = item

  const result = await prisma.ejecucionExamen.findFirstOrThrow({
    where: {
      examen_id,
      user_id,
    },
    include: {
      preguntas_resueltas: {
        where: {
          respuesta_id: {
            not: null,
          },
        },
        include: {
          pregunta: {
            select: {
              id: true,
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
      examen: {
        select: {
          id: true,
          preguntas: {
            select: {
              puntos: true,
            },
          },
        },
      },
    },
  })

  const total_puntos = result.examen.preguntas.reduce(
    (acc, item) => acc + item.puntos,
    0
  )

  const total_obtenido = getTotalObtenido({
    preguntas_resueltas: result.preguntas_resueltas,
  })
  return { nota: (total_obtenido * 20) / total_puntos }
}

function getTotalObtenido({
  preguntas_resueltas,
}: {
  preguntas_resueltas: Prisma.PreguntasEjecucionExamenGetPayload<{
    select: {
      pregunta: {
        select: {
          puntos: true
        }
      }
      respuesta: {
        select: {
          correcta: true
        }
      }
    }
  }>[]
}) {
  return (
    preguntas_resueltas.reduce(
      (acc, item) =>
        acc +
        (item.respuesta && item.respuesta?.correcta
          ? item?.pregunta?.puntos
          : 0),
      0
    ) ?? 0
  )
}
