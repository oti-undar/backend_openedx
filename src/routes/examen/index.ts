import { OpenAPIHono } from '@hono/zod-openapi'
import { route } from './docs/doc-create-examen.js'
import { createExamen } from './utils/create-examen.js'

const examen = new OpenAPIHono()

examen.openapi(route, async c => {
  const input = c.req.valid('json')
  const examen = await createExamen(input)

  return c.json(examen, 200)
})

export default examen
