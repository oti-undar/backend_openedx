import { createRoute, z } from '@hono/zod-openapi'
import {
  fileSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { examenSchema, examenSchemaExample } from '../schemas/examen-schema.js'
import {
  preguntaSchema,
  preguntaSchemaExample,
} from '../schemas/pregunta-schema.js'
import {
  respuestaSchema,
  respuestaSchemaExample,
} from '../schemas/respuesta-schema.js'

const {
  id,
  created_at,
  updated_at,
  deleted_at,
  img,
  video,
  audio,
  ...examenExample
} = examenSchemaExample
const {
  id: preguntaId,
  examen_id,
  img: imgPregunta,
  video: videoPregunta,
  audio: audioPregunta,
  ...preguntaExample
} = preguntaSchemaExample
const {
  id: respuestaId,
  pregunta_id,
  img: imgRespuesta,
  video: videoRespuesta,
  audio: audioRespuesta,
  ...respuestaExample
} = respuestaSchemaExample

const createExamenSchema = examenSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    deleted_at: true,
    img: true,
    video: true,
    audio: true,
  })
  .extend({
    archivo: fileSchema,
    preguntas: z
      .array(
        preguntaSchema
          .omit({
            id: true,
            examen_id: true,
            img: true,
            video: true,
            audio: true,
          })
          .extend({
            archivo: fileSchema,
            respuestas: z
              .array(
                respuestaSchema
                  .omit({
                    id: true,
                    pregunta_id: true,
                    img: true,
                    video: true,
                    audio: true,
                  })
                  .extend({
                    archivo: fileSchema,
                  })
              )
              .min(4),
          })
      )
      .min(1),
  })
  .openapi({
    example: {
      ...examenExample,
      preguntas: [
        {
          ...preguntaExample,
          respuestas: [respuestaExample],
        },
      ],
    },
  })
  .openapi('Create_Examen_Schema')

export type CreateExamenSchemaProps = z.infer<typeof createExamenSchema>

export const createExamenRoute = createRoute({
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
          schema: createExamenSchema,
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
          schema: examenSchema,
        },
      },
      description: 'Devuelve el examen creado',
    },
  },
})
