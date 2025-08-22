import { z } from '@hono/zod-openapi'

export const stateSchemaExample = {
  id: 1,
  name: 'Activo',
}

export const stateSchema = z.object({
  id: z.number().int().openapi({ example: stateSchemaExample.id }),
  name: z.string().openapi({ example: stateSchemaExample.name }),
}).openapi({ example: stateSchemaExample })

export type stateSchemaProps = z.infer<typeof stateSchema>
