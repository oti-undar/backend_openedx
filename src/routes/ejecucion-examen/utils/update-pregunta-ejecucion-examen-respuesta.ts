import type { dbTransaction } from '@/db/db.js'
import type { PreguntasEjecucionExamen } from '@prisma/client'
import type { UpdatePreguntaEjecucionExamenRespuestaSchema } from '../docs/doc-update-pregunta-ejecucion-examen-respuesta.js'

export async function updatePreguntaEjecucionExamenRespuesta({
  item,
  prisma,
  pregunta_ejecucion_actual_id,
}: {
  item: UpdatePreguntaEjecucionExamenRespuestaSchema
  prisma: dbTransaction
  pregunta_ejecucion_actual_id: PreguntasEjecucionExamen['id']
}) {
  const { respuesta_id } = item

  await prisma.preguntasEjecucionExamen.update({
    where: {
      id: pregunta_ejecucion_actual_id,
    },
    data: {
      respuesta_id,
    },
  })
}
