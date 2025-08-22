import { createRoute, z } from '@hono/zod-openapi'
import { otherErrorResponse, validateErrorResponse } from '@/schemas/validation.js'
import { stateSchema, stateSchemaExample } from '../schemas/state-schema.js'

export const getStatesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['State'],
  summary: 'Obtener states',
  description: 'Obtener todos los states.',
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: z.array(stateSchema).openapi({ example: [stateSchemaExample] }),
        },
      },
      description: 'Devuelve todos los states',
    },
  },
})
