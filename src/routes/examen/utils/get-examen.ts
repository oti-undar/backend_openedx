import type { dbTransaction } from '@/db/db.js'
import type { getExamenSchemaProps } from '../docs/doc-get-examen.js'
import type { Prisma } from '@prisma/client'

export async function getExamen({
  item,
  prisma,
  incluirCorrecta = false,
}: {
  item: {
    filters?: Prisma.ExamenWhereInput
    includes?: Prisma.ExamenInclude
  } & getExamenSchemaProps
  prisma: dbTransaction
  incluirCorrecta?: boolean
}) {
  const { filters = [], examen_id: id, includes = [] } = item
  const examen = await prisma.examen.findFirstOrThrow({
    where: {
      ...filters,
      id,
    },
    include: {
      curso: true,
      pregunta_actual_sync: true,
      preguntas: {
        include: {
          respuestas: {
            select: {
              id: true,
              respuesta: true,
              img: true,
              video: true,
              audio: true,
              correcta: incluirCorrecta,
            },
          },
          indicadores: true,
        },
      },
      ...includes,
    },
  })

  return examen
}
