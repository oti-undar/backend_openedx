import type { dbTransaction } from '@/db/db.js'
import type {
  GetRubricaAnaliticaSchemaProps,
  GetRubricaHolisticaSchemaProps,
} from '../docs/doc-get-rubrica.js'

export async function removeRubricaHolistica({
  item,
  prisma,
}: {
  item: GetRubricaHolisticaSchemaProps
  prisma: dbTransaction
}) {
  await prisma.rubricaHolistica.delete({
    where: {
      id: item.id,
    },
  })
}

export async function removeRubricaAnalitica({
  item,
  prisma,
}: {
  item: GetRubricaAnaliticaSchemaProps
  prisma: dbTransaction
}) {
  await prisma.rubricaAnalitica.delete({
    where: {
      id: item.id,
    },
  })
}
