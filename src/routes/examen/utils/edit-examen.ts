import type { dbTransaction } from '@/db/db.js'
import type { EditExamenCompleteSchemaProps } from '../docs/doc-edit-examen.js'
import { guardarArchivo } from '@/helpers/guardar-archivo.js'
import cuid from 'cuid'
import type { Examen } from '@prisma/client'

export async function editExamen({
  item,
  prisma,
  id,
}: {
  item: EditExamenCompleteSchemaProps
  prisma: dbTransaction
  id: Examen['id']
}) {
  const {
    preguntas,
    archivo: archivo_examen,
    remove_archivo,
    ...examenData
  } = item

  const cuid_examen = id
  let file_examen: string | null = null
  let tipo_examen: 'img' | 'audio' | 'video' | null = null
  if (remove_archivo) {
    // Señal explícita de borrado: no reemplaza, solo limpia. No confundir con "no llegó archivo".
  } else if (archivo_examen) {
    const { file: file_archivo, tipo: tipo_archivo } = await guardarArchivo({
      archivo: archivo_examen,
      path_file_sin_extension: `/examenes/${cuid_examen}`,
    })
    file_examen = file_archivo
    tipo_examen = tipo_archivo
  }

  await prisma.pregunta.deleteMany({
    where: {
      examen_id: id,
    },
  })

  const examen = await prisma.examen.update({
    where: {
      id,
    },
    data: {
      ...examenData,
      ...(remove_archivo && { img: null, video: null, audio: null }),
      ...(tipo_examen &&
        file_examen && {
          [tipo_examen]: file_examen,
        }),
      id: cuid_examen,
      preguntas: {
        create: await Promise.all(
          preguntas.map(async pregunta => {
            const cuid_pregunta = cuid()
            const {
              respuestas,
              archivo: archivo_pregunta,
              indicadores,
              ...preguntaData
            } = pregunta
            let file_pregunta: string | null = null
            let tipo_pregunta: 'img' | 'audio' | 'video' | null = null
            if (archivo_pregunta) {
              const { file: file_archivo, tipo: tipo_archivo } =
                await guardarArchivo({
                  archivo: archivo_pregunta,
                  path_file_sin_extension: `/examenes/preguntas/${cuid_examen}_${cuid_pregunta}`,
                })
              file_pregunta = file_archivo
              tipo_pregunta = tipo_archivo
            }
            return {
              ...preguntaData,
              ...(tipo_pregunta &&
                file_pregunta && {
                  [tipo_pregunta]: file_pregunta,
                }),
              id: cuid_pregunta,
              ...(indicadores && {
                indicadores: {
                  connect: indicadores.map(indicador => ({
                    id: indicador,
                  })),
                },
              }),
              respuestas: {
                create: await Promise.all(
                  respuestas.map(async (respuesta, index) => {
                    const cuid_respuesta = cuid()
                    const { archivo: archivo_respuesta, ...respuestaData } =
                      respuesta
                    let file_respuesta: string | null = null
                    let tipo_respuesta: 'img' | 'audio' | 'video' | null = null
                    if (archivo_respuesta) {
                      const { file: file_archivo, tipo: tipo_archivo } =
                        await guardarArchivo({
                          archivo: archivo_respuesta,
                          path_file_sin_extension: `/examenes/preguntas/respuestas/${cuid_examen}_${cuid_pregunta}_${cuid_respuesta}`,
                        })
                      file_respuesta = file_archivo
                      tipo_respuesta = tipo_archivo
                    }
                    return {
                      ...respuestaData,
                      ...(tipo_respuesta &&
                        file_respuesta && {
                          [tipo_respuesta]: file_respuesta,
                        }),
                      id: cuid_respuesta,
                      correcta: index === 0,
                    }
                  })
                ),
              },
            }
          })
        ),
      },
    },
  })

  return examen
}
