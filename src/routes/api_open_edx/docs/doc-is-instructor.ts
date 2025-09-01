import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'

export const isInstructorRoute = createRoute({
  method: 'get',
  path: '/is-instructor',
  tags: ['Curso'],
  summary: 'Verificar si es instructor',
  description: 'Verificar si es instructor con OpenEDX.',
  request: {
    query: getUserIdSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.object({
            is_instructor: z.boolean(),
          }),
        },
      },
      description: 'Devuelve true si es instructor',
    },
  },
})
