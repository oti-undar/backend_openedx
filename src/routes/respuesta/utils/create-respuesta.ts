import { db } from '@/db/db.js'
import type { ValidateRespuesta } from '../validations/validate-create-respuesta.js'

export async function createRespuesta(item: ValidateRespuesta) {
  return await db.$transaction(async prisma => {
    const respuesta = await prisma.respuesta.create({
      data: item,
    })

    return respuesta
  })
}
