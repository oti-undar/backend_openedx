import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { cursoSchema, cursoSchemaExample } from '../schemas/curso-schema.js'

export const getCursosRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Curso'],
  summary: 'Obtener cursos',
  description: 'Obtener cursos. Recibe como parámetro el ID del usuario (string).',
  request: {
    query: getUserIdSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.array(cursoSchema).openapi({ example: [cursoSchemaExample] }),
        },
      },
      description: 'Devuelve los cursos del usuario',
    },
  },
})
