import { OpenAPIHono } from '@hono/zod-openapi'
import { route } from './docs/doc-create-respuesta.js'
import { createRespuesta } from './utils/create-respuesta.js'

const respuesta = new OpenAPIHono()

respuesta.openapi(route, async c => {
  const input = c.req.valid('json')
  const respuesta = await createRespuesta(input)

  return c.json(respuesta, 200)
})

export default respuesta
