import { OpenAPIHono } from '@hono/zod-openapi'
import { db } from '@/db/db.js'
import { actualizarDataRoute } from './docs/doc-actualizar-data.js'
import { actualizarData } from './utils/actualizar-data.js'
import { isInstructorRoute } from './docs/doc-is-instructor.js'
import { isInstructor } from './utils/is-instructor.js'
const apiOpenEdx = new OpenAPIHono()

apiOpenEdx.openapi(actualizarDataRoute, async c => {
  const input = c.req.valid('query')
  try {
    await actualizarData({ item: input })
    return c.json({ message: 'Actualizado correctamente' }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

apiOpenEdx.openapi(isInstructorRoute, async c => {
  const input = c.req.valid('query')
  try {
    const result = await isInstructor({ item: input })
    return c.json({ is_instructor: result }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

export default apiOpenEdx
