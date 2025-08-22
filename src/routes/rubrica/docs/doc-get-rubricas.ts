import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  rubricaAnaliticaSchema,
  rubricaHolisticaSchema,
} from '../schemas/rubrica-schema.js'

const getRubricasHolisticaSchema = z.object({
  user_id: z.string(),
})

export type GetRubricasHolisticaSchemaProps = z.infer<
  typeof getRubricasHolisticaSchema
>

export const getRubricasHolisticaRoute = createRoute({
  method: 'get',
  path: '/holistica',
  tags: ['RubricaHolistica'],
  summary: 'Obtener todas las Rúbricas Holísticas del usuario',
  description: 'Obtiene todas las Rúbricas Holísticas del usuario.',
  request: {
    query: getRubricasHolisticaSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.array(rubricaHolisticaSchema),
        },
      },
      description: 'Devuelve las Rúbricas Holísticas',
    },
  },
})

const getRubricasAnaliticaSchema = z.object({
  user_id: z.string(),
})

export type GetRubricasAnaliticaSchemaProps = z.infer<
  typeof getRubricasAnaliticaSchema
>

export const getRubricasAnaliticaRoute = createRoute({
  method: 'get',
  path: '/analitica',
  tags: ['RubricaAnalitica'],
  summary: 'Obtener todas las Rúbricas Analíticas del usuario',
  description: 'Obtiene todas las Rúbricas Analíticas del usuario.',
  request: {
    query: getRubricasAnaliticaSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.array(rubricaAnaliticaSchema),
        },
      },
      description: 'Devuelve las Rúbricas Analíticas',
    },
  },
})
