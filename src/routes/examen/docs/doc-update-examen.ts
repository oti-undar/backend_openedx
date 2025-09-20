import { createRoute, z } from '@hono/zod-openapi'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import {
  ExamenSchema,
  ExamenUncheckedUpdateInputSchema,
  ExamenUpdateInputSchema,
} from '@/db/generated/zod/index.js'

const updateExamenSchema = z.union([
  ExamenUpdateInputSchema,
  ExamenUncheckedUpdateInputSchema,
])

export type UpdateExamenSchemaProps = z.infer<typeof updateExamenSchema>

export const updateExamenRoute = createRoute({
  method: 'post',
  path: '/:id',
  tags: ['Examen'],
  summary: 'Actualizar un examen',
  description:
    'Actualiza un examen. Recibe como parámetros el ID del examen (string), el título (string), la descripción (string), la imagen (string), el video (string), la fecha de vencimiento (string) y el ID del usuario (string). Si el examen se actualiza correctamente, se devuelve el examen actualizado.',
  request: {
    params: ExamenSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: updateExamenSchema,
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
          schema: ExamenSchema,
        },
      },
      description: 'Devuelve el examen actualizado',
    },
  },
})
