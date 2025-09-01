import type { dbTransaction } from '@/db/db.js'
import type { EjecucionExamen, Prisma } from '@prisma/client'

export async function updateEjecucionExamen({
  item,
  prisma,
  ejecucion_examen_id,
}: {
  item: Prisma.EjecucionExamenUncheckedUpdateInput
  prisma: dbTransaction
  ejecucion_examen_id: EjecucionExamen['id']
}) {
  const ejecucion_examen_actualizada = await prisma.ejecucionExamen.update({
    where: {
      id: ejecucion_examen_id,
    },
    data: item,
  })

  return ejecucion_examen_actualizada
}
