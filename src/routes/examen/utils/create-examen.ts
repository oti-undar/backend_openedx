import type { dbTransaction } from '@/db/db.js'
import type { CreateExamenSchemaProps } from '../docs/doc-create-examen.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

export async function createExamen({
  item,
  prisma,
}: {
  item: CreateExamenSchemaProps
  prisma: dbTransaction
}) {
  const { preguntas, archivo, ...examenData } = item

  const uuid_examen = uuidv4()
  let file: string | null = null
  let tipo: 'img' | 'audio' | 'video' | null = null
  if (archivo) {
    const arrayBuffer = await archivo.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const extension = '.' + archivo.type.split('/')[1]
    const uuid_examen = uuidv4()
    file = `/examenes/${uuid_examen}${extension}`
    const path = `public${file}`

    await fs.promises.writeFile(path, buffer)

    const tipoMime = archivo.type.split('/')[0]
    tipo =
      tipoMime === 'image'
        ? 'img'
        : tipoMime === 'audio'
        ? 'audio'
        : tipoMime === 'video'
        ? 'video'
        : null
  }

  const examen = await prisma.examen.create({
    data: {
      ...examenData,
      ...(tipo &&
        file && {
          [tipo]: file,
        }),
      id: uuid_examen,
      preguntas: {
        create: preguntas.map(pregunta => {
          const { respuestas, ...preguntaData } = pregunta
          return {
            ...preguntaData,
            respuestas: {
              create: respuestas.map(respuesta => ({
                ...respuesta,
              })),
            },
          }
        }),
      },
    },
  })

  return examen
}
