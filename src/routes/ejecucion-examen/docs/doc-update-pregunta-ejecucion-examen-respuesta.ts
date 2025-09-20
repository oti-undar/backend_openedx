import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  EjecucionExamenSchema,
  PreguntasEjecucionExamenSchema,
  PreguntasEjecucionExamenUncheckedUpdateInputSchema,
} from '@/db/generated/zod/index.js'
import { messageSuccessGeneric } from '@/schemas/generic_success.js'

const updatePreguntaEjecucionExamenRespuestaSchema =
  PreguntasEjecucionExamenSchema.pick({
    respuesta_id: true,
  })

export type UpdatePreguntaEjecucionExamenRespuestaSchema = z.infer<
  typeof updatePreguntaEjecucionExamenRespuestaSchema
>

export const updatePreguntaEjecucionExamenRespuestaRoute = createRoute({
  method: 'post',
  path: '/pregunta-respuesta/:id',
  tags: ['Examen'],
  summary: 'Actualizar respuesta de pregunta de ejecución de examen',
  description: 'Actualizar respuesta de pregunta de ejecución de examen.',
  request: {
    params: PreguntasEjecucionExamenSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: updatePreguntaEjecucionExamenRespuestaSchema,
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
          schema: messageSuccessGeneric,
        },
      },
      description: 'Devuelve un mensaje de éxito',
    },
  },
})
