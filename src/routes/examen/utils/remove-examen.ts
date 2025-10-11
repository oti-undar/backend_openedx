import type { dbTransaction } from '@/db/db.js'
import { cancelJob } from '@/helpers/jobs.js'
import type { Examen } from '@prisma/client'

export async function removeExamen({
  id,
  prisma,
}: {
  id: Examen['id']
  prisma: dbTransaction
}) {
  await prisma.examen.delete({
    where: {
      id,
    },
  })

  cancelJob(id)
  cancelJob(id + 'inicio')
}
