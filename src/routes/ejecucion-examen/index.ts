import { OpenAPIHono } from '@hono/zod-openapi'
import { createEjecucionExamenRoute } from './docs/doc-create-ejecucion-examen.js'
import { createEjecucionExamen } from './utils/create-ejecucion-examen.js'
import { getEjecucionExamenRoute } from './docs/doc-get-ejecucion-examen.js'
import { getEjecucionExamen } from './utils/get-ejecucion-examen.js'
import { db } from '@/db/db.js'
import { updatePreguntaEjecucionExamenRoute } from './docs/doc-update-pregunta-ejecucion-examen.js'
import { updatePreguntaEjecucionExamen } from './utils/update-pregunta-ejecucion-examen.js'
import { updateEjecucionExamenRoute } from './docs/doc-update-ejecucion-examen.js'
import { updateEjecucionExamen } from './utils/update-ejecucion-examen.js'
import { getEjecucionesExamenRoute } from './docs/doc-get-ejecuciones-examen.js'
import { getEjecucionesExamen } from './utils/get-ejecuciones-examen.js'
import { updatePreguntaEjecucionExamenRespuestaRoute } from './docs/doc-update-pregunta-ejecucion-examen-respuesta.js'
import { updatePreguntaEjecucionExamenRespuesta } from './utils/update-pregunta-ejecucion-examen-respuesta.js'

const ejecucion_examen = new OpenAPIHono()

ejecucion_examen.openapi(updatePreguntaEjecucionExamenRoute, async c => {
  const { id } = c.req.valid('param')
  const input = c.req.valid('json')
  try {
    const ejecucion_examen = await db.$transaction(async prisma => {
      return await updatePreguntaEjecucionExamen({
        item: input,
        prisma,
        pregunta_ejecucion_actual_id: id,
      })
    })
    return c.json(ejecucion_examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

ejecucion_examen.openapi(
  updatePreguntaEjecucionExamenRespuestaRoute,
  async c => {
    const { id } = c.req.valid('param')
    const input = c.req.valid('json')
    try {
      await db.$transaction(async prisma => {
        return await updatePreguntaEjecucionExamenRespuesta({
          item: input,
          prisma,
          pregunta_ejecucion_actual_id: id,
        })
      })
      return c.json({ message: 'Pregunta actualizada' }, 200)
    } catch (error) {
      console.error(error)
      return c.json({ error }, 409)
    }
  }
)

ejecucion_examen.openapi(createEjecucionExamenRoute, async c => {
  const input = c.req.valid('json')
  try {
    const ejecucion_examen = await db.$transaction(async prisma => {
      return await createEjecucionExamen({ item: input, prisma })
    })
    return c.json(ejecucion_examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

ejecucion_examen.openapi(updateEjecucionExamenRoute, async c => {
  const { id } = c.req.valid('param')
  const input = c.req.valid('json')
  try {
    const ejecucion_examen_actualizada = await db.$transaction(async prisma => {
      return await updateEjecucionExamen({
        item: input,
        prisma,
        ejecucion_examen_id: id,
      })
    })
    return c.json(ejecucion_examen_actualizada, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

ejecucion_examen.openapi(getEjecucionesExamenRoute, async c => {
  const input = c.req.valid('query')
  try {
    const ejecuciones_examen = await db.$transaction(async prisma => {
      return await getEjecucionesExamen({ item: input, prisma })
    })
    return c.json(ejecuciones_examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

ejecucion_examen.openapi(getEjecucionExamenRoute, async c => {
  const input = c.req.valid('query')
  const { id } = c.req.valid('param')
  try {
    const ejecucion_examen = await db.$transaction(async prisma => {
      return await getEjecucionExamen({
        item: { ...input, examen_id: id },
        prisma,
      })
    })
    return c.json(ejecucion_examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

export default ejecucion_examen
