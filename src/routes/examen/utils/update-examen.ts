import type { dbTransaction } from '@/db/db.js'
import { v4 as uuidv4 } from 'uuid'
import { guardarArchivo } from '@/helpers/guardar-archivo.js'
import type { Examen, Prisma } from '@prisma/client'

export async function updateExamen({
  item,
  examen_id,
  prisma,
}: {
  item: Prisma.ExamenUpdateInput
  examen_id: Examen['id']
  prisma: dbTransaction
}) {
  const examen = await prisma.examen.update({
    where: {
      id: examen_id,
    },
    data: item,
  })

  return examen
}
