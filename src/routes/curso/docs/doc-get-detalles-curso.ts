import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { CursoSchema } from '@/db/generated/zod/index.js'

const getDetallesCursoSchema = CursoSchema.pick({ id: true })
export type getDetallesCursoSchemaProps = z.infer<typeof getDetallesCursoSchema>

export const getDetallesCursoRoute = createRoute({
  method: 'get',
  path: '/:id',
  tags: ['Curso'],
  summary: 'Obtener detalles de un curso',
  description: 'Obtener detalles de un curso.',
  request: {
    params: getDetallesCursoSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.any(),
        },
      },
      description: 'Devuelve los cursos del usuario',
    },
  },
})
