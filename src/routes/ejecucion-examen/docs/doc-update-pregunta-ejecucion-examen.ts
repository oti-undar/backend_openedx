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

const updatePreguntaEjecucionExamenSchema = PreguntasEjecucionExamenSchema.pick(
  {
    respuesta_id: true,
    final: true,
  }
).merge(
  z.object({
    nueva_pregunta_actual: EjecucionExamenSchema.pick({
      examen_id: true,
      user_id: true,
    })
      .merge(PreguntasEjecucionExamenSchema.pick({ pregunta_id: true }))
      .optional(),
  })
)

export type UpdatePreguntaEjecucionExamenSchema = z.infer<
  typeof updatePreguntaEjecucionExamenSchema
>

export const updatePreguntaEjecucionExamenRoute = createRoute({
  method: 'post',
  path: '/pregunta/:id',
  tags: ['Examen'],
  summary: 'Actualizar pregunta de ejecución de examen',
  description: 'Actualizar pregunta de ejecución de examen.',
  request: {
    params: PreguntasEjecucionExamenSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: updatePreguntaEjecucionExamenSchema,
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
