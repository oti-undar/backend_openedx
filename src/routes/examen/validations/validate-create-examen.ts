import { db } from '@/db/db.js'
import { z } from '@hono/zod-openapi'
import { StateType } from '@prisma/client'

const validateExamenExample = {
  title: 'Examen de prueba',
  description: 'Descripción del examen',
  img: 'https://example.com/img.jpg',
  video: 'https://example.com/video.mp4',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  fecha_vencimiento: '2025-05-23 21:54:05',
}

export const validateExamen = z
  .object({
    title: z.string().openapi({
      example: validateExamenExample.title,
    }),
    description: z.string().optional().nullable().openapi({
      example: validateExamenExample.description,
    }),
    img: z.string().optional().nullable().openapi({
      example: validateExamenExample.img,
    }),
    video: z.string().optional().nullable().openapi({
      example: validateExamenExample.video,
    }),
    fecha_vencimiento: z.string().datetime().openapi({
      example: validateExamenExample.fecha_vencimiento,
    }),
    user_id: z.string().openapi({
      example: validateExamenExample.user_id,
    }),
  })
  .openapi({
    example: validateExamenExample,
  })
  .openapi('Examen_Create')

export type ValidateExamen = z.infer<typeof validateExamen>

const validateExamenExampleResponse = {
  ...validateExamenExample,
  id: '123e4567-e89b-12d3-a456-426614174000',
  created_at: '2025-05-23 21:54:05',
  updated_at: '2025-05-23 21:54:05',
  deleted_at: null,
  state_id: 1,
}

export const validateExamenResponse = validateExamen
  .extend({
    id: z.string().uuid().openapi({
      example: validateExamenExampleResponse.id,
    }),
    created_at: z.string().datetime().openapi({
      example: validateExamenExampleResponse.created_at,
    }),
    updated_at: z.string().datetime().openapi({
      example: validateExamenExampleResponse.updated_at,
    }),
    deleted_at: z.string().datetime().optional().nullable().openapi({
      example: validateExamenExampleResponse.deleted_at,
    }),
    state_id: z.number().int().positive().openapi({
      example: validateExamenExampleResponse.state_id,
    }),
  })
  .openapi({
    example: validateExamenExampleResponse,
  })
  .openapi('Examen')
