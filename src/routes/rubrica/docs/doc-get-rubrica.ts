import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  rubricaAnaliticaSchema,
  rubricaHolisticaSchema,
} from '../schemas/rubrica-schema.js'

const getRubricaHolisticaSchema = z.object({
  id: z.string().cuid(),
})

export type GetRubricaHolisticaSchemaProps = z.infer<
  typeof getRubricaHolisticaSchema
>

export const getRubricaHolisticaRoute = createRoute({
  method: 'get',
  path: '/holistica/:id',
  tags: ['RubricaHolistica'],
  summary: 'Obtener una Rúbrica Holística',
  description: 'Obtiene una Rúbrica Holística.',
  request: {
    params: getRubricaHolisticaSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: rubricaHolisticaSchema,
        },
      },
      description: 'Devuelve la Rúbrica Holística',
    },
  },
})

const getRubricaAnaliticaSchema = z.object({
  id: z.string().cuid(),
})

export type GetRubricaAnaliticaSchemaProps = z.infer<
  typeof getRubricaAnaliticaSchema
>

export const getRubricaAnaliticaRoute = createRoute({
  method: 'get',
  path: '/analitica/:id',
  tags: ['RubricaAnalitica'],
  summary: 'Obtener una Rúbrica Analítica',
  description: 'Obtiene una Rúbrica Analítica.',
  request: {
    params: getRubricaAnaliticaSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: rubricaAnaliticaSchema,
        },
      },
      description: 'Devuelve la Rúbrica Analítica',
    },
  },
})
