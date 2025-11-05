import type { dbTransaction } from '@/db/db.js'
import type { CreateExamenCompleteSchemaProps } from '../docs/doc-create-examen.js'
import { guardarArchivo } from '@/helpers/guardar-archivo.js'
import cuid from 'cuid'
import { createJob } from '@/helpers/jobs.js'
import {
  empezarJobExamen,
  finalizarJobExamen,
} from '../helpers/finalizar-job-examen.js'
import { TipoExamen } from '@prisma/client'
import { createEjecucionExamen } from '@/routes/ejecucion-examen/utils/create-ejecucion-examen.js'

export async function createExamen({
  item,
  prisma,
}: {
  item: CreateExamenCompleteSchemaProps
  prisma: dbTransaction
}) {
  const { preguntas, archivo: archivo_examen, ...examenData } = item

  const cuid_examen = cuid()
  let file_examen: string | null = null
  let tipo_examen: 'img' | 'audio' | 'video' | null = null
  if (archivo_examen) {
    const { file: file_archivo, tipo: tipo_archivo } = await guardarArchivo({
      archivo: archivo_examen,
      path_file_sin_extension: `/examenes/${cuid_examen}`,
    })
    file_examen = file_archivo
    tipo_examen = tipo_archivo
  }

  // Tesd de cambio

  const examen = await prisma.examen.create({
    data: {
      ...examenData,
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

  if (examen.tipo_examen === TipoExamen.Solo) {
    const examen_aux = await prisma.examen.findUnique({
      where: {
        id: examen.id,
      },
      select: {
        id: true,
        curso: {
          select: {
            usuarios: {
              where: {
                user: {
                  id: { not: examen.user_id },
                },
              },
              select: {
                user_id: true,
              },
            },
          },
        },
        preguntas: {
          select: {
            id: true,
          },
        },
      },
    })
    if (!examen_aux) throw new Error('Examen no encontrado')

    const alumnos =
      examen_aux?.curso.usuarios.map(usuario => usuario.user_id) || []
    await Promise.all(
      alumnos.map(alumnoId => {
        return createEjecucionExamen({
          item: {
            user_id: alumnoId,
            examen_id: examen_aux.id,
            pregunta_id: examen_aux.preguntas[0].id,
          },
          prisma,
        })
      })
    )
  }

  if (examen.final_examen)
    createJob(examen.id, examen.final_examen, async () => {
      finalizarJobExamen(examen.id)
    })
  if (examen.inicio_examen)
    createJob(examen.id + 'inicio', examen.inicio_examen, async () => {
      empezarJobExamen(examen.id)
    })

  return examen
}
