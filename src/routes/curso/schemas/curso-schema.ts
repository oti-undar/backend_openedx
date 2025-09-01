import { z } from '@hono/zod-openapi'

export const cursoSchemaExample = {
  id: '620e4567-e89b-12d3-a456-426614174000',
  name: 'Curso de ejemplo',
  user_id: 4,
  created_at: '2025-05-23T21:54:05.000Z',
  updated_at: '2025-05-23T21:54:05.000Z',
  deleted_at: '2025-05-23T21:54:05.000Z',
}

export const getCursosSchema = z.array(
  z.object({
    name: z.string(),
    id: z.string(),
    usuarios: z.array(
      z.object({
        user_id: z.number().int(),
        is_instructor: z.boolean(),
      })
    ),
  })
)
