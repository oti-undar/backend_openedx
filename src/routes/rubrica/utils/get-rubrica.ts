import type { dbTransaction } from '@/db/db.js'
import type {
  GetRubricaAnaliticaSchemaProps,
  GetRubricaHolisticaSchemaProps,
} from '../docs/doc-get-rubrica.js'

export async function getRubricaHolistica({
  item,
  prisma,
}: {
  item: GetRubricaHolisticaSchemaProps
  prisma: dbTransaction
}) {
  const items = await prisma.rubricaHolistica.findUniqueOrThrow({
    where: {
      id: item.id,
    },
    include: {
      niveles_de_logro: true,
    },
  })

  return items
}

export async function getRubricaAnalitica({
  item,
  prisma,
}: {
  item: GetRubricaAnaliticaSchemaProps
  prisma: dbTransaction
}) {
  const items = await prisma.rubricaAnalitica.findUniqueOrThrow({
    where: {
      id: item.id,
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
