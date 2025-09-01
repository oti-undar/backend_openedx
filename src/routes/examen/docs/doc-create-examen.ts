import { createRoute, z } from '@hono/zod-openapi'
import {
  fileSchema,
  otherErrorResponse,
  validateErrorResponse,
} from '@/schemas/validation.js'
import { examenSchemaExample } from '../schemas/examen-schema.js'
import { preguntaSchemaExample } from '../schemas/pregunta-schema.js'
import { respuestaSchemaExample } from '../schemas/respuesta-schema.js'
import { parseFormDataToObject } from '@/helpers/parse-form-data.js'
import {
  ExamenSchema,
  PreguntaSchema,
  RespuestaSchema,
} from '@/db/generated/zod/index.js'
import { addOptionalToNullable } from '@/helpers/agregar-optional-schema.js'

const {
  id,
  created_at,
  updated_at,
  deleted_at,
  img,
  video,
  audio,
  state_id,
  peso,
  ...examenExample
} = examenSchemaExample
const {
  id: preguntaId,
  examen_id,
  img: imgPregunta,
  video: videoPregunta,
  audio: audioPregunta,
  puntos,
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

const createExamenSchema = addOptionalToNullable(ExamenSchema)
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    deleted_at: true,
    img: true,
    video: true,
    audio: true,
    state_id: true,
    peso: true,
    user_id: true,
  })
  .extend({
    user_id: z
      .string()
      .transform(val => Number(val))
      .refine(val => !isNaN(val), { message: 'user_id inválido' }),
    state_id: z
      .string()
      .transform(val => Number(val))
      .refine(val => !isNaN(val), { message: 'state_id inválido' }),
    peso: z
      .string()
      .default('1')
      .transform(val => Number(val))
      .refine(val => !isNaN(val), { message: 'peso inválido' }),
    archivo: fileSchema,
    preguntas: z.any().openapi({
      example: [
        {
          ...preguntaExample,
          respuestas: [respuestaExample],
        },
      ],
      description: 'Array de preguntas',
    }),
  })

export type CreateExamenSchemaProps = z.infer<typeof createExamenSchema>

const createExamenCompleteSchema = createExamenSchema
  .extend({
    preguntas: z
      .array(
        addOptionalToNullable(PreguntaSchema)
          .omit({
            id: true,
            examen_id: true,
            img: true,
            video: true,
            audio: true,
            puntos: true,
          })
          .extend({
            archivo: fileSchema,
            puntos: z
              .string()
              .default('1')
              .transform(val => Number(val))
              .refine(val => !isNaN(val), { message: 'puntos inválidos' }),
            indicadores: z.array(z.coerce.number().int()).optional(),
            respuestas: z
              .array(
                addOptionalToNullable(RespuestaSchema)
                  .omit({
                    id: true,
                    pregunta_id: true,
                    img: true,
                    video: true,
                    audio: true,
                    correcta: true,
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
      state_id: '1',
      peso: '1',
      preguntas: [
        {
          ...preguntaExample,
          puntos: '1',
          respuestas: [respuestaExample],
        },
      ],
    },
  })
  .openapi('Create_Examen_Schema')

export type CreateExamenCompleteSchemaProps = z.infer<
  typeof createExamenCompleteSchema
>

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
        'multipart/form-data': {
          schema: createExamenSchema,
        },
      },
      required: true,
    },
  },
  middleware: async (c, next) => {
    const formData = await c.req.formData()
    const parsedQuery = parseFormDataToObject(formData)

    const result = createExamenCompleteSchema.safeParse(parsedQuery)

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
          schema: ExamenSchema,
        },
      },
      description: 'Devuelve el examen creado',
    },
  },
})
