import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { examenSchema, examenSchemaExample } from '../schemas/examen-schema.js'

export const getExamenesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Examen'],
  summary: 'Obtener examenes',
  description:
    'Obtener examenes. Recibe como parámetros el ID del usuario (string).',
  request: {
    query: getUserIdSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z
            .array(examenSchema)
            .openapi({ example: [examenSchemaExample] }),
        },
      },
      description: 'Devuelve los examenes del usuario',
    },
  },
})
