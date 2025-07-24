import { z } from '@hono/zod-openapi'

const examenSchemaExample = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Examen de prueba',
  description: 'Descripción del examen',
  img: 'https://example.com/img.jpg',
  video: 'https://example.com/video.mp4',
  audio: 'https://example.com/audio.mp3',
  peso: 1,
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  inicio_examen: '2025-05-23 21:54:05',
  final_examen: '2025-05-23 21:54:05',
  state_id: 1,
  created_at: '2025-05-23 21:54:05',
  updated_at: '2025-05-23 21:54:05',
  deleted_at: '2025-05-23 21:54:05',
}

export const examenSchema = z
  .object({
    id: z.string().uuid().openapi({
      example: examenSchemaExample.user_id,
    }),
    title: z.string().openapi({
      example: examenSchemaExample.title,
    }),
    description: z.string().optional().nullable().openapi({
      example: examenSchemaExample.description,
    }),
    img: z.string().optional().nullable().openapi({
      example: examenSchemaExample.img,
    }),
    video: z.string().optional().nullable().openapi({
      example: examenSchemaExample.video,
    }),
    audio: z.string().optional().nullable().openapi({
      example: examenSchemaExample.video,
    }),
    peso: z.number().int().default(1).openapi({
      example: 1,
    }),
    user_id: z.string().openapi({
      example: examenSchemaExample.user_id,
    }),
    inicio_examen: z.string().datetime().optional().nullable().openapi({
      example: examenSchemaExample.inicio_examen,
    }),
    final_examen: z.string().datetime().optional().nullable().openapi({
      example: examenSchemaExample.final_examen,
    }),
    state_id: z.number().int().openapi({
      example: 1,
    }),
    created_at: z.string().datetime().openapi({
      example: examenSchemaExample.created_at,
    }),
    updated_at: z.string().datetime().openapi({
      example: examenSchemaExample.updated_at,
    }),
    deleted_at: z.string().datetime().optional().nullable().openapi({
      example: examenSchemaExample.deleted_at,
    }),
  })
  .openapi({
    example: examenSchemaExample,
  })
  .openapi('Examen_Schema')

export type examenSchemaProps = z.infer<typeof examenSchema>
