import { createRoute } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  EjecucionExamenSchema,
  EjecucionExamenUncheckedUpdateInputSchema,
} from '@/db/generated/zod/index.js'

export const updateEjecucionExamenRoute = createRoute({
  method: 'post',
  path: '/:id',
  tags: ['Examen'],
  summary: 'Actualizar ejecución de examen',
  description: 'Actualizar ejecución de examen.',
  request: {
    params: EjecucionExamenSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: EjecucionExamenUncheckedUpdateInputSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: EjecucionExamenSchema,
        },
      },
      description: 'Devuelve la ejecución del examen',
    },
  },
})
