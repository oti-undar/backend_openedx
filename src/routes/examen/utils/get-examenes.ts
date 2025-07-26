import type { dbTransaction } from '@/db/db.js'
import type { getUserIdSchemaProps } from '@/schemas/validation.js'

export async function getExamenes({
  item,
  prisma,
  incluirCorrecta = false,
}: {
  item: getUserIdSchemaProps
  prisma: dbTransaction
  incluirCorrecta?: boolean
}) {
  const examenes = await prisma.examen.findMany({
    where: {
      user_id: item.user_id,
    },
    include: {
      curso: true,
      state: true,
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

  return examenes
}
