import { z } from '@hono/zod-openapi'

const messageSuccessGenericExample = {
  message: 'La operación se realizó correctamente',
}

export const messageSuccessGeneric = z
  .object({
    message: z.string().openapi({
      example: messageSuccessGenericExample.message,
    }),
  })
  .openapi({
    example: messageSuccessGenericExample,
  })
  .openapi('Message_success')
