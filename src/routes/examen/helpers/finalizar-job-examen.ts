import { db } from '@/db/db.js'
import { io } from '@/index.js'
import { StateType } from '@prisma/client'
import { siguientePreguntaExamen } from './siguiente-pregunta-examen.js'
import { finalizarExamen } from './finalizar-examen.js'

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
  const examen = await db.examen.findUnique({ where: { id: examen_id } })
  if (!examen) throw new Error('Examen no encontrado')
  console.log('🚀 ~ file: finalizar-job-examen.ts:35 ~ examen:', examen)

  const state = await db.state.findUnique({
    where: { name: StateType.Disponible },
  })
  if (!state) throw new Error('State "Disponible" no encontrado')
  const examen_actualizado = await db.examen.update({
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
  console.log(
    '🚀 ~ file: finalizar-job-examen.ts:53 ~ examen_actualizado:',
    examen_actualizado
  )
}
