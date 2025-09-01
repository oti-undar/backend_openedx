import {
  IndicadoresCreateInputSchema,
  IndicadoresSchema,
} from '@/db/generated/zod/index.js'

export const indicadoresSchemaExample = {
  id: 1,
  name: 'cme9bssf00013356l6t6g005h',
  rubrica_analitica_id: 4,

  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export const indicadoresCreateSchema = IndicadoresCreateInputSchema
export const indicadoresSchema = IndicadoresSchema
