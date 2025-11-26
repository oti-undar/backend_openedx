import { createRoute, z } from '@hono/zod-openapi'
import {
  fileSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { parseFormDataToObject } from '@/helpers/parse-form-data.js'
import { messageSuccessGeneric } from '@/schemas/generic_success.js'

const AvatarUploadSchema = z
  .object({
    avatar: fileSchema,
  })
  .refine((v) => !!v.avatar, {
    path: ['avatar'],
    message: 'avatar es requerido',
  })
  .openapi('Avatar_Upload_Schema')

export type AvatarUploadSchemaProps = z.infer<typeof AvatarUploadSchema>

export const uploadAvatarRoute = createRoute({
  method: 'post',
  path: '/:id/avatar',
  tags: ['Usuario'],
  summary: 'Subir avatar de usuario',
  description: 'Sube o reemplaza el avatar del usuario.',
  request: {
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: {
      content: {
        'multipart/form-data': {
          schema: AvatarUploadSchema,
        },
      },
      required: true,
    },
  },
  middleware: async (c, next) => {
    const formData = await c.req.formData()
    const parsed = parseFormDataToObject(formData)
    const result = AvatarUploadSchema.safeParse(parsed)
    if (!result.success) return c.json(result, 400)
    c.set('formDataValidated', result.data)
    await next()
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
      description: 'Devuelve el usuario actualizado',
    },
  },
})
