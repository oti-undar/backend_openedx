import { createRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '@/db/generated/zod/index.js'
import {
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'

const GetUsuarioSchema = z
  .object({ id: z.coerce.number().int().positive() })
  .openapi({ example: { id: 4 } })
  .openapi('Get_Usuario_Schema')

export type GetUsuarioSchemaProps = z.infer<typeof GetUsuarioSchema>

export const getUsuarioRoute = createRoute({
  method: 'get',
  path: '/:id',
  tags: ['Usuario'],
  summary: 'Obtener usuario',
  description: 'Obtiene todos los datos del usuario por id.',
  request: {
    params: GetUsuarioSchema,
  },
  responses: {
    ...validateErrorResponse,
    ...otherErrorResponse,
    200: {
      content: { 'application/json': { schema: UserSchema } },
      description: 'Devuelve el usuario',
    },
  },
})
