import {
  RubricaAnaliticaCreateInputSchema,
  RubricaAnaliticaSchema,
  RubricaHolisticaCreateInputSchema,
  RubricaHolisticaSchema,
} from '@/db/generated/zod/index.js'

export const rubricaHolisticaSchemaExample = {
  id: 'cme9bssf00013356l6t6g005h',
  name: 'Examen de prueba',
  user_id: '123e4567-e89b-12d3-a456-426614174000',

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const rubricaHolisticaCreateSchema = RubricaHolisticaCreateInputSchema
export const rubricaHolisticaSchema = RubricaHolisticaSchema

export const rubricaAnaliticaSchemaExample = {
  id: 'cme9bssf00013356l6t6g005h',
  name: 'Examen de prueba',
  user_id: '123e4567-e89b-12d3-a456-426614174000',

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const rubricaAnaliticaCreateSchema = RubricaAnaliticaCreateInputSchema
export const rubricaAnaliticaSchema = RubricaAnaliticaSchema
