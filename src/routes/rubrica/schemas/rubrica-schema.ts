import {
  RubricaAnaliticaSchema,
  RubricaAnaliticaUncheckedCreateInputSchema,
  RubricaHolisticaSchema,
  RubricaHolisticaUncheckedCreateInputSchema,
} from '@/db/generated/zod/index.js'

export const rubricaHolisticaSchemaExample = {
  id: 'cme9bssf00013356l6t6g005h',
  name: 'Examen de prueba',
  user_id: 4,

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const rubricaHolisticaCreateSchema =
  RubricaHolisticaUncheckedCreateInputSchema
export const rubricaHolisticaSchema = RubricaHolisticaSchema

export const rubricaAnaliticaSchemaExample = {
  id: 'cme9bssf00013356l6t6g005h',
  name: 'Examen de prueba',
  user_id: 4,

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const rubricaAnaliticaCreateSchema =
  RubricaAnaliticaUncheckedCreateInputSchema
export const rubricaAnaliticaSchema = RubricaAnaliticaSchema
