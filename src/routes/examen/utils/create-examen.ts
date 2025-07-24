import { db } from '@/db/db.js'
import type { ValidateExamen } from '../validations/validate-create-examen.js'
import { StateType } from '@prisma/client'
import type { dbTransaction } from '@/db/db.js'

export async function createExamen(item: ValidateExamen) {
  return await db.$transaction(async (prisma: dbTransaction) => {
    const state = await prisma.state.findFirstOrThrow({
      where: {
        name: StateType.Activo,
      },
    })
    const examen = await prisma.examen.create({
      data: {
        ...item,
        state_id: state.id,
      },
    })
    return examen
  })
}
