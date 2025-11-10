import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { EjecucionExamenSchema } from '@/db/generated/zod/index.js'

export const getNotaEjecucionExamenRoute = createRoute({
  method: 'get',
  path: '/nota/:id',
  tags: ['Examen'],
  summary: 'Obtener nota de ejecución de examen',
  description: 'Obtener nota de ejecución de examen.',
  request: {
    query: getUserIdSchema,
    params: EjecucionExamenSchema.pick({ id: true }),
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.object({
            nota: z.number(),
          }),
        },
      },
      description: 'Devuelve la nota de la ejecución del examen',
    },
  },
})
