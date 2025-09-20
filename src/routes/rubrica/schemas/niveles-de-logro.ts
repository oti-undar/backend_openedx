import {
  NivelesDeLogroCreateInputSchema,
  NivelesDeLogroSchema,
} from '@/db/generated/zod/index.js'

export const nivelesDeLogroSchemaExample = {
  id: 1,
  name: 'Test',
  rubrica_analitica_id: 4,
  indicador_id: 1,
  criterios: 'Test',
  nota: 'Test',

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const nivelesDeLogroCreateSchema = NivelesDeLogroCreateInputSchema
export const nivelesDeLogroSchema = NivelesDeLogroSchema
