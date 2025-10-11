import type { dbTransaction } from '@/db/db.js'
import type { Prisma } from '@prisma/client'

export async function editRubricaHolistica({
  item,
  prisma,
  id,
}: {
  item: Prisma.RubricaHolisticaUncheckedCreateInput
  prisma: dbTransaction
  id: string
}) {
  await prisma.nivelesDeLogro.deleteMany({
    where: {
      rubrica_holistica_id: id,
    },
  })

  const itemCreated = await prisma.rubricaHolistica.update({
    where: {
      id: id,
    },
    data: item,
  })

  return itemCreated
}

export async function editRubricaAnalitica({
  item,
  prisma,
  id,
}: {
  item: Prisma.RubricaAnaliticaUncheckedCreateInput
  prisma: dbTransaction
  id: string
}) {
  await prisma.indicadores.deleteMany({
    where: {
      rubrica_analitica_id: id,
    },
  })

  const itemCreated = await prisma.rubricaAnalitica.update({
    where: {
      id: id,
    },
    data: item,
  })

  return itemCreated
}
