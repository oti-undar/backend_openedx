import { z } from '@hono/zod-openapi'

export const cursoSchemaExample = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Curso de ejemplo',
  user_id: '123e4567-e89b-12d3-a456-426614174000',
  created_at: '2025-05-23T21:54:05.000Z',
  updated_at: '2025-05-23T21:54:05.000Z',
  deleted_at: '2025-05-23T21:54:05.000Z',
}

export const cursoSchema = z
  .object({
    id: z.string().uuid().openapi({ example: cursoSchemaExample.id }),
    name: z.string().openapi({ example: cursoSchemaExample.name }),
    created_at: z
      .string()
      .datetime()
      .openapi({ example: cursoSchemaExample.created_at }),
    updated_at: z
      .string()
      .datetime()
      .openapi({ example: cursoSchemaExample.updated_at }),
    deleted_at: z
      .string()
      .datetime()
      .optional()
      .nullable()
      .openapi({ example: cursoSchemaExample.deleted_at }),
  })
  .openapi({
    example: cursoSchemaExample,
  })
  .openapi('Curso_Schema')

export type cursoSchemaProps = z.infer<typeof cursoSchema>
