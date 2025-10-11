import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { ExamenSchema } from '@/db/generated/zod/index.js'
import { messageSuccessGeneric } from '@/schemas/generic_success.js'

export const removeExamenRoute = createRoute({
  method: 'delete',
  path: '/:id',
  tags: ['Examen'],
  summary: 'Eliminar examen',
  description:
    'Eliminar examen. Recibe como parámetros el ID del examen (string).',
  request: {
    params: ExamenSchema.pick({
      id: true,
    }),
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
