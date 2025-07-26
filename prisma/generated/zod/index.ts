import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CursoScalarFieldEnumSchema = z.enum(['id','name','created_at','updated_at','deleted_at']);

export const EjecucionExamenScalarFieldEnumSchema = z.enum(['id','alumno_id','examen_id','final_examen','created_at','updated_at','deleted_at']);

export const RespuestasEjecucionExamenScalarFieldEnumSchema = z.enum(['id','ejecucion_examen_id','pregunta_id','respuesta_id','created_at','updated_at','deleted_at']);

export const ExamenScalarFieldEnumSchema = z.enum(['id','title','description','img','video','audio','peso','user_id','curso_id','inicio_examen','final_examen','state_id','created_at','updated_at','deleted_at']);

export const PreguntaScalarFieldEnumSchema = z.enum(['id','title','description','img','video','audio','puntos','duracion','inicio_pregunta','examen_id']);

export const RespuestaScalarFieldEnumSchema = z.enum(['id','respuesta','img','video','audio','correcta','pregunta_id']);

export const HistorialScalarFieldEnumSchema = z.enum(['id','user_id','examen_id','puntaje','created_at','updated_at','deleted_at']);

export const StateScalarFieldEnumSchema = z.enum(['id','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const CursoOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const EjecucionExamenOrderByRelevanceFieldEnumSchema = z.enum(['id','alumno_id','examen_id']);

export const RespuestasEjecucionExamenOrderByRelevanceFieldEnumSchema = z.enum(['id','ejecucion_examen_id']);

export const ExamenOrderByRelevanceFieldEnumSchema = z.enum(['id','title','description','img','video','audio','user_id','curso_id']);

export const PreguntaOrderByRelevanceFieldEnumSchema = z.enum(['title','description','img','video','audio','examen_id']);

export const RespuestaOrderByRelevanceFieldEnumSchema = z.enum(['respuesta','img','video','audio']);

export const HistorialOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','examen_id']);

export const StateTypeSchema = z.enum(['Activo','Inconcluso','Disponible','Suspendido','Inactivo','Finalizado']);

export type StateTypeType = `${z.infer<typeof StateTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CURSO SCHEMA
/////////////////////////////////////////

export const CursoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Curso = z.infer<typeof CursoSchema>

/////////////////////////////////////////
// EJECUCION EXAMEN SCHEMA
/////////////////////////////////////////

export const EjecucionExamenSchema = z.object({
  id: z.string().uuid(),
  alumno_id: z.string(),
  examen_id: z.string(),
  final_examen: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type EjecucionExamen = z.infer<typeof EjecucionExamenSchema>

/////////////////////////////////////////
// RESPUESTAS EJECUCION EXAMEN SCHEMA
/////////////////////////////////////////

export const RespuestasEjecucionExamenSchema = z.object({
  id: z.string().uuid(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.number().int(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type RespuestasEjecucionExamen = z.infer<typeof RespuestasEjecucionExamenSchema>

/////////////////////////////////////////
// EXAMEN SCHEMA
/////////////////////////////////////////

export const ExamenSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  img: z.string().nullable(),
  video: z.string().nullable(),
  audio: z.string().nullable(),
  peso: z.number().int(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().nullable(),
  final_examen: z.coerce.date().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Examen = z.infer<typeof ExamenSchema>

/////////////////////////////////////////
// PREGUNTA SCHEMA
/////////////////////////////////////////

export const PreguntaSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  img: z.string().nullable(),
  video: z.string().nullable(),
  audio: z.string().nullable(),
  puntos: z.number().int(),
  duracion: z.instanceof(Prisma.Decimal, { message: "Field 'duracion' must be a Decimal. Location: ['Models', 'Pregunta']"}).nullable(),
  inicio_pregunta: z.coerce.date().nullable(),
  examen_id: z.string(),
})

export type Pregunta = z.infer<typeof PreguntaSchema>

/////////////////////////////////////////
// RESPUESTA SCHEMA
/////////////////////////////////////////

export const RespuestaSchema = z.object({
  id: z.number().int(),
  respuesta: z.string(),
  img: z.string().nullable(),
  video: z.string().nullable(),
  audio: z.string().nullable(),
  correcta: z.boolean(),
  pregunta_id: z.number().int(),
})

export type Respuesta = z.infer<typeof RespuestaSchema>

/////////////////////////////////////////
// HISTORIAL SCHEMA
/////////////////////////////////////////

export const HistorialSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Historial = z.infer<typeof HistorialSchema>

/////////////////////////////////////////
// STATE SCHEMA
/////////////////////////////////////////

export const StateSchema = z.object({
  name: StateTypeSchema,
  id: z.number().int(),
})

export type State = z.infer<typeof StateSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CURSO
//------------------------------------------------------

export const CursoIncludeSchema: z.ZodType<Prisma.CursoInclude> = z.object({
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CursoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CursoArgsSchema: z.ZodType<Prisma.CursoDefaultArgs> = z.object({
  select: z.lazy(() => CursoSelectSchema).optional(),
  include: z.lazy(() => CursoIncludeSchema).optional(),
}).strict();

export const CursoCountOutputTypeArgsSchema: z.ZodType<Prisma.CursoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CursoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CursoCountOutputTypeSelectSchema: z.ZodType<Prisma.CursoCountOutputTypeSelect> = z.object({
  examenes: z.boolean().optional(),
}).strict();

export const CursoSelectSchema: z.ZodType<Prisma.CursoSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CursoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EJECUCION EXAMEN
//------------------------------------------------------

export const EjecucionExamenIncludeSchema: z.ZodType<Prisma.EjecucionExamenInclude> = z.object({
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  respuestas: z.union([z.boolean(),z.lazy(() => RespuestasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EjecucionExamenCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EjecucionExamenArgsSchema: z.ZodType<Prisma.EjecucionExamenDefaultArgs> = z.object({
  select: z.lazy(() => EjecucionExamenSelectSchema).optional(),
  include: z.lazy(() => EjecucionExamenIncludeSchema).optional(),
}).strict();

export const EjecucionExamenCountOutputTypeArgsSchema: z.ZodType<Prisma.EjecucionExamenCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EjecucionExamenCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EjecucionExamenCountOutputTypeSelectSchema: z.ZodType<Prisma.EjecucionExamenCountOutputTypeSelect> = z.object({
  respuestas: z.boolean().optional(),
}).strict();

export const EjecucionExamenSelectSchema: z.ZodType<Prisma.EjecucionExamenSelect> = z.object({
  id: z.boolean().optional(),
  alumno_id: z.boolean().optional(),
  examen_id: z.boolean().optional(),
  final_examen: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  respuestas: z.union([z.boolean(),z.lazy(() => RespuestasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EjecucionExamenCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESPUESTAS EJECUCION EXAMEN
//------------------------------------------------------

export const RespuestasEjecucionExamenIncludeSchema: z.ZodType<Prisma.RespuestasEjecucionExamenInclude> = z.object({
  ejecucion_examen: z.union([z.boolean(),z.lazy(() => EjecucionExamenArgsSchema)]).optional(),
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuesta: z.union([z.boolean(),z.lazy(() => RespuestaArgsSchema)]).optional(),
}).strict()

export const RespuestasEjecucionExamenArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenDefaultArgs> = z.object({
  select: z.lazy(() => RespuestasEjecucionExamenSelectSchema).optional(),
  include: z.lazy(() => RespuestasEjecucionExamenIncludeSchema).optional(),
}).strict();

export const RespuestasEjecucionExamenSelectSchema: z.ZodType<Prisma.RespuestasEjecucionExamenSelect> = z.object({
  id: z.boolean().optional(),
  ejecucion_examen_id: z.boolean().optional(),
  pregunta_id: z.boolean().optional(),
  respuesta_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  ejecucion_examen: z.union([z.boolean(),z.lazy(() => EjecucionExamenArgsSchema)]).optional(),
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuesta: z.union([z.boolean(),z.lazy(() => RespuestaArgsSchema)]).optional(),
}).strict()

// EXAMEN
//------------------------------------------------------

export const ExamenIncludeSchema: z.ZodType<Prisma.ExamenInclude> = z.object({
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  preguntas: z.union([z.boolean(),z.lazy(() => PreguntaFindManyArgsSchema)]).optional(),
  historial: z.union([z.boolean(),z.lazy(() => HistorialFindManyArgsSchema)]).optional(),
  ejecuciones: z.union([z.boolean(),z.lazy(() => EjecucionExamenFindManyArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExamenCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ExamenArgsSchema: z.ZodType<Prisma.ExamenDefaultArgs> = z.object({
  select: z.lazy(() => ExamenSelectSchema).optional(),
  include: z.lazy(() => ExamenIncludeSchema).optional(),
}).strict();

export const ExamenCountOutputTypeArgsSchema: z.ZodType<Prisma.ExamenCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ExamenCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ExamenCountOutputTypeSelectSchema: z.ZodType<Prisma.ExamenCountOutputTypeSelect> = z.object({
  preguntas: z.boolean().optional(),
  historial: z.boolean().optional(),
  ejecuciones: z.boolean().optional(),
}).strict();

export const ExamenSelectSchema: z.ZodType<Prisma.ExamenSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  img: z.boolean().optional(),
  video: z.boolean().optional(),
  audio: z.boolean().optional(),
  peso: z.boolean().optional(),
  user_id: z.boolean().optional(),
  curso_id: z.boolean().optional(),
  inicio_examen: z.boolean().optional(),
  final_examen: z.boolean().optional(),
  state_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  preguntas: z.union([z.boolean(),z.lazy(() => PreguntaFindManyArgsSchema)]).optional(),
  historial: z.union([z.boolean(),z.lazy(() => HistorialFindManyArgsSchema)]).optional(),
  ejecuciones: z.union([z.boolean(),z.lazy(() => EjecucionExamenFindManyArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExamenCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PREGUNTA
//------------------------------------------------------

export const PreguntaIncludeSchema: z.ZodType<Prisma.PreguntaInclude> = z.object({
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  respuestas: z.union([z.boolean(),z.lazy(() => RespuestaFindManyArgsSchema)]).optional(),
  respuestasEjecucionExamen: z.union([z.boolean(),z.lazy(() => RespuestasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PreguntaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PreguntaArgsSchema: z.ZodType<Prisma.PreguntaDefaultArgs> = z.object({
  select: z.lazy(() => PreguntaSelectSchema).optional(),
  include: z.lazy(() => PreguntaIncludeSchema).optional(),
}).strict();

export const PreguntaCountOutputTypeArgsSchema: z.ZodType<Prisma.PreguntaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PreguntaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PreguntaCountOutputTypeSelectSchema: z.ZodType<Prisma.PreguntaCountOutputTypeSelect> = z.object({
  respuestas: z.boolean().optional(),
  respuestasEjecucionExamen: z.boolean().optional(),
}).strict();

export const PreguntaSelectSchema: z.ZodType<Prisma.PreguntaSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  img: z.boolean().optional(),
  video: z.boolean().optional(),
  audio: z.boolean().optional(),
  puntos: z.boolean().optional(),
  duracion: z.boolean().optional(),
  inicio_pregunta: z.boolean().optional(),
  examen_id: z.boolean().optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  respuestas: z.union([z.boolean(),z.lazy(() => RespuestaFindManyArgsSchema)]).optional(),
  respuestasEjecucionExamen: z.union([z.boolean(),z.lazy(() => RespuestasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PreguntaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESPUESTA
//------------------------------------------------------

export const RespuestaIncludeSchema: z.ZodType<Prisma.RespuestaInclude> = z.object({
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuestasEjecucionExamen: z.union([z.boolean(),z.lazy(() => RespuestasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RespuestaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RespuestaArgsSchema: z.ZodType<Prisma.RespuestaDefaultArgs> = z.object({
  select: z.lazy(() => RespuestaSelectSchema).optional(),
  include: z.lazy(() => RespuestaIncludeSchema).optional(),
}).strict();

export const RespuestaCountOutputTypeArgsSchema: z.ZodType<Prisma.RespuestaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RespuestaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RespuestaCountOutputTypeSelectSchema: z.ZodType<Prisma.RespuestaCountOutputTypeSelect> = z.object({
  respuestasEjecucionExamen: z.boolean().optional(),
}).strict();

export const RespuestaSelectSchema: z.ZodType<Prisma.RespuestaSelect> = z.object({
  id: z.boolean().optional(),
  respuesta: z.boolean().optional(),
  img: z.boolean().optional(),
  video: z.boolean().optional(),
  audio: z.boolean().optional(),
  correcta: z.boolean().optional(),
  pregunta_id: z.boolean().optional(),
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuestasEjecucionExamen: z.union([z.boolean(),z.lazy(() => RespuestasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RespuestaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HISTORIAL
//------------------------------------------------------

export const HistorialIncludeSchema: z.ZodType<Prisma.HistorialInclude> = z.object({
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
}).strict()

export const HistorialArgsSchema: z.ZodType<Prisma.HistorialDefaultArgs> = z.object({
  select: z.lazy(() => HistorialSelectSchema).optional(),
  include: z.lazy(() => HistorialIncludeSchema).optional(),
}).strict();

export const HistorialSelectSchema: z.ZodType<Prisma.HistorialSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  examen_id: z.boolean().optional(),
  puntaje: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
}).strict()

// STATE
//------------------------------------------------------

export const StateIncludeSchema: z.ZodType<Prisma.StateInclude> = z.object({
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StateArgsSchema: z.ZodType<Prisma.StateDefaultArgs> = z.object({
  select: z.lazy(() => StateSelectSchema).optional(),
  include: z.lazy(() => StateIncludeSchema).optional(),
}).strict();

export const StateCountOutputTypeArgsSchema: z.ZodType<Prisma.StateCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StateCountOutputTypeSelectSchema: z.ZodType<Prisma.StateCountOutputTypeSelect> = z.object({
  examenes: z.boolean().optional(),
}).strict();

export const StateSelectSchema: z.ZodType<Prisma.StateSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StateCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CursoWhereInputSchema: z.ZodType<Prisma.CursoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict();

export const CursoOrderByWithRelationInputSchema: z.ZodType<Prisma.CursoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  examenes: z.lazy(() => ExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => CursoOrderByRelevanceInputSchema).optional()
}).strict();

export const CursoWhereUniqueInputSchema: z.ZodType<Prisma.CursoWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict());

export const CursoOrderByWithAggregationInputSchema: z.ZodType<Prisma.CursoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CursoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CursoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CursoMinOrderByAggregateInputSchema).optional()
}).strict();

export const CursoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CursoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CursoScalarWhereWithAggregatesInputSchema),z.lazy(() => CursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoScalarWhereWithAggregatesInputSchema),z.lazy(() => CursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EjecucionExamenWhereInputSchema: z.ZodType<Prisma.EjecucionExamenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alumno_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenListRelationFilterSchema).optional()
}).strict();

export const EjecucionExamenOrderByWithRelationInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  alumno_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  examen: z.lazy(() => ExamenOrderByWithRelationInputSchema).optional(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => EjecucionExamenOrderByRelevanceInputSchema).optional()
}).strict();

export const EjecucionExamenWhereUniqueInputSchema: z.ZodType<Prisma.EjecucionExamenWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  alumno_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenListRelationFilterSchema).optional()
}).strict());

export const EjecucionExamenOrderByWithAggregationInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  alumno_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EjecucionExamenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EjecucionExamenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EjecucionExamenMinOrderByAggregateInputSchema).optional()
}).strict();

export const EjecucionExamenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EjecucionExamenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  alumno_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenWhereInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ejecucion_examen: z.union([ z.lazy(() => EjecucionExamenScalarRelationFilterSchema),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuesta: z.union([ z.lazy(() => RespuestaScalarRelationFilterSchema),z.lazy(() => RespuestaWhereInputSchema) ]).optional(),
}).strict();

export const RespuestasEjecucionExamenOrderByWithRelationInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ejecucion_examen: z.lazy(() => EjecucionExamenOrderByWithRelationInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaOrderByWithRelationInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => RespuestasEjecucionExamenOrderByRelevanceInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenWhereUniqueInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).array() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ejecucion_examen: z.union([ z.lazy(() => EjecucionExamenScalarRelationFilterSchema),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuesta: z.union([ z.lazy(() => RespuestaScalarRelationFilterSchema),z.lazy(() => RespuestaWhereInputSchema) ]).optional(),
}).strict());

export const RespuestasEjecucionExamenOrderByWithAggregationInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RespuestasEjecucionExamenCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RespuestasEjecucionExamenAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RespuestasEjecucionExamenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RespuestasEjecucionExamenMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RespuestasEjecucionExamenSumOrderByAggregateInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ExamenWhereInputSchema: z.ZodType<Prisma.ExamenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExamenWhereInputSchema),z.lazy(() => ExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExamenWhereInputSchema),z.lazy(() => ExamenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  peso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema),z.lazy(() => StateWhereInputSchema) ]).optional(),
  preguntas: z.lazy(() => PreguntaListRelationFilterSchema).optional(),
  historial: z.lazy(() => HistorialListRelationFilterSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenListRelationFilterSchema).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict();

export const ExamenOrderByWithRelationInputSchema: z.ZodType<Prisma.ExamenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  inicio_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  final_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state: z.lazy(() => StateOrderByWithRelationInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaOrderByRelationAggregateInputSchema).optional(),
  historial: z.lazy(() => HistorialOrderByRelationAggregateInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  curso: z.lazy(() => CursoOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => ExamenOrderByRelevanceInputSchema).optional()
}).strict();

export const ExamenWhereUniqueInputSchema: z.ZodType<Prisma.ExamenWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ExamenWhereInputSchema),z.lazy(() => ExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExamenWhereInputSchema),z.lazy(() => ExamenWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  peso: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema),z.lazy(() => StateWhereInputSchema) ]).optional(),
  preguntas: z.lazy(() => PreguntaListRelationFilterSchema).optional(),
  historial: z.lazy(() => HistorialListRelationFilterSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenListRelationFilterSchema).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict());

export const ExamenOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExamenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  inicio_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  final_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ExamenCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExamenAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExamenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExamenMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExamenSumOrderByAggregateInputSchema).optional()
}).strict();

export const ExamenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExamenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => ExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExamenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => ExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  peso: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PreguntaWhereInputSchema: z.ZodType<Prisma.PreguntaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntaWhereInputSchema),z.lazy(() => PreguntaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntaWhereInputSchema),z.lazy(() => PreguntaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaListRelationFilterSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenListRelationFilterSchema).optional()
}).strict();

export const PreguntaOrderByWithRelationInputSchema: z.ZodType<Prisma.PreguntaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inicio_pregunta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  examen: z.lazy(() => ExamenOrderByWithRelationInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaOrderByRelationAggregateInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => PreguntaOrderByRelevanceInputSchema).optional()
}).strict();

export const PreguntaWhereUniqueInputSchema: z.ZodType<Prisma.PreguntaWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PreguntaWhereInputSchema),z.lazy(() => PreguntaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntaWhereInputSchema),z.lazy(() => PreguntaWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaListRelationFilterSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenListRelationFilterSchema).optional()
}).strict());

export const PreguntaOrderByWithAggregationInputSchema: z.ZodType<Prisma.PreguntaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inicio_pregunta: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PreguntaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PreguntaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PreguntaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PreguntaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PreguntaSumOrderByAggregateInputSchema).optional()
}).strict();

export const PreguntaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PreguntaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntaScalarWhereWithAggregatesInputSchema),z.lazy(() => PreguntaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntaScalarWhereWithAggregatesInputSchema),z.lazy(() => PreguntaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RespuestaWhereInputSchema: z.ZodType<Prisma.RespuestaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenListRelationFilterSchema).optional()
}).strict();

export const RespuestaOrderByWithRelationInputSchema: z.ZodType<Prisma.RespuestaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  respuesta: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  correcta: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta: z.lazy(() => PreguntaOrderByWithRelationInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RespuestaOrderByRelevanceInputSchema).optional()
}).strict();

export const RespuestaWhereUniqueInputSchema: z.ZodType<Prisma.RespuestaWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenListRelationFilterSchema).optional()
}).strict());

export const RespuestaOrderByWithAggregationInputSchema: z.ZodType<Prisma.RespuestaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  respuesta: z.lazy(() => SortOrderSchema).optional(),
  img: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  correcta: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RespuestaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RespuestaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RespuestaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RespuestaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RespuestaSumOrderByAggregateInputSchema).optional()
}).strict();

export const RespuestaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RespuestaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema),z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema),z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const HistorialWhereInputSchema: z.ZodType<Prisma.HistorialWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistorialWhereInputSchema),z.lazy(() => HistorialWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistorialWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistorialWhereInputSchema),z.lazy(() => HistorialWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
}).strict();

export const HistorialOrderByWithRelationInputSchema: z.ZodType<Prisma.HistorialOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  puntaje: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  examen: z.lazy(() => ExamenOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => HistorialOrderByRelevanceInputSchema).optional()
}).strict();

export const HistorialWhereUniqueInputSchema: z.ZodType<Prisma.HistorialWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => HistorialWhereInputSchema),z.lazy(() => HistorialWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistorialWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistorialWhereInputSchema),z.lazy(() => HistorialWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
}).strict());

export const HistorialOrderByWithAggregationInputSchema: z.ZodType<Prisma.HistorialOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  puntaje: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => HistorialCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HistorialAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HistorialMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HistorialMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HistorialSumOrderByAggregateInputSchema).optional()
}).strict();

export const HistorialScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HistorialScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HistorialScalarWhereWithAggregatesInputSchema),z.lazy(() => HistorialScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistorialScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistorialScalarWhereWithAggregatesInputSchema),z.lazy(() => HistorialScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const StateWhereInputSchema: z.ZodType<Prisma.StateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => EnumStateTypeFilterSchema),z.lazy(() => StateTypeSchema) ]).optional(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict();

export const StateOrderByWithRelationInputSchema: z.ZodType<Prisma.StateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  examenes: z.lazy(() => ExamenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StateWhereUniqueInputSchema: z.ZodType<Prisma.StateWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.lazy(() => StateTypeSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.lazy(() => StateTypeSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => StateTypeSchema).optional(),
  AND: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateWhereInputSchema),z.lazy(() => StateWhereInputSchema).array() ]).optional(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict());

export const StateOrderByWithAggregationInputSchema: z.ZodType<Prisma.StateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StateSumOrderByAggregateInputSchema).optional()
}).strict();

export const StateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StateScalarWhereWithAggregatesInputSchema),z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StateScalarWhereWithAggregatesInputSchema),z.lazy(() => StateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => EnumStateTypeWithAggregatesFilterSchema),z.lazy(() => StateTypeSchema) ]).optional(),
}).strict();

export const CursoCreateInputSchema: z.ZodType<Prisma.CursoCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUncheckedCreateInputSchema: z.ZodType<Prisma.CursoUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUpdateInputSchema: z.ZodType<Prisma.CursoUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoCreateManyInputSchema: z.ZodType<Prisma.CursoCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const CursoUpdateManyMutationInputSchema: z.ZodType<Prisma.CursoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenCreateInputSchema: z.ZodType<Prisma.EjecucionExamenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutEjecucionesInputSchema),
  respuestas: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  examen_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenCreateManyInputSchema: z.ZodType<Prisma.EjecucionExamenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  examen_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenUpdateManyMutationInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenCreateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutRespuestasInputSchema),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema)
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.number().int(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenUpdateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenCreateManyInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.number().int(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenUpdateManyMutationInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenCreateInputSchema: z.ZodType<Prisma.ExamenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema)
}).strict();

export const ExamenUncheckedCreateInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUpdateInputSchema: z.ZodType<Prisma.ExamenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenCreateManyInputSchema: z.ZodType<Prisma.ExamenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const ExamenUpdateManyMutationInputSchema: z.ZodType<Prisma.ExamenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaCreateInputSchema: z.ZodType<Prisma.PreguntaCreateInput> = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen_id: z.string(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUpdateInputSchema: z.ZodType<Prisma.PreguntaUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaCreateManyInputSchema: z.ZodType<Prisma.PreguntaCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen_id: z.string()
}).strict();

export const PreguntaUpdateManyMutationInputSchema: z.ZodType<Prisma.PreguntaUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RespuestaCreateInputSchema: z.ZodType<Prisma.RespuestaCreateInput> = z.object({
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasInputSchema),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaUncheckedCreateInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta_id: z.number().int(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaUpdateInputSchema: z.ZodType<Prisma.RespuestaUpdateInput> = z.object({
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaCreateManyInputSchema: z.ZodType<Prisma.RespuestaCreateManyInput> = z.object({
  id: z.number().int().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta_id: z.number().int()
}).strict();

export const RespuestaUpdateManyMutationInputSchema: z.ZodType<Prisma.RespuestaUpdateManyMutationInput> = z.object({
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RespuestaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistorialCreateInputSchema: z.ZodType<Prisma.HistorialCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutHistorialInputSchema)
}).strict();

export const HistorialUncheckedCreateInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialUpdateInputSchema: z.ZodType<Prisma.HistorialUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutHistorialNestedInputSchema).optional()
}).strict();

export const HistorialUncheckedUpdateInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialCreateManyInputSchema: z.ZodType<Prisma.HistorialCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialUpdateManyMutationInputSchema: z.ZodType<Prisma.HistorialUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StateCreateInputSchema: z.ZodType<Prisma.StateCreateInput> = z.object({
  name: z.lazy(() => StateTypeSchema),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutStateInputSchema).optional()
}).strict();

export const StateUncheckedCreateInputSchema: z.ZodType<Prisma.StateUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => StateTypeSchema),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutStateInputSchema).optional()
}).strict();

export const StateUpdateInputSchema: z.ZodType<Prisma.StateUpdateInput> = z.object({
  name: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => EnumStateTypeFieldUpdateOperationsInputSchema) ]).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutStateNestedInputSchema).optional()
}).strict();

export const StateUncheckedUpdateInputSchema: z.ZodType<Prisma.StateUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => EnumStateTypeFieldUpdateOperationsInputSchema) ]).optional(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutStateNestedInputSchema).optional()
}).strict();

export const StateCreateManyInputSchema: z.ZodType<Prisma.StateCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => StateTypeSchema)
}).strict();

export const StateUpdateManyMutationInputSchema: z.ZodType<Prisma.StateUpdateManyMutationInput> = z.object({
  name: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => EnumStateTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => EnumStateTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ExamenListRelationFilterSchema: z.ZodType<Prisma.ExamenListRelationFilter> = z.object({
  every: z.lazy(() => ExamenWhereInputSchema).optional(),
  some: z.lazy(() => ExamenWhereInputSchema).optional(),
  none: z.lazy(() => ExamenWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ExamenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExamenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoOrderByRelevanceInputSchema: z.ZodType<Prisma.CursoOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => CursoOrderByRelevanceFieldEnumSchema),z.lazy(() => CursoOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const CursoCountOrderByAggregateInputSchema: z.ZodType<Prisma.CursoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CursoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CursoMinOrderByAggregateInputSchema: z.ZodType<Prisma.CursoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const ExamenScalarRelationFilterSchema: z.ZodType<Prisma.ExamenScalarRelationFilter> = z.object({
  is: z.lazy(() => ExamenWhereInputSchema).optional(),
  isNot: z.lazy(() => ExamenWhereInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenListRelationFilterSchema: z.ZodType<Prisma.RespuestasEjecucionExamenListRelationFilter> = z.object({
  every: z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).optional(),
  some: z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).optional(),
  none: z.lazy(() => RespuestasEjecucionExamenWhereInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenOrderByRelevanceInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => EjecucionExamenOrderByRelevanceFieldEnumSchema),z.lazy(() => EjecucionExamenOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const EjecucionExamenCountOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  alumno_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  alumno_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenMinOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  alumno_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EjecucionExamenScalarRelationFilterSchema: z.ZodType<Prisma.EjecucionExamenScalarRelationFilter> = z.object({
  is: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  isNot: z.lazy(() => EjecucionExamenWhereInputSchema).optional()
}).strict();

export const PreguntaScalarRelationFilterSchema: z.ZodType<Prisma.PreguntaScalarRelationFilter> = z.object({
  is: z.lazy(() => PreguntaWhereInputSchema).optional(),
  isNot: z.lazy(() => PreguntaWhereInputSchema).optional()
}).strict();

export const RespuestaScalarRelationFilterSchema: z.ZodType<Prisma.RespuestaScalarRelationFilter> = z.object({
  is: z.lazy(() => RespuestaWhereInputSchema).optional(),
  isNot: z.lazy(() => RespuestaWhereInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenOrderByRelevanceInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RespuestasEjecucionExamenOrderByRelevanceFieldEnumSchema),z.lazy(() => RespuestasEjecucionExamenOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RespuestasEjecucionExamenCountOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestasEjecucionExamenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenAvgOrderByAggregateInput> = z.object({
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestasEjecucionExamenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestasEjecucionExamenMinOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestasEjecucionExamenSumOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenSumOrderByAggregateInput> = z.object({
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StateScalarRelationFilterSchema: z.ZodType<Prisma.StateScalarRelationFilter> = z.object({
  is: z.lazy(() => StateWhereInputSchema).optional(),
  isNot: z.lazy(() => StateWhereInputSchema).optional()
}).strict();

export const PreguntaListRelationFilterSchema: z.ZodType<Prisma.PreguntaListRelationFilter> = z.object({
  every: z.lazy(() => PreguntaWhereInputSchema).optional(),
  some: z.lazy(() => PreguntaWhereInputSchema).optional(),
  none: z.lazy(() => PreguntaWhereInputSchema).optional()
}).strict();

export const HistorialListRelationFilterSchema: z.ZodType<Prisma.HistorialListRelationFilter> = z.object({
  every: z.lazy(() => HistorialWhereInputSchema).optional(),
  some: z.lazy(() => HistorialWhereInputSchema).optional(),
  none: z.lazy(() => HistorialWhereInputSchema).optional()
}).strict();

export const EjecucionExamenListRelationFilterSchema: z.ZodType<Prisma.EjecucionExamenListRelationFilter> = z.object({
  every: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  some: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  none: z.lazy(() => EjecucionExamenWhereInputSchema).optional()
}).strict();

export const CursoScalarRelationFilterSchema: z.ZodType<Prisma.CursoScalarRelationFilter> = z.object({
  is: z.lazy(() => CursoWhereInputSchema).optional(),
  isNot: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const PreguntaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PreguntaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistorialOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HistorialOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenOrderByRelevanceInputSchema: z.ZodType<Prisma.ExamenOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ExamenOrderByRelevanceFieldEnumSchema),z.lazy(() => ExamenOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ExamenCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  inicio_examen: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenAvgOrderByAggregateInput> = z.object({
  peso: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  inicio_examen: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  inicio_examen: z.lazy(() => SortOrderSchema).optional(),
  final_examen: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenSumOrderByAggregateInput> = z.object({
  peso: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DecimalNullableFilterSchema: z.ZodType<Prisma.DecimalNullableFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RespuestaListRelationFilterSchema: z.ZodType<Prisma.RespuestaListRelationFilter> = z.object({
  every: z.lazy(() => RespuestaWhereInputSchema).optional(),
  some: z.lazy(() => RespuestaWhereInputSchema).optional(),
  none: z.lazy(() => RespuestaWhereInputSchema).optional()
}).strict();

export const RespuestaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RespuestaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaOrderByRelevanceInputSchema: z.ZodType<Prisma.PreguntaOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => PreguntaOrderByRelevanceFieldEnumSchema),z.lazy(() => PreguntaOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const PreguntaCountOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.lazy(() => SortOrderSchema).optional(),
  inicio_pregunta: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.lazy(() => SortOrderSchema).optional(),
  inicio_pregunta: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaMinOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.lazy(() => SortOrderSchema).optional(),
  inicio_pregunta: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaSumOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  puntos: z.lazy(() => SortOrderSchema).optional(),
  duracion: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalNullableWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const RespuestaOrderByRelevanceInputSchema: z.ZodType<Prisma.RespuestaOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RespuestaOrderByRelevanceFieldEnumSchema),z.lazy(() => RespuestaOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RespuestaCountOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  respuesta: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  correcta: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestaAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  respuesta: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  correcta: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestaMinOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  respuesta: z.lazy(() => SortOrderSchema).optional(),
  img: z.lazy(() => SortOrderSchema).optional(),
  video: z.lazy(() => SortOrderSchema).optional(),
  audio: z.lazy(() => SortOrderSchema).optional(),
  correcta: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RespuestaSumOrderByAggregateInputSchema: z.ZodType<Prisma.RespuestaSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const HistorialOrderByRelevanceInputSchema: z.ZodType<Prisma.HistorialOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => HistorialOrderByRelevanceFieldEnumSchema),z.lazy(() => HistorialOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const HistorialCountOrderByAggregateInputSchema: z.ZodType<Prisma.HistorialCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  puntaje: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistorialAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HistorialAvgOrderByAggregateInput> = z.object({
  puntaje: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistorialMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HistorialMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  puntaje: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistorialMinOrderByAggregateInputSchema: z.ZodType<Prisma.HistorialMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  puntaje: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HistorialSumOrderByAggregateInputSchema: z.ZodType<Prisma.HistorialSumOrderByAggregateInput> = z.object({
  puntaje: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStateTypeFilterSchema: z.ZodType<Prisma.EnumStateTypeFilter> = z.object({
  equals: z.lazy(() => StateTypeSchema).optional(),
  in: z.lazy(() => StateTypeSchema).array().optional(),
  notIn: z.lazy(() => StateTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => NestedEnumStateTypeFilterSchema) ]).optional(),
}).strict();

export const StateCountOrderByAggregateInputSchema: z.ZodType<Prisma.StateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StateAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateMinOrderByAggregateInputSchema: z.ZodType<Prisma.StateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StateSumOrderByAggregateInputSchema: z.ZodType<Prisma.StateSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumStateTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStateTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StateTypeSchema).optional(),
  in: z.lazy(() => StateTypeSchema).array().optional(),
  notIn: z.lazy(() => StateTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => NestedEnumStateTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStateTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStateTypeFilterSchema).optional()
}).strict();

export const ExamenCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.ExamenCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenCreateWithoutCursoInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenCreateWithoutCursoInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const ExamenUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenCreateWithoutCursoInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenCreateWithoutCursoInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenCreateNestedOneWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenCreateNestedOneWithoutEjecucionesInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutEjecucionesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutEjecucionesInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema: z.ZodType<Prisma.ExamenUpdateOneRequiredWithoutEjecucionesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutEjecucionesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutEjecucionesInputSchema).optional(),
  upsert: z.lazy(() => ExamenUpsertWithoutEjecucionesInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateToOneWithWhereWithoutEjecucionesInputSchema),z.lazy(() => ExamenUpdateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutEjecucionesInputSchema) ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenCreateNestedOneWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenCreateNestedOneWithoutRespuestasInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutRespuestasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutRespuestasInputSchema).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional()
}).strict();

export const PreguntaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaCreateNestedOneWithoutRespuestasEjecucionExamenInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional()
}).strict();

export const RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => RespuestaWhereUniqueInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateOneRequiredWithoutRespuestasNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateOneRequiredWithoutRespuestasNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutRespuestasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutRespuestasInputSchema).optional(),
  upsert: z.lazy(() => EjecucionExamenUpsertWithoutRespuestasInputSchema).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateToOneWithWhereWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUpdateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutRespuestasInputSchema) ]).optional(),
}).strict();

export const PreguntaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema: z.ZodType<Prisma.PreguntaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema).optional(),
  upsert: z.lazy(() => PreguntaUpsertWithoutRespuestasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
}).strict();

export const RespuestaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema: z.ZodType<Prisma.RespuestaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema).optional(),
  upsert: z.lazy(() => RespuestaUpsertWithoutRespuestasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => RespuestaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RespuestaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const StateCreateNestedOneWithoutExamenesInputSchema: z.ZodType<Prisma.StateCreateNestedOneWithoutExamenesInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional()
}).strict();

export const PreguntaCreateNestedManyWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaCreateNestedManyWithoutExamenInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutExamenInputSchema),z.lazy(() => PreguntaCreateWithoutExamenInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntaCreateManyExamenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistorialCreateNestedManyWithoutExamenInputSchema: z.ZodType<Prisma.HistorialCreateNestedManyWithoutExamenInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutExamenInputSchema),z.lazy(() => HistorialCreateWithoutExamenInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyExamenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenCreateNestedManyWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenCreateNestedManyWithoutExamenInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyExamenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CursoCreateNestedOneWithoutExamenesInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutExamenesInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateNestedManyWithoutExamenInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutExamenInputSchema),z.lazy(() => PreguntaCreateWithoutExamenInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntaCreateManyExamenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistorialUncheckedCreateNestedManyWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateNestedManyWithoutExamenInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutExamenInputSchema),z.lazy(() => HistorialCreateWithoutExamenInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyExamenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateNestedManyWithoutExamenInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyExamenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const StateUpdateOneRequiredWithoutExamenesNestedInputSchema: z.ZodType<Prisma.StateUpdateOneRequiredWithoutExamenesNestedInput> = z.object({
  create: z.union([ z.lazy(() => StateCreateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StateCreateOrConnectWithoutExamenesInputSchema).optional(),
  upsert: z.lazy(() => StateUpsertWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => StateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StateUpdateToOneWithWhereWithoutExamenesInputSchema),z.lazy(() => StateUpdateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedUpdateWithoutExamenesInputSchema) ]).optional(),
}).strict();

export const PreguntaUpdateManyWithoutExamenNestedInputSchema: z.ZodType<Prisma.PreguntaUpdateManyWithoutExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutExamenInputSchema),z.lazy(() => PreguntaCreateWithoutExamenInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntaCreateManyExamenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntaUpdateManyWithWhereWithoutExamenInputSchema),z.lazy(() => PreguntaUpdateManyWithWhereWithoutExamenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntaScalarWhereInputSchema),z.lazy(() => PreguntaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistorialUpdateManyWithoutExamenNestedInputSchema: z.ZodType<Prisma.HistorialUpdateManyWithoutExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutExamenInputSchema),z.lazy(() => HistorialCreateWithoutExamenInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistorialUpsertWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => HistorialUpsertWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyExamenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistorialUpdateWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => HistorialUpdateWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistorialUpdateManyWithWhereWithoutExamenInputSchema),z.lazy(() => HistorialUpdateManyWithWhereWithoutExamenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistorialScalarWhereInputSchema),z.lazy(() => HistorialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenUpdateManyWithoutExamenNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyWithoutExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyExamenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutExamenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EjecucionExamenScalarWhereInputSchema),z.lazy(() => EjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutExamenesNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutExamenesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutExamenesInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutExamenesInputSchema),z.lazy(() => CursoUpdateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutExamenesInputSchema) ]).optional(),
}).strict();

export const PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyWithoutExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutExamenInputSchema),z.lazy(() => PreguntaCreateWithoutExamenInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntaCreateManyExamenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntaUpdateManyWithWhereWithoutExamenInputSchema),z.lazy(() => PreguntaUpdateManyWithWhereWithoutExamenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntaScalarWhereInputSchema),z.lazy(() => PreguntaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyWithoutExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutExamenInputSchema),z.lazy(() => HistorialCreateWithoutExamenInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistorialUpsertWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => HistorialUpsertWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyExamenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistorialUpdateWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => HistorialUpdateWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistorialUpdateManyWithWhereWithoutExamenInputSchema),z.lazy(() => HistorialUpdateManyWithWhereWithoutExamenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistorialScalarWhereInputSchema),z.lazy(() => HistorialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutExamenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyExamenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutExamenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutExamenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EjecucionExamenScalarWhereInputSchema),z.lazy(() => EjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenCreateNestedOneWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenCreateNestedOneWithoutPreguntasInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutPreguntasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutPreguntasInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional()
}).strict();

export const RespuestaCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestaCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestaCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema: z.ZodType<Prisma.ExamenUpdateOneRequiredWithoutPreguntasNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutPreguntasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutPreguntasInputSchema).optional(),
  upsert: z.lazy(() => ExamenUpsertWithoutPreguntasInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateToOneWithWhereWithoutPreguntasInputSchema),z.lazy(() => ExamenUpdateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutPreguntasInputSchema) ]).optional(),
}).strict();

export const RespuestaUpdateManyWithoutPreguntaNestedInputSchema: z.ZodType<Prisma.RespuestaUpdateManyWithoutPreguntaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestaUpsertWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestaUpsertWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestaCreateManyPreguntaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestaUpdateWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestaUpdateWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestaUpdateManyWithWhereWithoutPreguntaInputSchema),z.lazy(() => RespuestaUpdateManyWithWhereWithoutPreguntaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestaScalarWhereInputSchema),z.lazy(() => RespuestaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyWithoutPreguntaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateManyWithoutPreguntaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestaUpsertWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestaUpsertWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestaCreateManyPreguntaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestaUpdateWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestaUpdateWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestaUpdateManyWithWhereWithoutPreguntaInputSchema),z.lazy(() => RespuestaUpdateManyWithWhereWithoutPreguntaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestaScalarWhereInputSchema),z.lazy(() => RespuestaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PreguntaCreateNestedOneWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaCreateNestedOneWithoutRespuestasInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutRespuestasInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenCreateNestedManyWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateNestedManyWithoutRespuestaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const PreguntaUpdateOneRequiredWithoutRespuestasNestedInputSchema: z.ZodType<Prisma.PreguntaUpdateOneRequiredWithoutRespuestasNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutRespuestasInputSchema).optional(),
  upsert: z.lazy(() => PreguntaUpsertWithoutRespuestasInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateToOneWithWhereWithoutRespuestasInputSchema),z.lazy(() => PreguntaUpdateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasInputSchema) ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUpdateManyWithoutRespuestaNestedInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyWithoutRespuestaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenCreateNestedOneWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenCreateNestedOneWithoutHistorialInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutHistorialInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutHistorialInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional()
}).strict();

export const ExamenUpdateOneRequiredWithoutHistorialNestedInputSchema: z.ZodType<Prisma.ExamenUpdateOneRequiredWithoutHistorialNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutHistorialInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutHistorialInputSchema).optional(),
  upsert: z.lazy(() => ExamenUpsertWithoutHistorialInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateToOneWithWhereWithoutHistorialInputSchema),z.lazy(() => ExamenUpdateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutHistorialInputSchema) ]).optional(),
}).strict();

export const ExamenCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.ExamenCreateNestedManyWithoutStateInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutStateInputSchema),z.lazy(() => ExamenCreateWithoutStateInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedCreateNestedManyWithoutStateInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateNestedManyWithoutStateInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutStateInputSchema),z.lazy(() => ExamenCreateWithoutStateInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyStateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumStateTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStateTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StateTypeSchema).optional()
}).strict();

export const ExamenUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithoutStateNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutStateInputSchema),z.lazy(() => ExamenCreateWithoutStateInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutStateInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutStateInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutStateInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedUpdateManyWithoutStateNestedInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutStateNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutStateInputSchema),z.lazy(() => ExamenCreateWithoutStateInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutStateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutStateInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyStateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutStateInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutStateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutStateInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutStateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDecimalNullableFilterSchema: z.ZodType<Prisma.NestedDecimalNullableFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional().nullable(),
  lt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumStateTypeFilterSchema: z.ZodType<Prisma.NestedEnumStateTypeFilter> = z.object({
  equals: z.lazy(() => StateTypeSchema).optional(),
  in: z.lazy(() => StateTypeSchema).array().optional(),
  notIn: z.lazy(() => StateTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => NestedEnumStateTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumStateTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStateTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StateTypeSchema).optional(),
  in: z.lazy(() => StateTypeSchema).array().optional(),
  notIn: z.lazy(() => StateTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => NestedEnumStateTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStateTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStateTypeFilterSchema).optional()
}).strict();

export const ExamenCreateWithoutCursoInputSchema: z.ZodType<Prisma.ExamenCreateWithoutCursoInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutCursoInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutCursoInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutCursoInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const ExamenCreateManyCursoInputEnvelopeSchema: z.ZodType<Prisma.ExamenCreateManyCursoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExamenCreateManyCursoInputSchema),z.lazy(() => ExamenCreateManyCursoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenUpsertWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUpsertWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExamenUpdateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutCursoInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const ExamenUpdateWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUpdateWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutCursoInputSchema) ]),
}).strict();

export const ExamenUpdateManyWithWhereWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithWhereWithoutCursoInput> = z.object({
  where: z.lazy(() => ExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateManyMutationInputSchema),z.lazy(() => ExamenUncheckedUpdateManyWithoutCursoInputSchema) ]),
}).strict();

export const ExamenScalarWhereInputSchema: z.ZodType<Prisma.ExamenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExamenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  peso: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ExamenCreateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenCreateWithoutEjecucionesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema)
}).strict();

export const ExamenUncheckedCreateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutEjecucionesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutEjecucionesInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutEjecucionesInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateWithoutEjecucion_examenInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema)
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInput> = z.object({
  id: z.string().uuid().optional(),
  pregunta_id: z.number().int(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyEjecucion_examenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateManyEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateManyEjecucion_examenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenUpsertWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUpsertWithoutEjecucionesInput> = z.object({
  update: z.union([ z.lazy(() => ExamenUpdateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutEjecucionesInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutEjecucionesInputSchema) ]),
  where: z.lazy(() => ExamenWhereInputSchema).optional()
}).strict();

export const ExamenUpdateToOneWithWhereWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUpdateToOneWithWhereWithoutEjecucionesInput> = z.object({
  where: z.lazy(() => ExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutEjecucionesInputSchema) ]),
}).strict();

export const ExamenUpdateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutEjecucionesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutEjecucionesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInputSchema) ]),
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithoutEjecucion_examenInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenScalarWhereInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EjecucionExamenCreateWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenCreateWithoutRespuestasInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutEjecucionesInputSchema)
}).strict();

export const EjecucionExamenUncheckedCreateWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateWithoutRespuestasInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  examen_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenCreateOrConnectWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenCreateOrConnectWithoutRespuestasInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutRespuestasInputSchema) ]),
}).strict();

export const PreguntaCreateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaCreateWithoutRespuestasEjecucionExamenInput> = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen_id: z.string(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaCreateOrConnectWithoutRespuestasEjecucionExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]),
}).strict();

export const RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaCreateWithoutRespuestasEjecucionExamenInput> = z.object({
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasInputSchema)
}).strict();

export const RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.number().int().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta_id: z.number().int()
}).strict();

export const RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInput> = z.object({
  where: z.lazy(() => RespuestaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]),
}).strict();

export const EjecucionExamenUpsertWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenUpsertWithoutRespuestasInput> = z.object({
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutRespuestasInputSchema) ]),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutRespuestasInputSchema) ]),
  where: z.lazy(() => EjecucionExamenWhereInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateToOneWithWhereWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateToOneWithWhereWithoutRespuestasInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutRespuestasInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutRespuestasInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithoutRespuestasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateWithoutRespuestasInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateWithoutRespuestasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaUpsertWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUpsertWithoutRespuestasEjecucionExamenInput> = z.object({
  update: z.union([ z.lazy(() => PreguntaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]),
  where: z.lazy(() => PreguntaWhereInputSchema).optional()
}).strict();

export const PreguntaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PreguntaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]),
}).strict();

export const PreguntaUpdateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateWithoutRespuestasEjecucionExamenInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const RespuestaUpsertWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUpsertWithoutRespuestasEjecucionExamenInput> = z.object({
  update: z.union([ z.lazy(() => RespuestaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]),
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]),
  where: z.lazy(() => RespuestaWhereInputSchema).optional()
}).strict();

export const RespuestaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInput> = z.object({
  where: z.lazy(() => RespuestaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RespuestaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]),
}).strict();

export const RespuestaUpdateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUpdateWithoutRespuestasEjecucionExamenInput> = z.object({
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StateCreateWithoutExamenesInputSchema: z.ZodType<Prisma.StateCreateWithoutExamenesInput> = z.object({
  name: z.lazy(() => StateTypeSchema)
}).strict();

export const StateUncheckedCreateWithoutExamenesInputSchema: z.ZodType<Prisma.StateUncheckedCreateWithoutExamenesInput> = z.object({
  id: z.number().int().optional(),
  name: z.lazy(() => StateTypeSchema)
}).strict();

export const StateCreateOrConnectWithoutExamenesInputSchema: z.ZodType<Prisma.StateCreateOrConnectWithoutExamenesInput> = z.object({
  where: z.lazy(() => StateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StateCreateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedCreateWithoutExamenesInputSchema) ]),
}).strict();

export const PreguntaCreateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaCreateWithoutExamenInput> = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutExamenInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaCreateOrConnectWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaCreateOrConnectWithoutExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const PreguntaCreateManyExamenInputEnvelopeSchema: z.ZodType<Prisma.PreguntaCreateManyExamenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PreguntaCreateManyExamenInputSchema),z.lazy(() => PreguntaCreateManyExamenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HistorialCreateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialUncheckedCreateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialCreateOrConnectWithoutExamenInputSchema: z.ZodType<Prisma.HistorialCreateOrConnectWithoutExamenInput> = z.object({
  where: z.lazy(() => HistorialWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HistorialCreateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const HistorialCreateManyExamenInputEnvelopeSchema: z.ZodType<Prisma.HistorialCreateManyExamenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HistorialCreateManyExamenInputSchema),z.lazy(() => HistorialCreateManyExamenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EjecucionExamenCreateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenCreateOrConnectWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenCreateOrConnectWithoutExamenInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const EjecucionExamenCreateManyExamenInputEnvelopeSchema: z.ZodType<Prisma.EjecucionExamenCreateManyExamenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EjecucionExamenCreateManyExamenInputSchema),z.lazy(() => EjecucionExamenCreateManyExamenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CursoCreateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoCreateWithoutExamenesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const CursoUncheckedCreateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutExamenesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const CursoCreateOrConnectWithoutExamenesInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutExamenesInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]),
}).strict();

export const StateUpsertWithoutExamenesInputSchema: z.ZodType<Prisma.StateUpsertWithoutExamenesInput> = z.object({
  update: z.union([ z.lazy(() => StateUpdateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedUpdateWithoutExamenesInputSchema) ]),
  create: z.union([ z.lazy(() => StateCreateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedCreateWithoutExamenesInputSchema) ]),
  where: z.lazy(() => StateWhereInputSchema).optional()
}).strict();

export const StateUpdateToOneWithWhereWithoutExamenesInputSchema: z.ZodType<Prisma.StateUpdateToOneWithWhereWithoutExamenesInput> = z.object({
  where: z.lazy(() => StateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StateUpdateWithoutExamenesInputSchema),z.lazy(() => StateUncheckedUpdateWithoutExamenesInputSchema) ]),
}).strict();

export const StateUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.StateUpdateWithoutExamenesInput> = z.object({
  name: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => EnumStateTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StateUncheckedUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.StateUncheckedUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => StateTypeSchema),z.lazy(() => EnumStateTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PreguntaUpsertWithWhereUniqueWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUpsertWithWhereUniqueWithoutExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PreguntaUpdateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutExamenInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const PreguntaUpdateWithWhereUniqueWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateWithWhereUniqueWithoutExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PreguntaUpdateWithoutExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutExamenInputSchema) ]),
}).strict();

export const PreguntaUpdateManyWithWhereWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateManyWithWhereWithoutExamenInput> = z.object({
  where: z.lazy(() => PreguntaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PreguntaUpdateManyMutationInputSchema),z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenInputSchema) ]),
}).strict();

export const PreguntaScalarWhereInputSchema: z.ZodType<Prisma.PreguntaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntaScalarWhereInputSchema),z.lazy(() => PreguntaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntaScalarWhereInputSchema),z.lazy(() => PreguntaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const HistorialUpsertWithWhereUniqueWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUpsertWithWhereUniqueWithoutExamenInput> = z.object({
  where: z.lazy(() => HistorialWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HistorialUpdateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedUpdateWithoutExamenInputSchema) ]),
  create: z.union([ z.lazy(() => HistorialCreateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const HistorialUpdateWithWhereUniqueWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUpdateWithWhereUniqueWithoutExamenInput> = z.object({
  where: z.lazy(() => HistorialWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HistorialUpdateWithoutExamenInputSchema),z.lazy(() => HistorialUncheckedUpdateWithoutExamenInputSchema) ]),
}).strict();

export const HistorialUpdateManyWithWhereWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUpdateManyWithWhereWithoutExamenInput> = z.object({
  where: z.lazy(() => HistorialScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HistorialUpdateManyMutationInputSchema),z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenInputSchema) ]),
}).strict();

export const HistorialScalarWhereInputSchema: z.ZodType<Prisma.HistorialScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistorialScalarWhereInputSchema),z.lazy(() => HistorialScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistorialScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistorialScalarWhereInputSchema),z.lazy(() => HistorialScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EjecucionExamenUpsertWithWhereUniqueWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUpsertWithWhereUniqueWithoutExamenInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutExamenInputSchema) ]),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateWithWhereUniqueWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithWhereUniqueWithoutExamenInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutExamenInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateManyWithWhereWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyWithWhereWithoutExamenInput> = z.object({
  where: z.lazy(() => EjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenInputSchema) ]),
}).strict();

export const EjecucionExamenScalarWhereInputSchema: z.ZodType<Prisma.EjecucionExamenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EjecucionExamenScalarWhereInputSchema),z.lazy(() => EjecucionExamenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenScalarWhereInputSchema),z.lazy(() => EjecucionExamenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  alumno_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CursoUpsertWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUpsertWithoutExamenesInput> = z.object({
  update: z.union([ z.lazy(() => CursoUpdateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutExamenesInputSchema) ]),
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]),
  where: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const CursoUpdateToOneWithWhereWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUpdateToOneWithWhereWithoutExamenesInput> = z.object({
  where: z.lazy(() => CursoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CursoUpdateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutExamenesInputSchema) ]),
}).strict();

export const CursoUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursoUncheckedUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenCreateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenCreateWithoutPreguntasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema)
}).strict();

export const ExamenUncheckedCreateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutPreguntasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutPreguntasInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutPreguntasInputSchema) ]),
}).strict();

export const RespuestaCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaCreateWithoutPreguntaInput> = z.object({
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaUncheckedCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateWithoutPreguntaInput> = z.object({
  id: z.number().int().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaCreateOrConnectWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaCreateOrConnectWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestaCreateManyPreguntaInputEnvelopeSchema: z.ZodType<Prisma.RespuestaCreateManyPreguntaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RespuestaCreateManyPreguntaInputSchema),z.lazy(() => RespuestaCreateManyPreguntaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateWithoutPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutRespuestasInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema)
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateOrConnectWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyPreguntaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateManyPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateManyPreguntaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenUpsertWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUpsertWithoutPreguntasInput> = z.object({
  update: z.union([ z.lazy(() => ExamenUpdateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutPreguntasInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutPreguntasInputSchema) ]),
  where: z.lazy(() => ExamenWhereInputSchema).optional()
}).strict();

export const ExamenUpdateToOneWithWhereWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUpdateToOneWithWhereWithoutPreguntasInput> = z.object({
  where: z.lazy(() => ExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutPreguntasInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutPreguntasInputSchema) ]),
}).strict();

export const ExamenUpdateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutPreguntasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutPreguntasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const RespuestaUpsertWithWhereUniqueWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUpsertWithWhereUniqueWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RespuestaUpdateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedUpdateWithoutPreguntaInputSchema) ]),
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestaUpdateWithWhereUniqueWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUpdateWithWhereUniqueWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RespuestaUpdateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedUpdateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestaUpdateManyWithWhereWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUpdateManyWithWhereWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RespuestaUpdateManyMutationInputSchema),z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestaScalarWhereInputSchema: z.ZodType<Prisma.RespuestaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestaScalarWhereInputSchema),z.lazy(() => RespuestaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaScalarWhereInputSchema),z.lazy(() => RespuestaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateWithoutPreguntaInputSchema) ]),
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithoutPreguntaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaInputSchema) ]),
}).strict();

export const PreguntaCreateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaCreateWithoutRespuestasInput> = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutRespuestasInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable(),
  examen_id: z.string(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaCreateOrConnectWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaCreateOrConnectWithoutRespuestasInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateWithoutRespuestaInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutRespuestasInputSchema),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema)
}).strict();

export const RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateOrConnectWithoutRespuestaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyRespuestaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateManyRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenCreateManyRespuestaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PreguntaUpsertWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUpsertWithoutRespuestasInput> = z.object({
  update: z.union([ z.lazy(() => PreguntaUpdateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]),
  where: z.lazy(() => PreguntaWhereInputSchema).optional()
}).strict();

export const PreguntaUpdateToOneWithWhereWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUpdateToOneWithWhereWithoutRespuestasInput> = z.object({
  where: z.lazy(() => PreguntaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PreguntaUpdateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasInputSchema) ]),
}).strict();

export const PreguntaUpdateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUpdateWithoutRespuestasInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutRespuestasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateWithoutRespuestaInputSchema) ]),
  create: z.union([ z.lazy(() => RespuestasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateWithoutRespuestaInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateWithoutRespuestaInputSchema) ]),
}).strict();

export const RespuestasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInput> = z.object({
  where: z.lazy(() => RespuestasEjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RespuestasEjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaInputSchema) ]),
}).strict();

export const ExamenCreateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenCreateWithoutHistorialInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema)
}).strict();

export const ExamenUncheckedCreateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutHistorialInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutHistorialInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutHistorialInputSchema) ]),
}).strict();

export const ExamenUpsertWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUpsertWithoutHistorialInput> = z.object({
  update: z.union([ z.lazy(() => ExamenUpdateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutHistorialInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutHistorialInputSchema) ]),
  where: z.lazy(() => ExamenWhereInputSchema).optional()
}).strict();

export const ExamenUpdateToOneWithWhereWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUpdateToOneWithWhereWithoutHistorialInput> = z.object({
  where: z.lazy(() => ExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutHistorialInputSchema) ]),
}).strict();

export const ExamenUpdateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutHistorialInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutHistorialInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenCreateWithoutStateInputSchema: z.ZodType<Prisma.ExamenCreateWithoutStateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema)
}).strict();

export const ExamenUncheckedCreateWithoutStateInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutStateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutStateInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutStateInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema) ]),
}).strict();

export const ExamenCreateManyStateInputEnvelopeSchema: z.ZodType<Prisma.ExamenCreateManyStateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExamenCreateManyStateInputSchema),z.lazy(() => ExamenCreateManyStateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenUpsertWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.ExamenUpsertWithWhereUniqueWithoutStateInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExamenUpdateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutStateInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutStateInputSchema) ]),
}).strict();

export const ExamenUpdateWithWhereUniqueWithoutStateInputSchema: z.ZodType<Prisma.ExamenUpdateWithWhereUniqueWithoutStateInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutStateInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutStateInputSchema) ]),
}).strict();

export const ExamenUpdateManyWithWhereWithoutStateInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithWhereWithoutStateInput> = z.object({
  where: z.lazy(() => ExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateManyMutationInputSchema),z.lazy(() => ExamenUncheckedUpdateManyWithoutStateInputSchema) ]),
}).strict();

export const ExamenCreateManyCursoInputSchema: z.ZodType<Prisma.ExamenCreateManyCursoInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const ExamenUpdateWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutCursoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutCursoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateManyWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutCursoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenCreateManyEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyEjecucion_examenInput> = z.object({
  id: z.string().uuid().optional(),
  pregunta_id: z.number().int(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenUpdateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateWithoutEjecucion_examenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaCreateManyExamenInputSchema: z.ZodType<Prisma.PreguntaCreateManyExamenInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  inicio_pregunta: z.coerce.date().optional().nullable()
}).strict();

export const HistorialCreateManyExamenInputSchema: z.ZodType<Prisma.HistorialCreateManyExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenCreateManyExamenInputSchema: z.ZodType<Prisma.EjecucionExamenCreateManyExamenInput> = z.object({
  id: z.string().uuid().optional(),
  alumno_id: z.string(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntaUpdateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateWithoutExamenInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  respuestas: z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateManyWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyWithoutExamenInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio_pregunta: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUpdateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUncheckedUpdateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUncheckedUpdateManyWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenUpdateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  respuestas: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateManyWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  alumno_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestaCreateManyPreguntaInputSchema: z.ZodType<Prisma.RespuestaCreateManyPreguntaInput> = z.object({
  id: z.number().int().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional()
}).strict();

export const RespuestasEjecucionExamenCreateManyPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  respuesta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestaUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUpdateWithoutPreguntaInput> = z.object({
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateManyWithoutPreguntaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RespuestasEjecucionExamenUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenCreateManyRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyRespuestaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RespuestasEjecucionExamenUpdateWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateWithoutRespuestaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasEjecucionExamenNestedInputSchema).optional()
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateWithoutRespuestaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaInputSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUncheckedUpdateManyWithoutRespuestaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenCreateManyStateInputSchema: z.ZodType<Prisma.ExamenCreateManyStateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.string(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const ExamenUpdateWithoutStateInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutStateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutStateInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutStateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateManyWithoutStateInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutStateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CursoFindFirstArgsSchema: z.ZodType<Prisma.CursoFindFirstArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursoScalarFieldEnumSchema,CursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CursoFindFirstOrThrowArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursoScalarFieldEnumSchema,CursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursoFindManyArgsSchema: z.ZodType<Prisma.CursoFindManyArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CursoScalarFieldEnumSchema,CursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CursoAggregateArgsSchema: z.ZodType<Prisma.CursoAggregateArgs> = z.object({
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithRelationInputSchema.array(),CursoOrderByWithRelationInputSchema ]).optional(),
  cursor: CursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CursoGroupByArgsSchema: z.ZodType<Prisma.CursoGroupByArgs> = z.object({
  where: CursoWhereInputSchema.optional(),
  orderBy: z.union([ CursoOrderByWithAggregationInputSchema.array(),CursoOrderByWithAggregationInputSchema ]).optional(),
  by: CursoScalarFieldEnumSchema.array(),
  having: CursoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CursoFindUniqueArgsSchema: z.ZodType<Prisma.CursoFindUniqueArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const CursoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CursoFindUniqueOrThrowArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const EjecucionExamenFindFirstArgsSchema: z.ZodType<Prisma.EjecucionExamenFindFirstArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ EjecucionExamenOrderByWithRelationInputSchema.array(),EjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: EjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EjecucionExamenScalarFieldEnumSchema,EjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EjecucionExamenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EjecucionExamenFindFirstOrThrowArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ EjecucionExamenOrderByWithRelationInputSchema.array(),EjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: EjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EjecucionExamenScalarFieldEnumSchema,EjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EjecucionExamenFindManyArgsSchema: z.ZodType<Prisma.EjecucionExamenFindManyArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ EjecucionExamenOrderByWithRelationInputSchema.array(),EjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: EjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EjecucionExamenScalarFieldEnumSchema,EjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EjecucionExamenAggregateArgsSchema: z.ZodType<Prisma.EjecucionExamenAggregateArgs> = z.object({
  where: EjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ EjecucionExamenOrderByWithRelationInputSchema.array(),EjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: EjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EjecucionExamenGroupByArgsSchema: z.ZodType<Prisma.EjecucionExamenGroupByArgs> = z.object({
  where: EjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ EjecucionExamenOrderByWithAggregationInputSchema.array(),EjecucionExamenOrderByWithAggregationInputSchema ]).optional(),
  by: EjecucionExamenScalarFieldEnumSchema.array(),
  having: EjecucionExamenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EjecucionExamenFindUniqueArgsSchema: z.ZodType<Prisma.EjecucionExamenFindUniqueArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const EjecucionExamenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EjecucionExamenFindUniqueOrThrowArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const RespuestasEjecucionExamenFindFirstArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenFindFirstArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ RespuestasEjecucionExamenOrderByWithRelationInputSchema.array(),RespuestasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RespuestasEjecucionExamenScalarFieldEnumSchema,RespuestasEjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RespuestasEjecucionExamenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenFindFirstOrThrowArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ RespuestasEjecucionExamenOrderByWithRelationInputSchema.array(),RespuestasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RespuestasEjecucionExamenScalarFieldEnumSchema,RespuestasEjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RespuestasEjecucionExamenFindManyArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenFindManyArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ RespuestasEjecucionExamenOrderByWithRelationInputSchema.array(),RespuestasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RespuestasEjecucionExamenScalarFieldEnumSchema,RespuestasEjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RespuestasEjecucionExamenAggregateArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenAggregateArgs> = z.object({
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ RespuestasEjecucionExamenOrderByWithRelationInputSchema.array(),RespuestasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RespuestasEjecucionExamenGroupByArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenGroupByArgs> = z.object({
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ RespuestasEjecucionExamenOrderByWithAggregationInputSchema.array(),RespuestasEjecucionExamenOrderByWithAggregationInputSchema ]).optional(),
  by: RespuestasEjecucionExamenScalarFieldEnumSchema.array(),
  having: RespuestasEjecucionExamenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RespuestasEjecucionExamenFindUniqueArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenFindUniqueArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const RespuestasEjecucionExamenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenFindUniqueOrThrowArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const ExamenFindFirstArgsSchema: z.ZodType<Prisma.ExamenFindFirstArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereInputSchema.optional(),
  orderBy: z.union([ ExamenOrderByWithRelationInputSchema.array(),ExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: ExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExamenScalarFieldEnumSchema,ExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExamenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExamenFindFirstOrThrowArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereInputSchema.optional(),
  orderBy: z.union([ ExamenOrderByWithRelationInputSchema.array(),ExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: ExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExamenScalarFieldEnumSchema,ExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExamenFindManyArgsSchema: z.ZodType<Prisma.ExamenFindManyArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereInputSchema.optional(),
  orderBy: z.union([ ExamenOrderByWithRelationInputSchema.array(),ExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: ExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExamenScalarFieldEnumSchema,ExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExamenAggregateArgsSchema: z.ZodType<Prisma.ExamenAggregateArgs> = z.object({
  where: ExamenWhereInputSchema.optional(),
  orderBy: z.union([ ExamenOrderByWithRelationInputSchema.array(),ExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: ExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExamenGroupByArgsSchema: z.ZodType<Prisma.ExamenGroupByArgs> = z.object({
  where: ExamenWhereInputSchema.optional(),
  orderBy: z.union([ ExamenOrderByWithAggregationInputSchema.array(),ExamenOrderByWithAggregationInputSchema ]).optional(),
  by: ExamenScalarFieldEnumSchema.array(),
  having: ExamenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExamenFindUniqueArgsSchema: z.ZodType<Prisma.ExamenFindUniqueArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereUniqueInputSchema,
}).strict() ;

export const ExamenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExamenFindUniqueOrThrowArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereUniqueInputSchema,
}).strict() ;

export const PreguntaFindFirstArgsSchema: z.ZodType<Prisma.PreguntaFindFirstArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereInputSchema.optional(),
  orderBy: z.union([ PreguntaOrderByWithRelationInputSchema.array(),PreguntaOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PreguntaScalarFieldEnumSchema,PreguntaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PreguntaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PreguntaFindFirstOrThrowArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereInputSchema.optional(),
  orderBy: z.union([ PreguntaOrderByWithRelationInputSchema.array(),PreguntaOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PreguntaScalarFieldEnumSchema,PreguntaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PreguntaFindManyArgsSchema: z.ZodType<Prisma.PreguntaFindManyArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereInputSchema.optional(),
  orderBy: z.union([ PreguntaOrderByWithRelationInputSchema.array(),PreguntaOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PreguntaScalarFieldEnumSchema,PreguntaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PreguntaAggregateArgsSchema: z.ZodType<Prisma.PreguntaAggregateArgs> = z.object({
  where: PreguntaWhereInputSchema.optional(),
  orderBy: z.union([ PreguntaOrderByWithRelationInputSchema.array(),PreguntaOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PreguntaGroupByArgsSchema: z.ZodType<Prisma.PreguntaGroupByArgs> = z.object({
  where: PreguntaWhereInputSchema.optional(),
  orderBy: z.union([ PreguntaOrderByWithAggregationInputSchema.array(),PreguntaOrderByWithAggregationInputSchema ]).optional(),
  by: PreguntaScalarFieldEnumSchema.array(),
  having: PreguntaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PreguntaFindUniqueArgsSchema: z.ZodType<Prisma.PreguntaFindUniqueArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereUniqueInputSchema,
}).strict() ;

export const PreguntaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PreguntaFindUniqueOrThrowArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereUniqueInputSchema,
}).strict() ;

export const RespuestaFindFirstArgsSchema: z.ZodType<Prisma.RespuestaFindFirstArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereInputSchema.optional(),
  orderBy: z.union([ RespuestaOrderByWithRelationInputSchema.array(),RespuestaOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RespuestaScalarFieldEnumSchema,RespuestaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RespuestaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RespuestaFindFirstOrThrowArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereInputSchema.optional(),
  orderBy: z.union([ RespuestaOrderByWithRelationInputSchema.array(),RespuestaOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RespuestaScalarFieldEnumSchema,RespuestaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RespuestaFindManyArgsSchema: z.ZodType<Prisma.RespuestaFindManyArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereInputSchema.optional(),
  orderBy: z.union([ RespuestaOrderByWithRelationInputSchema.array(),RespuestaOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RespuestaScalarFieldEnumSchema,RespuestaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RespuestaAggregateArgsSchema: z.ZodType<Prisma.RespuestaAggregateArgs> = z.object({
  where: RespuestaWhereInputSchema.optional(),
  orderBy: z.union([ RespuestaOrderByWithRelationInputSchema.array(),RespuestaOrderByWithRelationInputSchema ]).optional(),
  cursor: RespuestaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RespuestaGroupByArgsSchema: z.ZodType<Prisma.RespuestaGroupByArgs> = z.object({
  where: RespuestaWhereInputSchema.optional(),
  orderBy: z.union([ RespuestaOrderByWithAggregationInputSchema.array(),RespuestaOrderByWithAggregationInputSchema ]).optional(),
  by: RespuestaScalarFieldEnumSchema.array(),
  having: RespuestaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RespuestaFindUniqueArgsSchema: z.ZodType<Prisma.RespuestaFindUniqueArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereUniqueInputSchema,
}).strict() ;

export const RespuestaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RespuestaFindUniqueOrThrowArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereUniqueInputSchema,
}).strict() ;

export const HistorialFindFirstArgsSchema: z.ZodType<Prisma.HistorialFindFirstArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereInputSchema.optional(),
  orderBy: z.union([ HistorialOrderByWithRelationInputSchema.array(),HistorialOrderByWithRelationInputSchema ]).optional(),
  cursor: HistorialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistorialScalarFieldEnumSchema,HistorialScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HistorialFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HistorialFindFirstOrThrowArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereInputSchema.optional(),
  orderBy: z.union([ HistorialOrderByWithRelationInputSchema.array(),HistorialOrderByWithRelationInputSchema ]).optional(),
  cursor: HistorialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistorialScalarFieldEnumSchema,HistorialScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HistorialFindManyArgsSchema: z.ZodType<Prisma.HistorialFindManyArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereInputSchema.optional(),
  orderBy: z.union([ HistorialOrderByWithRelationInputSchema.array(),HistorialOrderByWithRelationInputSchema ]).optional(),
  cursor: HistorialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HistorialScalarFieldEnumSchema,HistorialScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HistorialAggregateArgsSchema: z.ZodType<Prisma.HistorialAggregateArgs> = z.object({
  where: HistorialWhereInputSchema.optional(),
  orderBy: z.union([ HistorialOrderByWithRelationInputSchema.array(),HistorialOrderByWithRelationInputSchema ]).optional(),
  cursor: HistorialWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HistorialGroupByArgsSchema: z.ZodType<Prisma.HistorialGroupByArgs> = z.object({
  where: HistorialWhereInputSchema.optional(),
  orderBy: z.union([ HistorialOrderByWithAggregationInputSchema.array(),HistorialOrderByWithAggregationInputSchema ]).optional(),
  by: HistorialScalarFieldEnumSchema.array(),
  having: HistorialScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HistorialFindUniqueArgsSchema: z.ZodType<Prisma.HistorialFindUniqueArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereUniqueInputSchema,
}).strict() ;

export const HistorialFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HistorialFindUniqueOrThrowArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereUniqueInputSchema,
}).strict() ;

export const StateFindFirstArgsSchema: z.ZodType<Prisma.StateFindFirstArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema,StateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StateFindFirstOrThrowArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema,StateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StateFindManyArgsSchema: z.ZodType<Prisma.StateFindManyArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StateScalarFieldEnumSchema,StateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StateAggregateArgsSchema: z.ZodType<Prisma.StateAggregateArgs> = z.object({
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithRelationInputSchema.array(),StateOrderByWithRelationInputSchema ]).optional(),
  cursor: StateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StateGroupByArgsSchema: z.ZodType<Prisma.StateGroupByArgs> = z.object({
  where: StateWhereInputSchema.optional(),
  orderBy: z.union([ StateOrderByWithAggregationInputSchema.array(),StateOrderByWithAggregationInputSchema ]).optional(),
  by: StateScalarFieldEnumSchema.array(),
  having: StateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StateFindUniqueArgsSchema: z.ZodType<Prisma.StateFindUniqueArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const StateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StateFindUniqueOrThrowArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const CursoCreateArgsSchema: z.ZodType<Prisma.CursoCreateArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  data: z.union([ CursoCreateInputSchema,CursoUncheckedCreateInputSchema ]),
}).strict() ;

export const CursoUpsertArgsSchema: z.ZodType<Prisma.CursoUpsertArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
  create: z.union([ CursoCreateInputSchema,CursoUncheckedCreateInputSchema ]),
  update: z.union([ CursoUpdateInputSchema,CursoUncheckedUpdateInputSchema ]),
}).strict() ;

export const CursoCreateManyArgsSchema: z.ZodType<Prisma.CursoCreateManyArgs> = z.object({
  data: z.union([ CursoCreateManyInputSchema,CursoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CursoDeleteArgsSchema: z.ZodType<Prisma.CursoDeleteArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const CursoUpdateArgsSchema: z.ZodType<Prisma.CursoUpdateArgs> = z.object({
  select: CursoSelectSchema.optional(),
  include: CursoIncludeSchema.optional(),
  data: z.union([ CursoUpdateInputSchema,CursoUncheckedUpdateInputSchema ]),
  where: CursoWhereUniqueInputSchema,
}).strict() ;

export const CursoUpdateManyArgsSchema: z.ZodType<Prisma.CursoUpdateManyArgs> = z.object({
  data: z.union([ CursoUpdateManyMutationInputSchema,CursoUncheckedUpdateManyInputSchema ]),
  where: CursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CursoDeleteManyArgsSchema: z.ZodType<Prisma.CursoDeleteManyArgs> = z.object({
  where: CursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EjecucionExamenCreateArgsSchema: z.ZodType<Prisma.EjecucionExamenCreateArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  data: z.union([ EjecucionExamenCreateInputSchema,EjecucionExamenUncheckedCreateInputSchema ]),
}).strict() ;

export const EjecucionExamenUpsertArgsSchema: z.ZodType<Prisma.EjecucionExamenUpsertArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereUniqueInputSchema,
  create: z.union([ EjecucionExamenCreateInputSchema,EjecucionExamenUncheckedCreateInputSchema ]),
  update: z.union([ EjecucionExamenUpdateInputSchema,EjecucionExamenUncheckedUpdateInputSchema ]),
}).strict() ;

export const EjecucionExamenCreateManyArgsSchema: z.ZodType<Prisma.EjecucionExamenCreateManyArgs> = z.object({
  data: z.union([ EjecucionExamenCreateManyInputSchema,EjecucionExamenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EjecucionExamenDeleteArgsSchema: z.ZodType<Prisma.EjecucionExamenDeleteArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  where: EjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const EjecucionExamenUpdateArgsSchema: z.ZodType<Prisma.EjecucionExamenUpdateArgs> = z.object({
  select: EjecucionExamenSelectSchema.optional(),
  include: EjecucionExamenIncludeSchema.optional(),
  data: z.union([ EjecucionExamenUpdateInputSchema,EjecucionExamenUncheckedUpdateInputSchema ]),
  where: EjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const EjecucionExamenUpdateManyArgsSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyArgs> = z.object({
  data: z.union([ EjecucionExamenUpdateManyMutationInputSchema,EjecucionExamenUncheckedUpdateManyInputSchema ]),
  where: EjecucionExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EjecucionExamenDeleteManyArgsSchema: z.ZodType<Prisma.EjecucionExamenDeleteManyArgs> = z.object({
  where: EjecucionExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RespuestasEjecucionExamenCreateArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  data: z.union([ RespuestasEjecucionExamenCreateInputSchema,RespuestasEjecucionExamenUncheckedCreateInputSchema ]),
}).strict() ;

export const RespuestasEjecucionExamenUpsertArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpsertArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereUniqueInputSchema,
  create: z.union([ RespuestasEjecucionExamenCreateInputSchema,RespuestasEjecucionExamenUncheckedCreateInputSchema ]),
  update: z.union([ RespuestasEjecucionExamenUpdateInputSchema,RespuestasEjecucionExamenUncheckedUpdateInputSchema ]),
}).strict() ;

export const RespuestasEjecucionExamenCreateManyArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenCreateManyArgs> = z.object({
  data: z.union([ RespuestasEjecucionExamenCreateManyInputSchema,RespuestasEjecucionExamenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RespuestasEjecucionExamenDeleteArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenDeleteArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  where: RespuestasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const RespuestasEjecucionExamenUpdateArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateArgs> = z.object({
  select: RespuestasEjecucionExamenSelectSchema.optional(),
  include: RespuestasEjecucionExamenIncludeSchema.optional(),
  data: z.union([ RespuestasEjecucionExamenUpdateInputSchema,RespuestasEjecucionExamenUncheckedUpdateInputSchema ]),
  where: RespuestasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const RespuestasEjecucionExamenUpdateManyArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenUpdateManyArgs> = z.object({
  data: z.union([ RespuestasEjecucionExamenUpdateManyMutationInputSchema,RespuestasEjecucionExamenUncheckedUpdateManyInputSchema ]),
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RespuestasEjecucionExamenDeleteManyArgsSchema: z.ZodType<Prisma.RespuestasEjecucionExamenDeleteManyArgs> = z.object({
  where: RespuestasEjecucionExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExamenCreateArgsSchema: z.ZodType<Prisma.ExamenCreateArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  data: z.union([ ExamenCreateInputSchema,ExamenUncheckedCreateInputSchema ]),
}).strict() ;

export const ExamenUpsertArgsSchema: z.ZodType<Prisma.ExamenUpsertArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereUniqueInputSchema,
  create: z.union([ ExamenCreateInputSchema,ExamenUncheckedCreateInputSchema ]),
  update: z.union([ ExamenUpdateInputSchema,ExamenUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExamenCreateManyArgsSchema: z.ZodType<Prisma.ExamenCreateManyArgs> = z.object({
  data: z.union([ ExamenCreateManyInputSchema,ExamenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExamenDeleteArgsSchema: z.ZodType<Prisma.ExamenDeleteArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  where: ExamenWhereUniqueInputSchema,
}).strict() ;

export const ExamenUpdateArgsSchema: z.ZodType<Prisma.ExamenUpdateArgs> = z.object({
  select: ExamenSelectSchema.optional(),
  include: ExamenIncludeSchema.optional(),
  data: z.union([ ExamenUpdateInputSchema,ExamenUncheckedUpdateInputSchema ]),
  where: ExamenWhereUniqueInputSchema,
}).strict() ;

export const ExamenUpdateManyArgsSchema: z.ZodType<Prisma.ExamenUpdateManyArgs> = z.object({
  data: z.union([ ExamenUpdateManyMutationInputSchema,ExamenUncheckedUpdateManyInputSchema ]),
  where: ExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ExamenDeleteManyArgsSchema: z.ZodType<Prisma.ExamenDeleteManyArgs> = z.object({
  where: ExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PreguntaCreateArgsSchema: z.ZodType<Prisma.PreguntaCreateArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  data: z.union([ PreguntaCreateInputSchema,PreguntaUncheckedCreateInputSchema ]),
}).strict() ;

export const PreguntaUpsertArgsSchema: z.ZodType<Prisma.PreguntaUpsertArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereUniqueInputSchema,
  create: z.union([ PreguntaCreateInputSchema,PreguntaUncheckedCreateInputSchema ]),
  update: z.union([ PreguntaUpdateInputSchema,PreguntaUncheckedUpdateInputSchema ]),
}).strict() ;

export const PreguntaCreateManyArgsSchema: z.ZodType<Prisma.PreguntaCreateManyArgs> = z.object({
  data: z.union([ PreguntaCreateManyInputSchema,PreguntaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PreguntaDeleteArgsSchema: z.ZodType<Prisma.PreguntaDeleteArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  where: PreguntaWhereUniqueInputSchema,
}).strict() ;

export const PreguntaUpdateArgsSchema: z.ZodType<Prisma.PreguntaUpdateArgs> = z.object({
  select: PreguntaSelectSchema.optional(),
  include: PreguntaIncludeSchema.optional(),
  data: z.union([ PreguntaUpdateInputSchema,PreguntaUncheckedUpdateInputSchema ]),
  where: PreguntaWhereUniqueInputSchema,
}).strict() ;

export const PreguntaUpdateManyArgsSchema: z.ZodType<Prisma.PreguntaUpdateManyArgs> = z.object({
  data: z.union([ PreguntaUpdateManyMutationInputSchema,PreguntaUncheckedUpdateManyInputSchema ]),
  where: PreguntaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PreguntaDeleteManyArgsSchema: z.ZodType<Prisma.PreguntaDeleteManyArgs> = z.object({
  where: PreguntaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RespuestaCreateArgsSchema: z.ZodType<Prisma.RespuestaCreateArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  data: z.union([ RespuestaCreateInputSchema,RespuestaUncheckedCreateInputSchema ]),
}).strict() ;

export const RespuestaUpsertArgsSchema: z.ZodType<Prisma.RespuestaUpsertArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereUniqueInputSchema,
  create: z.union([ RespuestaCreateInputSchema,RespuestaUncheckedCreateInputSchema ]),
  update: z.union([ RespuestaUpdateInputSchema,RespuestaUncheckedUpdateInputSchema ]),
}).strict() ;

export const RespuestaCreateManyArgsSchema: z.ZodType<Prisma.RespuestaCreateManyArgs> = z.object({
  data: z.union([ RespuestaCreateManyInputSchema,RespuestaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RespuestaDeleteArgsSchema: z.ZodType<Prisma.RespuestaDeleteArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  where: RespuestaWhereUniqueInputSchema,
}).strict() ;

export const RespuestaUpdateArgsSchema: z.ZodType<Prisma.RespuestaUpdateArgs> = z.object({
  select: RespuestaSelectSchema.optional(),
  include: RespuestaIncludeSchema.optional(),
  data: z.union([ RespuestaUpdateInputSchema,RespuestaUncheckedUpdateInputSchema ]),
  where: RespuestaWhereUniqueInputSchema,
}).strict() ;

export const RespuestaUpdateManyArgsSchema: z.ZodType<Prisma.RespuestaUpdateManyArgs> = z.object({
  data: z.union([ RespuestaUpdateManyMutationInputSchema,RespuestaUncheckedUpdateManyInputSchema ]),
  where: RespuestaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RespuestaDeleteManyArgsSchema: z.ZodType<Prisma.RespuestaDeleteManyArgs> = z.object({
  where: RespuestaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HistorialCreateArgsSchema: z.ZodType<Prisma.HistorialCreateArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  data: z.union([ HistorialCreateInputSchema,HistorialUncheckedCreateInputSchema ]),
}).strict() ;

export const HistorialUpsertArgsSchema: z.ZodType<Prisma.HistorialUpsertArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereUniqueInputSchema,
  create: z.union([ HistorialCreateInputSchema,HistorialUncheckedCreateInputSchema ]),
  update: z.union([ HistorialUpdateInputSchema,HistorialUncheckedUpdateInputSchema ]),
}).strict() ;

export const HistorialCreateManyArgsSchema: z.ZodType<Prisma.HistorialCreateManyArgs> = z.object({
  data: z.union([ HistorialCreateManyInputSchema,HistorialCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HistorialDeleteArgsSchema: z.ZodType<Prisma.HistorialDeleteArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  where: HistorialWhereUniqueInputSchema,
}).strict() ;

export const HistorialUpdateArgsSchema: z.ZodType<Prisma.HistorialUpdateArgs> = z.object({
  select: HistorialSelectSchema.optional(),
  include: HistorialIncludeSchema.optional(),
  data: z.union([ HistorialUpdateInputSchema,HistorialUncheckedUpdateInputSchema ]),
  where: HistorialWhereUniqueInputSchema,
}).strict() ;

export const HistorialUpdateManyArgsSchema: z.ZodType<Prisma.HistorialUpdateManyArgs> = z.object({
  data: z.union([ HistorialUpdateManyMutationInputSchema,HistorialUncheckedUpdateManyInputSchema ]),
  where: HistorialWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HistorialDeleteManyArgsSchema: z.ZodType<Prisma.HistorialDeleteManyArgs> = z.object({
  where: HistorialWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StateCreateArgsSchema: z.ZodType<Prisma.StateCreateArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  data: z.union([ StateCreateInputSchema,StateUncheckedCreateInputSchema ]),
}).strict() ;

export const StateUpsertArgsSchema: z.ZodType<Prisma.StateUpsertArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
  create: z.union([ StateCreateInputSchema,StateUncheckedCreateInputSchema ]),
  update: z.union([ StateUpdateInputSchema,StateUncheckedUpdateInputSchema ]),
}).strict() ;

export const StateCreateManyArgsSchema: z.ZodType<Prisma.StateCreateManyArgs> = z.object({
  data: z.union([ StateCreateManyInputSchema,StateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StateDeleteArgsSchema: z.ZodType<Prisma.StateDeleteArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const StateUpdateArgsSchema: z.ZodType<Prisma.StateUpdateArgs> = z.object({
  select: StateSelectSchema.optional(),
  include: StateIncludeSchema.optional(),
  data: z.union([ StateUpdateInputSchema,StateUncheckedUpdateInputSchema ]),
  where: StateWhereUniqueInputSchema,
}).strict() ;

export const StateUpdateManyArgsSchema: z.ZodType<Prisma.StateUpdateManyArgs> = z.object({
  data: z.union([ StateUpdateManyMutationInputSchema,StateUncheckedUpdateManyInputSchema ]),
  where: StateWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StateDeleteManyArgsSchema: z.ZodType<Prisma.StateDeleteManyArgs> = z.object({
  where: StateWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;