import { db } from '@/db/db.js'
import { io } from '@/index.js'
import { StateType } from '@prisma/client'
import { siguientePreguntaExamen } from './siguiente-pregunta-examen.js'
import { finalizarExamen } from './finalizar-examen.js'
import { listJobs } from '@/helpers/jobs.js'

export const finalizarJobExamen = async (examen_id: string) => {
  await db.$transaction(async prisma => {
    await siguientePreguntaExamen(examen_id)
    await prisma.examen.update({
      where: {
        id: examen_id,
      },
      data: {
        state: {
          connect: {
            name: StateType.Finalizado,
          },
        },
      },
    })
    await finalizarExamen(examen_id)
  })

  io.to(examen_id).emit('examen-siguiente-pregunta', {
    examen_id,
  })
  io.to(examen_id).emit('finalizar-examen', { examen_id })
}

export const empezarJobExamen = async (examen_id: string) => {
  console.log('🚀 ~ file: finalizar-job-examen.ts:33 ~ examen_id:', examen_id)
  await db.examen.update({
    where: {
      id: examen_id,
    },
    data: {
      state: {
        connect: {
          name: StateType.Disponible,
        },
      },
    },
  })
}
