import type { dbTransaction } from '@/db/db.js'
import type { CreateEjecucionExamenRouteSchema } from '../docs/doc-create-ejecucion-examen.js'

export async function createEjecucionExamen({
  item,
  prisma,
}: {
  item: CreateEjecucionExamenRouteSchema
  prisma: dbTransaction
}) {
  const { user_id, examen_id, pregunta_id } = item

  const ejecucion_examen = await prisma.ejecucionExamen.upsert({
    where: {
      user_id_examen_id: {
        user_id,
        examen_id,
      },
    },
    create: {
      user_id,
      examen_id,
    },
    update: {},
  })

  const ejecucion_examen_actualizada = await prisma.ejecucionExamen.update({
    where: {
      id: ejecucion_examen.id,
    },
    data: {
      pregunta_ejecucion_actual: {
        connectOrCreate: {
          where: {
            pregunta_id_ejecucion_examen_id: {
              pregunta_id,
              ejecucion_examen_id: ejecucion_examen.id,
            },
          },
          create: {
            ejecucion_examen_id: ejecucion_examen.id,
            pregunta_id,
            inicio: new Date(),
          },
        },
      },
    },
  })

  return ejecucion_examen_actualizada
}
