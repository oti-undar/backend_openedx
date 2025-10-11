import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { EjecucionExamenSchema } from '@/db/generated/zod/index.js'

const createEjecucionExamenRouteSchema = EjecucionExamenSchema.pick({
  user_id: true,
  examen_id: true,
}).extend({
  pregunta_id: z.string().cuid(),
})

export type CreateEjecucionExamenRouteSchema = z.infer<
  typeof createEjecucionExamenRouteSchema
>

export const createEjecucionExamenRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Examen'],
  summary: 'Crear ejecución de examen',
  description: 'Crear ejecución de examen.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createEjecucionExamenRouteSchema,
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
