import { examenSchemaExample } from '@/routes/examen/schemas/examen-schema.js'
import { z } from '@hono/zod-openapi'

export const validateError = z
  .object({
    success: z.literal(false).openapi({
      example: false,
    }),
    error: z
      .object({
        issues: z
          .array(
            z
              .object({
                code: z.string().openapi({
                  example: 'invalid_string',
                }),
                message: z.string().openapi({
                  example: 'Invalid email',
                }),
                path: z.array(z.string()).openapi({
                  example: ['email'],
                }),
                validation: z.string().optional().openapi({
                  example: 'email',
                }),
                expected: z.string().optional().openapi({
                  example: 'string',
                }),
                received: z.string().optional().openapi({
                  example: 'undefined',
                }),
              })
              .openapi({
                example: {
                  code: 'invalid_string',
                  message: 'Invalid email',
                  path: ['email'],
                  validation: 'email',
                  expected: 'string',
                  received: 'undefined',
                },
              })
          )
          .openapi({
            example: [
              {
                code: 'invalid_string',
                message: 'Invalid email',
                path: ['email'],
                validation: 'email',
                expected: 'string',
                received: 'undefined',
              },
            ],
          }),
        name: z.string().openapi({
          example: 'ZodError',
        }),
      })
      .openapi({
        example: {
          issues: [
            {
              code: 'invalid_string',
              message: 'Invalid email',
              path: ['email'],
              validation: 'email',
              expected: 'string',
              received: 'undefined',
            },
          ],
          name: 'ZodError',
        },
      }),
  })
  .openapi({
    example: {
      success: false,
      error: {
        issues: [
          {
            code: 'invalid_string',
            message: 'Invalid email',
            path: ['email'],
            validation: 'email',
            expected: 'string',
            received: 'undefined',
          },
        ],
        name: 'ZodError',
      },
    },
  })
  .openapi('Validate_error')

export const validateErrorResponse = {
  400: {
    content: {
      'application/json': {
        schema: validateError,
      },
    },
    description: 'Input does not match the required format',
  },
}

export const otherError = z
  .object({
    error: z
      .object({
        name: z.string().openapi({
          example: 'PrismaClientValidationError',
        }),
        errorCode: z.string().optional().openapi({
          example: 'P1001',
        }),
        message: z.string().optional().openapi({
          example: 'Error al crear el examen',
        }),
        clientVersion: z.string().optional().openapi({
          example: '6.7.0',
        }),
      })
      .openapi({
        example: {
          name: 'PrismaClientValidationError',
          errorCode: 'P1001',
          clientVersion: '6.7.0',
          message: 'Error al crear el examen',
        },
      }),
  })
  .openapi({
    example: {
      error: {
        name: 'PrismaClientValidationError',
        errorCode: 'P1001',
        clientVersion: '6.7.0',
        message: 'Error al crear el examen',
      },
    },
  })
  .openapi('Other_Error')

export const otherErrorResponse = {
  409: {
    content: {
      'application/json': {
        schema: otherError,
      },
    },
    description: 'Input does not match the required format',
  },
}

export const getUserIdSchema = z
  .object({
    user_id: z
      .string()
      .openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  })
  .openapi({
    example: {
      user_id: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  .openapi('Get_UserId_Schema')

export type getUserIdSchemaProps = z.infer<typeof getUserIdSchema>

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/x-matroska', // mkv
  'video/webm',
  'audio/ogg',
  'audio/oga',
  'audio/mpeg', // mp3
  'audio/wav',
  'audio/aac',
]
export const fileSchema = z
  .custom<File>(
    file => {
      return (
        typeof file === 'object' &&
        file !== null &&
        'type' in file &&
        allowedMimeTypes.includes((file as File).type)
      )
    },
    {
      message: `Archivo no válido o tipo no permitido`,
    }
  )
  .optional()
  .openapi('File_Schema')

export type fileSchemaProps = z.infer<typeof fileSchema>
