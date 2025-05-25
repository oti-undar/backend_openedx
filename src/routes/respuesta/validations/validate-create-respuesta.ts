import { db } from '@/db/db.js'
import { z } from '@hono/zod-openapi'

const validateRespuestaExample = {
  respuesta: 'La respuesta correcta',
  correcta: true,
  pregunta_id: 1,
}

export const validateRespuesta = z
  .object({
    respuesta: z.string().openapi({
      example: validateRespuestaExample.respuesta,
    }),
    correcta: z.boolean().default(false).openapi({
      example: validateRespuestaExample.correcta,
    }),
    pregunta_id: z
      .number()
      .int()
      .positive()
      .refine(
        async val => {
          const pregunta = await db.pregunta.findUnique({
            where: { id: val },
          })
          return pregunta !== null
        },
        {
          message: 'La pregunta con ese ID no existe.',
        }
      )
      .openapi({
        example: validateRespuestaExample.pregunta_id,
      }),
  })
  .openapi({
    example: validateRespuestaExample,
  })
  .openapi('Respuesta_Create')

export type ValidateRespuesta = z.infer<typeof validateRespuesta>

const validateRespuestaExampleResponse = {
  ...validateRespuestaExample,
  id: 1,
}

export const validateRespuestaResponse = validateRespuesta
  .extend({
    id: z.number().int().positive().openapi({
      example: validateRespuestaExampleResponse.id,
    }),
  })
  .openapi({
    example: validateRespuestaExampleResponse,
  })
  .openapi('Respuesta')
