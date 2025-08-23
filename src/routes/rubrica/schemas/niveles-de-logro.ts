import { TipoNivel } from '@prisma/client'
import {
  NivelesDeLogroCreateInputSchema,
  NivelesDeLogroSchema,
} from '@/db/generated/zod/index.js'

export const nivelesDeLogroSchemaExample = {
  id: 1,
  tipo: TipoNivel.Porcentaje,
  name: 'Test',
  rubrica_analitica_id: '123e4567-e89b-12d3-a456-426614174000',
  indicador_id: 1,
  criterios: 'Test',
  nota: 'Test',

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const nivelesDeLogroCreateSchema = NivelesDeLogroCreateInputSchema
export const nivelesDeLogroSchema = NivelesDeLogroSchema
