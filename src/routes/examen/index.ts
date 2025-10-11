import { OpenAPIHono } from '@hono/zod-openapi'
import {
  createExamenRoute,
  type CreateExamenCompleteSchemaProps,
} from './docs/doc-create-examen.js'
import { createExamen } from './utils/create-examen.js'
import { db } from '@/db/db.js'
import { getExamenesRoute } from './docs/doc-get-examenes.js'
import { getExamenes } from './utils/get-examenes.js'
import { getExamenRoute } from './docs/doc-get-examen.js'
import { getExamen } from './utils/get-examen.js'
import { updateExamenRoute } from './docs/doc-update-examen.js'
import { updateExamen } from './utils/update-examen.js'
import { removeExamenRoute } from './docs/doc-remove-examen.js'
import { removeExamen } from './utils/remove-examen.js'
import {
  EditExamenRoute,
  type EditExamenCompleteSchemaProps,
} from './docs/doc-edit-examen.js'
import { editExamen } from './utils/edit-examen.js'

const examen = new OpenAPIHono()

examen.openapi(EditExamenRoute, async c => {
  const { id } = c.req.valid('param')
  const input = c.get('formDataValidated') as EditExamenCompleteSchemaProps
  try {
    const examen = await db.$transaction(async prisma => {
      return await editExamen({ item: input, prisma, id })
    })
    return c.json(examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

examen.openapi(removeExamenRoute, async c => {
  const { id } = c.req.valid('param')
  try {
    await db.$transaction(async prisma => {
      await removeExamen({
        id,
        prisma,
      })
    })
    return c.json({ message: 'Examen eliminado correctamente' }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

examen.openapi(createExamenRoute, async c => {
  const input = c.get('formDataValidated') as CreateExamenCompleteSchemaProps
  try {
    const examen = await db.$transaction(async prisma => {
      return await createExamen({ item: input, prisma })
    })
    return c.json(examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

examen.openapi(getExamenesRoute, async c => {
  const input = c.req.valid('query')
  try {
    const examenes = await db.$transaction(async prisma => {
      return await getExamenes({ item: input, prisma, incluirCorrecta: true })
    })
    return c.json(examenes, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

examen.openapi(getExamenRoute, async c => {
  const filters = c.req.valid('query')
  const { examen_id } = c.req.valid('param')
  try {
    const examen = await db.$transaction(async prisma => {
      return await getExamen({
        item: { ...filters, examen_id },
        prisma,
        incluirCorrecta: true,
      })
    })
    return c.json(examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

examen.openapi(updateExamenRoute, async c => {
  const { id } = c.req.valid('param')
  const input = c.req.valid('json')
  try {
    const examen = await db.$transaction(async prisma => {
      return await updateExamen({ item: input, examen_id: id, prisma })
    })
    return c.json(examen, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error }, 409)
  }
})

export default examen
