import { OpenAPIHono } from '@hono/zod-openapi'
import { getStatesRoute } from './docs/doc-get-states.js'
import { getStates } from './utils/get-states.js'
import { db } from '@/db/db.js'

const state = new OpenAPIHono()

state.openapi(getStatesRoute, async c => {
  try {
    const states = await db.$transaction(async prisma => {
      return await getStates({ prisma })
    })
    return c.json(states, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

export default state
