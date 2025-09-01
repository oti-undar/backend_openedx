import type { dbTransaction } from '@/db/db.js'
import type { getUserIdSchemaProps } from '@/schemas/validation.js'

export async function getCursos({
  item,
  prisma,
}: {
  item: getUserIdSchemaProps
  prisma: dbTransaction
}) {
  const cursos = await prisma.curso.findMany({
    where: {
      usuarios: {
        some: {
          user_id: item.user_id,
        },
      },
    },
    select: {
      id: true,
      name: true,
      usuarios: {
        select: {
          user_id: true,
          is_instructor: true,
        },
      },
    },
  })
  return cursos
}
