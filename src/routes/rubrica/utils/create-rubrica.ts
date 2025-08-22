import type { dbTransaction } from '@/db/db.js'
import type { Prisma } from '@prisma/client'

export async function createRubricaHolistica({
  item,
  prisma,
}: {
  item: Prisma.RubricaHolisticaCreateInput
  prisma: dbTransaction
}) {
  const itemCreated = await prisma.rubricaHolistica.create({
    data: item,
  })

  return itemCreated
}

export async function createRubricaAnalitica({
  item,
  prisma,
}: {
  item: Prisma.RubricaAnaliticaCreateInput
  prisma: dbTransaction
}) {
  const itemCreated = await prisma.rubricaAnalitica.create({
    data: item,
  })

  return itemCreated
}
