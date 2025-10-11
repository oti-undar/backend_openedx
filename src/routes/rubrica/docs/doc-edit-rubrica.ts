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
import {
  RubricaAnaliticaSchema,
  RubricaHolisticaSchema,
} from '@/db/generated/zod/index.js'

export const editRubricaHolisticaRoute = createRoute({
  method: 'put',
  path: '/holistica/:id',
  tags: ['RubricaHolistica'],
  summary: 'Editar una Rúbrica Holística',
  description: 'Edita una Rúbrica Holística.',
  request: {
    params: RubricaHolisticaSchema.pick({ id: true }),
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

export const editRubricaAnaliticaRoute = createRoute({
  method: 'put',
  path: '/analitica/:id',
  tags: ['RubricaAnalitica'],
  summary: 'Editar una Rúbrica Analítica',
  description: 'Edita una Rúbrica Analítica.',
  request: {
    params: RubricaAnaliticaSchema.pick({ id: true }),
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
