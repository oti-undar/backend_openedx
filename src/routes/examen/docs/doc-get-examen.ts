import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { examenSchemaExample } from '../schemas/examen-schema.js'
import {
  ExamenSchema,
  ExamenWhereInputSchema,
} from 'prisma/generated/zod/index.js'
import qs from 'qs'

export type ExamenWhereInputSchemaProps = z.infer<typeof ExamenWhereInputSchema>

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

const queryCompleteSchema = getUserIdSchema.extend({
  filters: ExamenWhereInputSchema,
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
    query: getUserIdSchema.extend({
      filters: z
        .any()
        .optional()
        .openapi({
          example: { state: { name: 'Activo' } },
          description: 'Filtros para obtener examen',
        }),
    }),
    params: getExamenSchema,
  },
  middleware: async (c, next) => {
    const url = c.req.url
    const queryStr = url.split('?')[1] ?? ''
    const parsedQuery = qs.parse(queryStr)

    const result = queryCompleteSchema.safeParse(parsedQuery)

    if (!result.success) return c.json(result, 400)

    c.set('queryValidated', result.data)
    await next()
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
