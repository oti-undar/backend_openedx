import type { dbTransaction } from '@/db/db.js'
import type { getUserIdSchemaProps } from '@/schemas/validation.js'
import type {
  ExamenWhereInputSchemaProps,
  getExamenSchemaProps,
} from '../docs/doc-get-examen.js'

export async function getExamen({
  item,
  prisma,
  incluirCorrecta = false,
}: {
  item: {
    filters?: ExamenWhereInputSchemaProps
  } & getExamenSchemaProps
  prisma: dbTransaction
  incluirCorrecta?: boolean
}) {
  const { filters, examen_id: id } = item
  const examen = await prisma.examen.findUniqueOrThrow({
    where: {
      ...filters,
      id,
    },
    include: {
      curso: true,
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
        },
      },
    },
  })

  return examen
}
