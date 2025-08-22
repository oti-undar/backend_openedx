import type { dbTransaction } from '@/db/db.js'
import type {
  GetRubricasAnaliticaSchemaProps,
  GetRubricasHolisticaSchemaProps,
} from '../docs/doc-get-rubricas.js'

export async function getRubricasHolistica({
  item,
  prisma,
}: {
  item: GetRubricasHolisticaSchemaProps
  prisma: dbTransaction
}) {
  const items = await prisma.rubricaHolistica.findMany({
    where: {
      user_id: item.user_id,
    },
    include: {
      niveles_de_logro: true,
    },
  })

  return items
}

export async function getRubricasAnalitica({
  item,
  prisma,
}: {
  item: GetRubricasAnaliticaSchemaProps
  prisma: dbTransaction
}) {
  const items = await prisma.rubricaAnalitica.findMany({
    where: {
      user_id: item.user_id,
    },
    include: {
      indicadores: {
        include: {
          niveles_de_logro: true,
        },
      },
    },
  })

  return items
}
