import type { dbTransaction } from '@/db/db.js'
import type { Prisma } from '@prisma/client'

export async function createRubricaHolistica({
  item,
  prisma,
}: {
  item: Prisma.RubricaHolisticaUncheckedCreateInput
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
  item: Prisma.RubricaAnaliticaUncheckedCreateInput
  prisma: dbTransaction
}) {
  const itemCreated = await prisma.rubricaAnalitica.create({
    data: item,
  })

  return itemCreated
}
