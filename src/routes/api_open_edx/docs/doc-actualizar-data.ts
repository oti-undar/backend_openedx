import { createRoute } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { messageSuccessGeneric } from '@/schemas/generic_success.js'

export const actualizarDataRoute = createRoute({
  method: 'get',
  path: '/actualizar-data',
  tags: ['Curso'],
  summary: 'Actualizar datos',
  description: 'Actualizar datos con OpenEDX.',
  request: {
    query: getUserIdSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: messageSuccessGeneric,
        },
      },
      description: 'Devuelve un mensaje de éxito',
    },
  },
})
