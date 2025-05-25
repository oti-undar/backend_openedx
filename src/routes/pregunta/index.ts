import { OpenAPIHono } from '@hono/zod-openapi'
import { route } from './docs/doc-create-pregunta.js'
import { createPregunta } from './utils/create-pregunta.js'

const pregunta = new OpenAPIHono()

pregunta.openapi(route, async c => {
  const input = c.req.valid('json')
  const pregunta = await createPregunta(input)

  return c.json(pregunta, 200)
})

export default pregunta
