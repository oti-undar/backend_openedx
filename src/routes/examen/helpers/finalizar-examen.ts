import { db } from '@/db/db.js'

export const finalizarExamen = async (examen_id: string) => {
  await db.ejecucionExamen.updateMany({
    where: { examen_id },
    data: { fin_examen: new Date() },
  })
}
