import type { dbTransaction } from '@/db/db.js'
import type { CreateExamenCompleteSchemaProps } from '../docs/doc-create-examen.js'
import { v4 as uuidv4 } from 'uuid'
import { guardarArchivo } from '@/helpers/guardar-archivo.js'

export async function createExamen({
  item,
  prisma,
}: {
  item: CreateExamenCompleteSchemaProps
  prisma: dbTransaction
}) {
  const { preguntas, archivo: archivo_examen, ...examenData } = item

  const uuid_examen = uuidv4()
  let file_examen: string | null = null
  let tipo_examen: 'img' | 'audio' | 'video' | null = null
  if (archivo_examen) {
    const { file: file_archivo, tipo: tipo_archivo } = await guardarArchivo({
      archivo: archivo_examen,
      path_file_sin_extension: `/examenes/${uuid_examen}`,
    })
    file_examen = file_archivo
    tipo_examen = tipo_archivo
  }

  const examen = await prisma.examen.create({
    data: {
      ...examenData,
      ...(tipo_examen &&
        file_examen && {
          [tipo_examen]: file_examen,
        }),
      id: uuid_examen,
      preguntas: {
        create: await Promise.all(
          preguntas.map(async pregunta => {
            const uuid_pregunta = uuidv4()
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
                  path_file_sin_extension: `/examenes/preguntas/${uuid_examen}_${uuid_pregunta}`,
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
              id: uuid_pregunta,
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
                    const uuid_respuesta = uuidv4()
                    const { archivo: archivo_respuesta, ...respuestaData } =
                      respuesta
                    let file_respuesta: string | null = null
                    let tipo_respuesta: 'img' | 'audio' | 'video' | null = null
                    if (archivo_respuesta) {
                      const { file: file_archivo, tipo: tipo_archivo } =
                        await guardarArchivo({
                          archivo: archivo_respuesta,
                          path_file_sin_extension: `/examenes/preguntas/respuestas/${uuid_examen}_${uuid_pregunta}_${uuid_respuesta}`,
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
                      id: uuid_respuesta,
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
