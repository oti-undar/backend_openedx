import { db } from '@/db/db.js'
import { updatePreguntaEjecucionExamen } from '@/routes/ejecucion-examen/utils/update-pregunta-ejecucion-examen.js'

export const siguientePreguntaExamen = async (
  examen_id: string,
  siguiente_pregunta_id?: string
) => {
  return await db.$transaction(async prisma => {
    const ejecucionesExamen = await prisma.ejecucionExamen.findMany({
      where: {
        examen_id,
      },
      select: {
        user_id: true,
        pregunta_ejecucion_actual_id: true,
        pregunta_ejecucion_actual: {
          select: {
            respuesta_id: true,
          },
        },
      },
    })
    const preguntas_ejecucion_actual =
      ejecucionesExamen?.map(ejecucion => ({
        pregunta_ejecucion_actual_id: ejecucion.pregunta_ejecucion_actual_id,
        respuesta_id: ejecucion.pregunta_ejecucion_actual?.respuesta_id,
        user_id: ejecucion.user_id,
      })) || []

    const ejecuciones = await Promise.all(
      preguntas_ejecucion_actual.map(
        async ({ pregunta_ejecucion_actual_id, respuesta_id, user_id }) => {
          if (!pregunta_ejecucion_actual_id) return
          const ejecucion = await updatePreguntaEjecucionExamen({
            item: {
              final: new Date(),
              respuesta_id: respuesta_id || null,
              nueva_pregunta_actual: siguiente_pregunta_id
                ? {
                    examen_id,
                    pregunta_id: siguiente_pregunta_id,
                    user_id,
                  }
                : undefined,
            },
            pregunta_ejecucion_actual_id,
            prisma,
          })

          return {
            alumno_id: user_id,
            pregunta_ejecucion_actual_id:
              ejecucion.pregunta_ejecucion_actual_id,
          }
        }
      )
    )

    return ejecuciones
  })
}
