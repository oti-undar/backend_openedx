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
import { createJob } from '@/helpers/jobs.js'
import {
  empezarJobExamen,
  finalizarJobExamen,
} from './helpers/finalizar-job-examen.js'

const examen = new OpenAPIHono()

examen.openapi(EditExamenRoute, async c => {
  const { id } = c.req.valid('param')
  const input = c.get('formDataValidated') as EditExamenCompleteSchemaProps
  try {
    const examen = await db.$transaction(async prisma => {
      const examen_actualizado = await editExamen({ item: input, prisma, id })

      if (examen_actualizado.final_examen)
        createJob(
          examen_actualizado.id,
          examen_actualizado.final_examen,
          async () => {
            finalizarJobExamen(examen_actualizado.id)
          }
        )
      if (examen_actualizado.inicio_examen)
        createJob(
          examen_actualizado.id + 'inicio',
          examen_actualizado.inicio_examen,
          async () => {
            empezarJobExamen(examen_actualizado.id)
          }
        )

      return examen_actualizado
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
      const examen_creado = await createExamen({ item: input, prisma })

      if (examen_creado.final_examen)
        createJob(examen_creado.id, examen_creado.final_examen, async () => {
          finalizarJobExamen(examen_creado.id)
        })
      if (examen_creado.inicio_examen)
        createJob(
          examen_creado.id + 'inicio',
          examen_creado.inicio_examen,
          async () => {
            empezarJobExamen(examen_creado.id)
          }
        )

      return examen_creado
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
