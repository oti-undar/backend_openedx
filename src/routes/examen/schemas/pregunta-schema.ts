import { z } from '@hono/zod-openapi'

export const preguntaSchemaExample = {
  id: 1,
  title: '¿Cuál es la capital de Francia?',
  description: 'Pregunta sobre geografía europea',
  img: 'https://example.com/pregunta.jpg',
  video: 'https://example.com/pregunta.mp4',
  audio: 'https://example.com/pregunta.mp3',
  puntos: 1,
  duracion: 30.0,
  inicio_pregunta: '2025-05-23T21:54:05.000Z',
  examen_id: '123e4567-e89b-12d3-a456-426614174000',
}

export const preguntaSchema = z
  .object({
    id: z.number().int().openapi({ example: preguntaSchemaExample.id }),
    title: z.string().openapi({ example: preguntaSchemaExample.title }),
    description: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: preguntaSchemaExample.description }),
    img: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: preguntaSchemaExample.img }),
    video: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: preguntaSchemaExample.video }),
    audio: z
      .string()
      .optional()
      .nullable()
      .openapi({ example: preguntaSchemaExample.audio }),
    puntos: z
      .number()
      .int()
      .default(1)
      .openapi({ example: preguntaSchemaExample.puntos }),
    duracion: z
      .number()
      .optional()
      .nullable()
      .openapi({ example: preguntaSchemaExample.duracion }),
    inicio_pregunta: z
      .string()
      .datetime()
      .optional()
      .nullable()
      .openapi({ example: preguntaSchemaExample.inicio_pregunta }),
    examen_id: z.string().openapi({ example: preguntaSchemaExample.examen_id }),
  })
  .openapi({ example: preguntaSchemaExample })
  .openapi('Pregunta_Schema')

export type preguntaSchemaProps = z.infer<typeof preguntaSchema>
