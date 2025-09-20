import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  EjecucionExamenSchema,
  PreguntaSchema,
  PreguntasEjecucionExamenSchema,
  RespuestaSchema,
  UserSchema,
} from '@/db/generated/zod/index.js'

const getEjecucionesExamenSchema = getUserIdSchema.merge(
  EjecucionExamenSchema.pick({ examen_id: true })
)

export type GetEjecucionesExamenSchemaProps = z.infer<
  typeof getEjecucionesExamenSchema
>

const responseGetEjecucionesExamenSchema = z.array(
  EjecucionExamenSchema.extend({
    preguntas_resueltas: z.array(
      PreguntasEjecucionExamenSchema.extend({
        pregunta: PreguntaSchema,
        respuesta: RespuestaSchema.nullable(),
      })
    ),
    user: UserSchema,
  })
)

export const getEjecucionesExamenRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Examen'],
  summary: 'Obtener ejecuciones de examen',
  description: 'Obtener ejecuciones de examen.',
  request: {
    query: getEjecucionesExamenSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: responseGetEjecucionesExamenSchema,
        },
      },
      description: 'Devuelve las ejecuciones del examen',
    },
  },
})
