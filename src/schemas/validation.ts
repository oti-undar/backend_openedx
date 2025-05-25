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
