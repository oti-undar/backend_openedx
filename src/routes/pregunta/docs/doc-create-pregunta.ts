import { createRoute } from '@hono/zod-openapi'
import { validateErrorResponse } from '@/schemas/validation.js'
import {
  validatePregunta,
  validatePreguntaResponse,
} from '../validations/validate-create-pregunta.js'

export const route = createRoute({
  method: 'post',
  path: '/',
  tags: ['Pregunta'],
  summary: 'Crear una pregunta',
  description:
    'Crea una nueva pregunta. Recibe como parámetros el título (string), la descripción (string), la imagen (string), el video (string) y el ID del examen (string). Si la pregunta se crea correctamente, se devuelve la pregunta creada.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: validatePregunta,
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
          schema: validatePreguntaResponse,
        },
      },
      description: 'Devuelve la pregunta creada',
    },
  },
})
