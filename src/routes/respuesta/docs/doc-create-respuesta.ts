import { createRoute } from '@hono/zod-openapi'
import {
  validateRespuesta,
  validateRespuestaResponse,
} from '../validations/validate-create-respuesta.js'
import { validateErrorResponse } from '@/schemas/validation.js'

export const route = createRoute({
  method: 'post',
  path: '/',
  tags: ['Respuesta'],
  summary: 'Crear una respuesta',
  description:
    'Crea una nueva respuesta para una pregunta. Recibe como parámetros la respuesta (string), si es correcta (booleano) y el ID de la pregunta (número). Si la respuesta se crea correctamente, se devuelve la respuesta creada.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: validateRespuesta,
        },
      },
      required: true,
    },
  },
  responses: {
    ...validateErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: validateRespuestaResponse,
        },
      },
      description: 'Devuelve la respuesta creada',
    },
  },
})
