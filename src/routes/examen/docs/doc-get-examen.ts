import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { examenSchemaExample } from '../schemas/examen-schema.js'
import {
  ExamenIncludeSchema,
  ExamenSchema,
  ExamenWhereInputSchema,
} from '@/db/generated/zod/index.js'

const getExamenSchema = z
  .object({
    examen_id: z.string().openapi({ example: examenSchemaExample.id }),
  })
  .openapi({
    example: {
      examen_id: examenSchemaExample.id,
    },
  })
  .openapi('Get_Examen_Schema')

export type getExamenSchemaProps = z.infer<typeof getExamenSchema>

const queryCompleteSchema = z.object({
  filters: z
    .string()
    .transform(val => JSON.parse(val))
    .pipe(ExamenWhereInputSchema),
  includes: z
    .string()
    .transform(val => JSON.parse(val))
    .pipe(ExamenIncludeSchema)
    .optional(),
})

export type queryCompleteSchemaProps = z.infer<typeof queryCompleteSchema>

export const getExamenRoute = createRoute({
  method: 'get',
  path: '/:examen_id',
  tags: ['Examen'],
  summary: 'Obtener examen',
  description:
    'Obtener examen. Recibe como parámetros el ID del usuario (string) y el ID del examen (string).',
  request: {
    query: queryCompleteSchema,
    params: getExamenSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: ExamenSchema,
        },
      },
      description: 'Devuelve el examen',
    },
  },
})
