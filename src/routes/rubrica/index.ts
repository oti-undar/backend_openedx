import { OpenAPIHono } from '@hono/zod-openapi'
import { db } from '@/db/db.js'
import {
  createRubricaAnaliticaRoute,
  createRubricaHolisticaRoute,
} from './docs/doc-create-rubrica.js'
import {
  createRubricaAnalitica,
  createRubricaHolistica,
} from './utils/create-rubrica.js'
import {
  getRubricaAnaliticaRoute,
  getRubricaHolisticaRoute,
} from './docs/doc-get-rubrica.js'
import {
  getRubricaAnalitica,
  getRubricaHolistica,
} from './utils/get-rubrica.js'
import {
  getRubricasAnaliticaRoute,
  getRubricasHolisticaRoute,
} from './docs/doc-get-rubricas.js'
import {
  getRubricasAnalitica,
  getRubricasHolistica,
} from './utils/get-rubricas.js'

const rubrica = new OpenAPIHono()

rubrica.openapi(createRubricaHolisticaRoute, async c => {
  const item = c.req.valid('json')
  try {
    const rubrica = await db.$transaction(async prisma => {
      return await createRubricaHolistica({ item, prisma })
    })
    return c.json(rubrica, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

rubrica.openapi(createRubricaAnaliticaRoute, async c => {
  const item = c.req.valid('json')
  try {
    const rubrica = await db.$transaction(async prisma => {
      return await createRubricaAnalitica({ item, prisma })
    })
    return c.json(rubrica, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

rubrica.openapi(getRubricaHolisticaRoute, async c => {
  const item = c.req.valid('param')
  try {
    const rubrica = await db.$transaction(async prisma => {
      return await getRubricaHolistica({ item, prisma })
    })
    return c.json(rubrica, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

rubrica.openapi(getRubricaAnaliticaRoute, async c => {
  const item = c.req.valid('param')
  try {
    const rubrica = await db.$transaction(async prisma => {
      return await getRubricaAnalitica({ item, prisma })
    })
    return c.json(rubrica, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

rubrica.openapi(getRubricasHolisticaRoute, async c => {
  const item = c.req.valid('query')
  try {
    const rubrica = await db.$transaction(async prisma => {
      return await getRubricasHolistica({ item, prisma })
    })
    return c.json(rubrica, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

rubrica.openapi(getRubricasAnaliticaRoute, async c => {
  const item = c.req.valid('query')
  try {
    const rubrica = await db.$transaction(async prisma => {
      return await getRubricasAnalitica({ item, prisma })
    })
    return c.json(rubrica, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

export default rubrica
