import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  rubricaAnaliticaSchema,
  rubricaHolisticaSchema,
} from '../schemas/rubrica-schema.js'
import {
  RubricaAnaliticaSchema,
  RubricaHolisticaSchema,
} from '@/db/generated/zod/index.js'
import { messageSuccessGeneric } from '@/schemas/generic_success.js'

export const removeRubricaHolisticaRoute = createRoute({
  method: 'delete',
  path: '/holistica/:id',
  tags: ['RubricaHolistica'],
  summary: 'Eliminar una Rúbrica Holística',
  description: 'Elimina una Rúbrica Holística.',
  request: {
    params: RubricaHolisticaSchema.pick({ id: true }),
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: messageSuccessGeneric,
        },
      },
      description: 'Devuelve un mensaje de éxito',
    },
  },
})

export const removeRubricaAnaliticaRoute = createRoute({
  method: 'delete',
  path: '/analitica/:id',
  tags: ['RubricaAnalitica'],
  summary: 'Eliminar una Rúbrica Analítica',
  description: 'Elimina una Rúbrica Analítica.',
  request: {
    params: RubricaAnaliticaSchema.pick({ id: true }),
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: messageSuccessGeneric,
        },
      },
      description: 'Devuelve un mensaje de éxito',
    },
  },
})
