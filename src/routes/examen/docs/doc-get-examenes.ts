import { createRoute, z } from '@hono/zod-openapi'
import {
  getUserIdSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'

const getExamenesSchema = z.array(
  z.object({
    title: z.string(),
    id: z.string(),
    preguntas: z.array(
      z.object({
        id: z.string(),
      })
    ),
  })
)

export const getExamenesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Examen'],
  summary: 'Obtener examenes',
  description:
    'Obtener examenes. Recibe como parámetros el ID del usuario (string).',
  request: {
    query: getUserIdSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: {
        'application/json': {
          schema: getExamenesSchema,
        },
      },
      description: 'Devuelve los examenes del usuario',
    },
  },
})
