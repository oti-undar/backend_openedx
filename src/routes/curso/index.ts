import { OpenAPIHono } from '@hono/zod-openapi'
import { getCursosRoute } from './docs/doc-get-cursos.js'
import { getCursos } from './utils/get-cursos.js'
import { db } from '@/db/db.js'
import { getDetallesCursoRoute } from './docs/doc-get-detalles-curso.js'
import { getDetallesCurso } from './utils/get-detalles-curso.js'

const curso = new OpenAPIHono()

curso.openapi(getCursosRoute, async c => {
  const input = c.req.valid('query')
  try {
    const cursos = await db.$transaction(async prisma => {
      return await getCursos({ item: input, prisma })
    })
    return c.json(cursos, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

curso.openapi(getDetallesCursoRoute, async c => {
  const input = c.req.valid('param')
  try {
    const curso = await db.$transaction(async prisma => {
      return await getDetallesCurso({ item: input, prisma })
    })
    return c.json(curso, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

export default curso
