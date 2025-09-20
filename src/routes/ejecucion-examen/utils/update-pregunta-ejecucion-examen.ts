import type { dbTransaction } from '@/db/db.js'
import type { PreguntasEjecucionExamen, Prisma } from '@prisma/client'
import type { UpdatePreguntaEjecucionExamenSchema } from '../docs/doc-update-pregunta-ejecucion-examen.js'
import { createEjecucionExamen } from './create-ejecucion-examen.js'
import { getEjecucionExamen } from './get-ejecucion-examen.js'

export async function updatePreguntaEjecucionExamen({
  item,
  prisma,
  pregunta_ejecucion_actual_id,
}: {
  item: UpdatePreguntaEjecucionExamenSchema
  prisma: dbTransaction
  pregunta_ejecucion_actual_id: PreguntasEjecucionExamen['id']
}) {
  const { nueva_pregunta_actual, ...rest } = item

  await prisma.preguntasEjecucionExamen.update({
    where: {
      id: pregunta_ejecucion_actual_id,
    },
    data: rest,
  })

  const pregunta_ejecucion_actualizada =
    await prisma.preguntasEjecucionExamen.findUniqueOrThrow({
      where: {
        id: pregunta_ejecucion_actual_id,
      },
      select: {
        ejecucion_examen_id: true,
        ejecucion_examen: {
          select: {
            user_id: true,
            examen_id: true,
          },
        },
      },
    })

  if (nueva_pregunta_actual) {
    await createEjecucionExamen({
      item: {
        user_id: nueva_pregunta_actual.user_id,
        examen_id: nueva_pregunta_actual.examen_id,
        pregunta_id: nueva_pregunta_actual.pregunta_id,
      },
      prisma,
    })
  } else {
    await prisma.ejecucionExamen.update({
      where: {
        id: pregunta_ejecucion_actualizada.ejecucion_examen_id,
      },
      data: {
        pregunta_ejecucion_actual_id: null,
      },
    })
  }

  const ejecucion_examen = await getEjecucionExamen({
    item: {
      examen_id: pregunta_ejecucion_actualizada.ejecucion_examen.examen_id,
      user_id: pregunta_ejecucion_actualizada.ejecucion_examen.user_id,
    },
    prisma,
  })

  return ejecucion_examen
}
