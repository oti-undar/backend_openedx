import { createRoute } from '@hono/zod-openapi'
import { validateErrorResponse } from '@/schemas/validation.js'
import {
  validateExamen,
  validateExamenResponse,
} from '../validations/validate-create-examen.js'

export const route = createRoute({
  method: 'post',
  path: '/',
  tags: ['Examen'],
  summary: 'Crear un examen',
  description:
    'Crea un nuevo examen. Recibe como parámetros el título (string), la descripción (string), la imagen (string), el video (string), la fecha de vencimiento (string) y el ID del usuario (string). Si el examen se crea correctamente, se devuelve el examen creado.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: validateExamen,
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
          schema: validateExamenResponse,
        },
      },
      description: 'Devuelve el examen creado',
    },
  },
})
