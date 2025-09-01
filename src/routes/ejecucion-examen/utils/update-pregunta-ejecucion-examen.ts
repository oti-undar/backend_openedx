import type { dbTransaction } from '@/db/db.js'
import type { PreguntasEjecucionExamen, Prisma } from '@prisma/client'
import type { UpdatePreguntaEjecucionExamenSchema } from '../docs/doc-update-pregunta-ejecucion-examen.js'
import { createEjecucionExamen } from './create-ejecucion-examen.js'

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
  const pregunta_ejecucion_actualizada =
    await prisma.preguntasEjecucionExamen.update({
      where: {
        id: pregunta_ejecucion_actual_id,
      },
      data: rest,
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

  return pregunta_ejecucion_actualizada
}
