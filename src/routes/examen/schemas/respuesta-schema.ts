import { z } from '@hono/zod-openapi'

export const respuestaSchemaExample = {
  id: 1,
  respuesta: 'París',
  img: 'https://example.com/respuesta.jpg',
  video: 'https://example.com/respuesta.mp4',
  audio: 'https://example.com/respuesta.mp3',
  correcta: true,
  pregunta_id: 1,
}

export const respuestaSchema = z
  .object({
    id: z.number().int().openapi({ example: respuestaSchemaExample.id }),
    respuesta: z
      .string()
      .openapi({ example: respuestaSchemaExample.respuesta }),
    img: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: respuestaSchemaExample.img }),
    video: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: respuestaSchemaExample.video }),
    audio: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: respuestaSchemaExample.audio }),
    correcta: z
      .boolean()
      .default(false)
      .openapi({ example: respuestaSchemaExample.correcta }),
    pregunta_id: z
      .number()
      .int()
      .openapi({ example: respuestaSchemaExample.pregunta_id }),
  })
  .openapi({ example: respuestaSchemaExample })
  .openapi('Respuesta_Schema')

export type respuestaSchemaProps = z.infer<typeof respuestaSchema>
