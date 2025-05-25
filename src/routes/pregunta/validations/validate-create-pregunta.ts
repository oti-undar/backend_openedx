import { db } from '@/db/db.js'
import { z } from '@hono/zod-openapi'

const validatePreguntaExample = {
  title: 'Pregunta de prueba',
  description: 'Descripción de la pregunta',
  img: 'https://example.com/img.jpg',
  video: 'https://example.com/video.mp4',
  examen_id: '123e4567-e89b-12d3-a456-426614174000',
}

export const validatePregunta = z
  .object({
    title: z.string().openapi({
      example: validatePreguntaExample.title,
    }),
    description: z.string().optional().nullable().openapi({
      example: validatePreguntaExample.description,
    }),
    img: z.string().optional().nullable().openapi({
      example: validatePreguntaExample.img,
    }),
    video: z.string().optional().nullable().openapi({
      example: validatePreguntaExample.video,
    }),
    examen_id: z
      .string()
      .uuid()
      .refine(
        async val => {
          const examen = await db.examen.findUnique({
            where: { id: val },
          })
          return examen !== null
        },
        {
          message: 'El examen con ese ID no existe.',
        }
      )
      .openapi({
        example: validatePreguntaExample.examen_id,
      }),
  })
  .openapi({
    example: validatePreguntaExample,
  })
  .openapi('Pregunta_Create')

export type ValidatePregunta = z.infer<typeof validatePregunta>

const validatePreguntaExampleResponse = {
  ...validatePreguntaExample,
  id: 1,
}

export const validatePreguntaResponse = validatePregunta
  .extend({
    id: z.number().int().positive().openapi({
      example: validatePreguntaExampleResponse.id,
    }),
  })
  .openapi({
    example: validatePreguntaExampleResponse,
  })
  .openapi('Pregunta')
