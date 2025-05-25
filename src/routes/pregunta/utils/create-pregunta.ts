import { db } from '@/db/db.js'
import type { ValidatePregunta } from '../validations/validate-create-pregunta.js'

export async function createPregunta(item: ValidatePregunta) {
  return await db.$transaction(async prisma => {
    const pregunta = await prisma.pregunta.create({
      data: item,
    })

    return pregunta
  })
}
