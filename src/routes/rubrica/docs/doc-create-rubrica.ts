import { createRoute } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  rubricaAnaliticaCreateSchema,
  rubricaAnaliticaSchema,
  rubricaHolisticaCreateSchema,
  rubricaHolisticaSchema,
} from '../schemas/rubrica-schema.js'

export const createRubricaHolisticaRoute = createRoute({
  method: 'post',
  path: '/holistica',
  tags: ['RubricaHolistica'],
  summary: 'Crear una Rúbrica Holística',
  description: 'Crea una nueva Rúbrica Holística.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: rubricaHolisticaCreateSchema,
        },
      },
      required: true,
    },
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
      description: 'Devuelve la Rúbrica Holística creada',
    },
  },
})

export const createRubricaAnaliticaRoute = createRoute({
  method: 'post',
  path: '/analitica',
  tags: ['RubricaAnalitica'],
  summary: 'Crear una Rúbrica Analítica',
  description: 'Crea una nueva Rúbrica Analítica.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: rubricaAnaliticaCreateSchema,
        },
      },
      required: true,
    },
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
      description: 'Devuelve la Rúbrica Analítica creada',
    },
  },
})
