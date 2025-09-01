import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  EjecucionExamenSchema,
  PreguntasEjecucionExamenSchema,
} from '@/db/generated/zod/index.js'

const getEjecucionExamenRouteSchema = getUserIdSchema.extend({
  examen_id: z.string().uuid(),
})

export type getEjecucionExamenRouteSchemaProps = z.infer<
  typeof getEjecucionExamenRouteSchema
>

const ResponseEjecucionExamenSchema = EjecucionExamenSchema.extend({
  pregunta_ejecucion_actual: PreguntasEjecucionExamenSchema.nullable(),
  preguntas_resueltas: z.array(PreguntasEjecucionExamenSchema),
})

export type ResponseEjecucionExamenSchemaProps = z.infer<
  typeof ResponseEjecucionExamenSchema
>

export const getEjecucionExamenRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Examen'],
  summary: 'Obtener ejecución de examen',
  description: 'Obtener ejecución de examen.',
  request: {
    query: getEjecucionExamenRouteSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: ResponseEjecucionExamenSchema,
        },
      },
      description: 'Devuelve el examen',
    },
  },
})
