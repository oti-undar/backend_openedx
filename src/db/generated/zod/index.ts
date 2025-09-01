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

export const UsuarioCursoScalarFieldEnumSchema = z.enum(['id','user_id','curso_id','is_instructor','created_at','updated_at','deleted_at']);

export const EjecucionExamenScalarFieldEnumSchema = z.enum(['id','user_id','examen_id','pregunta_ejecucion_actual_id','fin_examen','created_at','updated_at','deleted_at']);

export const PreguntasEjecucionExamenScalarFieldEnumSchema = z.enum(['id','ejecucion_examen_id','pregunta_id','respuesta_id','inicio','final','created_at','updated_at','deleted_at']);

export const ExamenScalarFieldEnumSchema = z.enum(['id','title','description','img','video','audio','peso','user_id','curso_id','inicio_examen','final_examen','tipo_examen','rubrica_holistica_id','rubrica_analitica_id','state_id','created_at','updated_at','deleted_at']);

export const PreguntaScalarFieldEnumSchema = z.enum(['id','title','description','img','video','audio','puntos','duracion','examen_id']);

export const RespuestaScalarFieldEnumSchema = z.enum(['id','respuesta','img','video','audio','correcta','pregunta_id']);

export const HistorialScalarFieldEnumSchema = z.enum(['id','user_id','examen_id','puntaje','created_at','updated_at','deleted_at']);

export const RubricaHolisticaScalarFieldEnumSchema = z.enum(['id','name','user_id','created_at','updated_at','deleted_at']);

export const RubricaAnaliticaScalarFieldEnumSchema = z.enum(['id','name','user_id','created_at','updated_at','deleted_at']);

export const IndicadoresScalarFieldEnumSchema = z.enum(['id','name','rubrica_analitica_id','created_at','updated_at','deleted_at']);

export const NivelesDeLogroScalarFieldEnumSchema = z.enum(['id','name','criterios','tipo','nota','rubrica_holistica_id','indicador_id','created_at','updated_at','deleted_at']);

export const StateScalarFieldEnumSchema = z.enum(['id','name']);

export const UserScalarFieldEnumSchema = z.enum(['id','is_superuser','is_staff','is_active','username','first_name','last_name','email','created_at','updated_at','deleted_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const CursoOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const UsuarioCursoOrderByRelevanceFieldEnumSchema = z.enum(['curso_id']);

export const EjecucionExamenOrderByRelevanceFieldEnumSchema = z.enum(['id','examen_id','pregunta_ejecucion_actual_id']);

export const PreguntasEjecucionExamenOrderByRelevanceFieldEnumSchema = z.enum(['id','ejecucion_examen_id','pregunta_id','respuesta_id']);

export const ExamenOrderByRelevanceFieldEnumSchema = z.enum(['id','title','description','img','video','audio','curso_id','rubrica_holistica_id','rubrica_analitica_id']);

export const PreguntaOrderByRelevanceFieldEnumSchema = z.enum(['id','title','description','img','video','audio','examen_id']);

export const RespuestaOrderByRelevanceFieldEnumSchema = z.enum(['id','respuesta','img','video','audio','pregunta_id']);

export const HistorialOrderByRelevanceFieldEnumSchema = z.enum(['id','examen_id']);

export const RubricaHolisticaOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const RubricaAnaliticaOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const IndicadoresOrderByRelevanceFieldEnumSchema = z.enum(['name','rubrica_analitica_id']);

export const NivelesDeLogroOrderByRelevanceFieldEnumSchema = z.enum(['name','criterios','nota','rubrica_holistica_id']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['username','first_name','last_name','email']);

export const TipoExamenSchema = z.enum(['Sync','Async']);

export type TipoExamenType = `${z.infer<typeof TipoExamenSchema>}`

export const TipoNivelSchema = z.enum(['Porcentaje','Rango']);

export type TipoNivelType = `${z.infer<typeof TipoNivelSchema>}`

export const StateTypeSchema = z.enum(['Activo','Inconcluso','Disponible','Suspendido','Inactivo','Finalizado']);

export type StateTypeType = `${z.infer<typeof StateTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CURSO SCHEMA
/////////////////////////////////////////

export const CursoSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Curso = z.infer<typeof CursoSchema>

/////////////////////////////////////////
// USUARIO CURSO SCHEMA
/////////////////////////////////////////

export const UsuarioCursoSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  curso_id: z.string(),
  is_instructor: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type UsuarioCurso = z.infer<typeof UsuarioCursoSchema>

/////////////////////////////////////////
// EJECUCION EXAMEN SCHEMA
/////////////////////////////////////////

export const EjecucionExamenSchema = z.object({
  id: z.string().uuid(),
  user_id: z.number().int(),
  examen_id: z.string(),
  pregunta_ejecucion_actual_id: z.string().nullable(),
  fin_examen: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type EjecucionExamen = z.infer<typeof EjecucionExamenSchema>

/////////////////////////////////////////
// PREGUNTAS EJECUCION EXAMEN SCHEMA
/////////////////////////////////////////

export const PreguntasEjecucionExamenSchema = z.object({
  id: z.string().uuid(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.string(),
  respuesta_id: z.string().nullable(),
  inicio: z.coerce.date().nullable(),
  final: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type PreguntasEjecucionExamen = z.infer<typeof PreguntasEjecucionExamenSchema>

/////////////////////////////////////////
// EXAMEN SCHEMA
/////////////////////////////////////////

export const ExamenSchema = z.object({
  tipo_examen: TipoExamenSchema,
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  img: z.string().nullable(),
  video: z.string().nullable(),
  audio: z.string().nullable(),
  peso: z.number().int(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().nullable(),
  final_examen: z.coerce.date().nullable(),
  rubrica_holistica_id: z.string().nullable(),
  rubrica_analitica_id: z.string().nullable(),
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
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  img: z.string().nullable(),
  video: z.string().nullable(),
  audio: z.string().nullable(),
  puntos: z.number().int(),
  duracion: z.instanceof(Prisma.Decimal, { message: "Field 'duracion' must be a Decimal. Location: ['Models', 'Pregunta']"}).nullable(),
  examen_id: z.string(),
})

export type Pregunta = z.infer<typeof PreguntaSchema>

/////////////////////////////////////////
// RESPUESTA SCHEMA
/////////////////////////////////////////

export const RespuestaSchema = z.object({
  id: z.string().uuid(),
  respuesta: z.string(),
  img: z.string().nullable(),
  video: z.string().nullable(),
  audio: z.string().nullable(),
  correcta: z.boolean(),
  pregunta_id: z.string(),
})

export type Respuesta = z.infer<typeof RespuestaSchema>

/////////////////////////////////////////
// HISTORIAL SCHEMA
/////////////////////////////////////////

export const HistorialSchema = z.object({
  id: z.string().uuid(),
  user_id: z.number().int(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Historial = z.infer<typeof HistorialSchema>

/////////////////////////////////////////
// RUBRICA HOLISTICA SCHEMA
/////////////////////////////////////////

export const RubricaHolisticaSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type RubricaHolistica = z.infer<typeof RubricaHolisticaSchema>

/////////////////////////////////////////
// RUBRICA ANALITICA SCHEMA
/////////////////////////////////////////

export const RubricaAnaliticaSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type RubricaAnalitica = z.infer<typeof RubricaAnaliticaSchema>

/////////////////////////////////////////
// INDICADORES SCHEMA
/////////////////////////////////////////

export const IndicadoresSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  rubrica_analitica_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Indicadores = z.infer<typeof IndicadoresSchema>

/////////////////////////////////////////
// NIVELES DE LOGRO SCHEMA
/////////////////////////////////////////

export const NivelesDeLogroSchema = z.object({
  tipo: TipoNivelSchema,
  id: z.number().int(),
  name: z.string(),
  criterios: z.string(),
  nota: z.string(),
  rubrica_holistica_id: z.string().nullable(),
  indicador_id: z.number().int().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type NivelesDeLogro = z.infer<typeof NivelesDeLogroSchema>

/////////////////////////////////////////
// STATE SCHEMA
/////////////////////////////////////////

export const StateSchema = z.object({
  name: StateTypeSchema,
  id: z.number().int(),
})

export type State = z.infer<typeof StateSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  is_superuser: z.boolean(),
  is_staff: z.boolean(),
  is_active: z.boolean(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CURSO
//------------------------------------------------------

export const CursoIncludeSchema: z.ZodType<Prisma.CursoInclude> = z.object({
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  usuarios: z.union([z.boolean(),z.lazy(() => UsuarioCursoFindManyArgsSchema)]).optional(),
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
  usuarios: z.boolean().optional(),
}).strict();

export const CursoSelectSchema: z.ZodType<Prisma.CursoSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  usuarios: z.union([z.boolean(),z.lazy(() => UsuarioCursoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CursoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USUARIO CURSO
//------------------------------------------------------

export const UsuarioCursoIncludeSchema: z.ZodType<Prisma.UsuarioCursoInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
}).strict()

export const UsuarioCursoArgsSchema: z.ZodType<Prisma.UsuarioCursoDefaultArgs> = z.object({
  select: z.lazy(() => UsuarioCursoSelectSchema).optional(),
  include: z.lazy(() => UsuarioCursoIncludeSchema).optional(),
}).strict();

export const UsuarioCursoSelectSchema: z.ZodType<Prisma.UsuarioCursoSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  curso_id: z.boolean().optional(),
  is_instructor: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
}).strict()

// EJECUCION EXAMEN
//------------------------------------------------------

export const EjecucionExamenIncludeSchema: z.ZodType<Prisma.EjecucionExamenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  pregunta_ejecucion_actual: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenArgsSchema)]).optional(),
  preguntas_resueltas: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenFindManyArgsSchema)]).optional(),
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
  preguntas_resueltas: z.boolean().optional(),
}).strict();

export const EjecucionExamenSelectSchema: z.ZodType<Prisma.EjecucionExamenSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  examen_id: z.boolean().optional(),
  pregunta_ejecucion_actual_id: z.boolean().optional(),
  fin_examen: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  pregunta_ejecucion_actual: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenArgsSchema)]).optional(),
  preguntas_resueltas: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EjecucionExamenCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PREGUNTAS EJECUCION EXAMEN
//------------------------------------------------------

export const PreguntasEjecucionExamenIncludeSchema: z.ZodType<Prisma.PreguntasEjecucionExamenInclude> = z.object({
  ejecucion_examen: z.union([z.boolean(),z.lazy(() => EjecucionExamenArgsSchema)]).optional(),
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuesta: z.union([z.boolean(),z.lazy(() => RespuestaArgsSchema)]).optional(),
  ejecucion_actual_de: z.union([z.boolean(),z.lazy(() => EjecucionExamenArgsSchema)]).optional(),
}).strict()

export const PreguntasEjecucionExamenArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenDefaultArgs> = z.object({
  select: z.lazy(() => PreguntasEjecucionExamenSelectSchema).optional(),
  include: z.lazy(() => PreguntasEjecucionExamenIncludeSchema).optional(),
}).strict();

export const PreguntasEjecucionExamenSelectSchema: z.ZodType<Prisma.PreguntasEjecucionExamenSelect> = z.object({
  id: z.boolean().optional(),
  ejecucion_examen_id: z.boolean().optional(),
  pregunta_id: z.boolean().optional(),
  respuesta_id: z.boolean().optional(),
  inicio: z.boolean().optional(),
  final: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  ejecucion_examen: z.union([z.boolean(),z.lazy(() => EjecucionExamenArgsSchema)]).optional(),
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuesta: z.union([z.boolean(),z.lazy(() => RespuestaArgsSchema)]).optional(),
  ejecucion_actual_de: z.union([z.boolean(),z.lazy(() => EjecucionExamenArgsSchema)]).optional(),
}).strict()

// EXAMEN
//------------------------------------------------------

export const ExamenIncludeSchema: z.ZodType<Prisma.ExamenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  rubrica_holistica: z.union([z.boolean(),z.lazy(() => RubricaHolisticaArgsSchema)]).optional(),
  rubrica_analitica: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  preguntas: z.union([z.boolean(),z.lazy(() => PreguntaFindManyArgsSchema)]).optional(),
  historial: z.union([z.boolean(),z.lazy(() => HistorialFindManyArgsSchema)]).optional(),
  ejecuciones: z.union([z.boolean(),z.lazy(() => EjecucionExamenFindManyArgsSchema)]).optional(),
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
  tipo_examen: z.boolean().optional(),
  rubrica_holistica_id: z.boolean().optional(),
  rubrica_analitica_id: z.boolean().optional(),
  state_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  curso: z.union([z.boolean(),z.lazy(() => CursoArgsSchema)]).optional(),
  rubrica_holistica: z.union([z.boolean(),z.lazy(() => RubricaHolisticaArgsSchema)]).optional(),
  rubrica_analitica: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => StateArgsSchema)]).optional(),
  preguntas: z.union([z.boolean(),z.lazy(() => PreguntaFindManyArgsSchema)]).optional(),
  historial: z.union([z.boolean(),z.lazy(() => HistorialFindManyArgsSchema)]).optional(),
  ejecuciones: z.union([z.boolean(),z.lazy(() => EjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExamenCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PREGUNTA
//------------------------------------------------------

export const PreguntaIncludeSchema: z.ZodType<Prisma.PreguntaInclude> = z.object({
  indicadores: z.union([z.boolean(),z.lazy(() => IndicadoresFindManyArgsSchema)]).optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  respuestas: z.union([z.boolean(),z.lazy(() => RespuestaFindManyArgsSchema)]).optional(),
  preguntasEjecucionExamen: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenFindManyArgsSchema)]).optional(),
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
  indicadores: z.boolean().optional(),
  respuestas: z.boolean().optional(),
  preguntasEjecucionExamen: z.boolean().optional(),
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
  examen_id: z.boolean().optional(),
  indicadores: z.union([z.boolean(),z.lazy(() => IndicadoresFindManyArgsSchema)]).optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
  respuestas: z.union([z.boolean(),z.lazy(() => RespuestaFindManyArgsSchema)]).optional(),
  preguntasEjecucionExamen: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PreguntaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RESPUESTA
//------------------------------------------------------

export const RespuestaIncludeSchema: z.ZodType<Prisma.RespuestaInclude> = z.object({
  pregunta: z.union([z.boolean(),z.lazy(() => PreguntaArgsSchema)]).optional(),
  respuestasEjecucionExamen: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenFindManyArgsSchema)]).optional(),
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
  respuestasEjecucionExamen: z.union([z.boolean(),z.lazy(() => PreguntasEjecucionExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RespuestaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HISTORIAL
//------------------------------------------------------

export const HistorialIncludeSchema: z.ZodType<Prisma.HistorialInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
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
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  examen: z.union([z.boolean(),z.lazy(() => ExamenArgsSchema)]).optional(),
}).strict()

// RUBRICA HOLISTICA
//------------------------------------------------------

export const RubricaHolisticaIncludeSchema: z.ZodType<Prisma.RubricaHolisticaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  niveles_de_logro: z.union([z.boolean(),z.lazy(() => NivelesDeLogroFindManyArgsSchema)]).optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RubricaHolisticaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RubricaHolisticaArgsSchema: z.ZodType<Prisma.RubricaHolisticaDefaultArgs> = z.object({
  select: z.lazy(() => RubricaHolisticaSelectSchema).optional(),
  include: z.lazy(() => RubricaHolisticaIncludeSchema).optional(),
}).strict();

export const RubricaHolisticaCountOutputTypeArgsSchema: z.ZodType<Prisma.RubricaHolisticaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RubricaHolisticaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RubricaHolisticaCountOutputTypeSelectSchema: z.ZodType<Prisma.RubricaHolisticaCountOutputTypeSelect> = z.object({
  niveles_de_logro: z.boolean().optional(),
  examenes: z.boolean().optional(),
}).strict();

export const RubricaHolisticaSelectSchema: z.ZodType<Prisma.RubricaHolisticaSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  user_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  niveles_de_logro: z.union([z.boolean(),z.lazy(() => NivelesDeLogroFindManyArgsSchema)]).optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RubricaHolisticaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RUBRICA ANALITICA
//------------------------------------------------------

export const RubricaAnaliticaIncludeSchema: z.ZodType<Prisma.RubricaAnaliticaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  indicadores: z.union([z.boolean(),z.lazy(() => IndicadoresFindManyArgsSchema)]).optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RubricaAnaliticaArgsSchema: z.ZodType<Prisma.RubricaAnaliticaDefaultArgs> = z.object({
  select: z.lazy(() => RubricaAnaliticaSelectSchema).optional(),
  include: z.lazy(() => RubricaAnaliticaIncludeSchema).optional(),
}).strict();

export const RubricaAnaliticaCountOutputTypeArgsSchema: z.ZodType<Prisma.RubricaAnaliticaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RubricaAnaliticaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RubricaAnaliticaCountOutputTypeSelectSchema: z.ZodType<Prisma.RubricaAnaliticaCountOutputTypeSelect> = z.object({
  indicadores: z.boolean().optional(),
  examenes: z.boolean().optional(),
}).strict();

export const RubricaAnaliticaSelectSchema: z.ZodType<Prisma.RubricaAnaliticaSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  user_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  indicadores: z.union([z.boolean(),z.lazy(() => IndicadoresFindManyArgsSchema)]).optional(),
  examenes: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INDICADORES
//------------------------------------------------------

export const IndicadoresIncludeSchema: z.ZodType<Prisma.IndicadoresInclude> = z.object({
  rubrica_analitica: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaArgsSchema)]).optional(),
  preguntas: z.union([z.boolean(),z.lazy(() => PreguntaFindManyArgsSchema)]).optional(),
  niveles_de_logro: z.union([z.boolean(),z.lazy(() => NivelesDeLogroFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndicadoresCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IndicadoresArgsSchema: z.ZodType<Prisma.IndicadoresDefaultArgs> = z.object({
  select: z.lazy(() => IndicadoresSelectSchema).optional(),
  include: z.lazy(() => IndicadoresIncludeSchema).optional(),
}).strict();

export const IndicadoresCountOutputTypeArgsSchema: z.ZodType<Prisma.IndicadoresCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => IndicadoresCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IndicadoresCountOutputTypeSelectSchema: z.ZodType<Prisma.IndicadoresCountOutputTypeSelect> = z.object({
  preguntas: z.boolean().optional(),
  niveles_de_logro: z.boolean().optional(),
}).strict();

export const IndicadoresSelectSchema: z.ZodType<Prisma.IndicadoresSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  rubrica_analitica_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  rubrica_analitica: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaArgsSchema)]).optional(),
  preguntas: z.union([z.boolean(),z.lazy(() => PreguntaFindManyArgsSchema)]).optional(),
  niveles_de_logro: z.union([z.boolean(),z.lazy(() => NivelesDeLogroFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndicadoresCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NIVELES DE LOGRO
//------------------------------------------------------

export const NivelesDeLogroIncludeSchema: z.ZodType<Prisma.NivelesDeLogroInclude> = z.object({
  rubrica_holistica: z.union([z.boolean(),z.lazy(() => RubricaHolisticaArgsSchema)]).optional(),
  indicador: z.union([z.boolean(),z.lazy(() => IndicadoresArgsSchema)]).optional(),
}).strict()

export const NivelesDeLogroArgsSchema: z.ZodType<Prisma.NivelesDeLogroDefaultArgs> = z.object({
  select: z.lazy(() => NivelesDeLogroSelectSchema).optional(),
  include: z.lazy(() => NivelesDeLogroIncludeSchema).optional(),
}).strict();

export const NivelesDeLogroSelectSchema: z.ZodType<Prisma.NivelesDeLogroSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  criterios: z.boolean().optional(),
  tipo: z.boolean().optional(),
  nota: z.boolean().optional(),
  rubrica_holistica_id: z.boolean().optional(),
  indicador_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  rubrica_holistica: z.union([z.boolean(),z.lazy(() => RubricaHolisticaArgsSchema)]).optional(),
  indicador: z.union([z.boolean(),z.lazy(() => IndicadoresArgsSchema)]).optional(),
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

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  rubricas_holisticas: z.union([z.boolean(),z.lazy(() => RubricaHolisticaFindManyArgsSchema)]).optional(),
  rubricas_analiticas: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaFindManyArgsSchema)]).optional(),
  historial: z.union([z.boolean(),z.lazy(() => HistorialFindManyArgsSchema)]).optional(),
  examenes_creados: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  examenes_resueltos: z.union([z.boolean(),z.lazy(() => EjecucionExamenFindManyArgsSchema)]).optional(),
  cursos: z.union([z.boolean(),z.lazy(() => UsuarioCursoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  rubricas_holisticas: z.boolean().optional(),
  rubricas_analiticas: z.boolean().optional(),
  historial: z.boolean().optional(),
  examenes_creados: z.boolean().optional(),
  examenes_resueltos: z.boolean().optional(),
  cursos: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  rubricas_holisticas: z.union([z.boolean(),z.lazy(() => RubricaHolisticaFindManyArgsSchema)]).optional(),
  rubricas_analiticas: z.union([z.boolean(),z.lazy(() => RubricaAnaliticaFindManyArgsSchema)]).optional(),
  historial: z.union([z.boolean(),z.lazy(() => HistorialFindManyArgsSchema)]).optional(),
  examenes_creados: z.union([z.boolean(),z.lazy(() => ExamenFindManyArgsSchema)]).optional(),
  examenes_resueltos: z.union([z.boolean(),z.lazy(() => EjecucionExamenFindManyArgsSchema)]).optional(),
  cursos: z.union([z.boolean(),z.lazy(() => UsuarioCursoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
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
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoListRelationFilterSchema).optional()
}).strict();

export const CursoOrderByWithRelationInputSchema: z.ZodType<Prisma.CursoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  examenes: z.lazy(() => ExamenOrderByRelationAggregateInputSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => CursoOrderByRelevanceInputSchema).optional()
}).strict();

export const CursoWhereUniqueInputSchema: z.ZodType<Prisma.CursoWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CursoWhereInputSchema),z.lazy(() => CursoWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoListRelationFilterSchema).optional()
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

export const UsuarioCursoWhereInputSchema: z.ZodType<Prisma.UsuarioCursoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsuarioCursoWhereInputSchema),z.lazy(() => UsuarioCursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioCursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioCursoWhereInputSchema),z.lazy(() => UsuarioCursoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_instructor: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict();

export const UsuarioCursoOrderByWithRelationInputSchema: z.ZodType<Prisma.UsuarioCursoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  is_instructor: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  curso: z.lazy(() => CursoOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => UsuarioCursoOrderByRelevanceInputSchema).optional()
}).strict();

export const UsuarioCursoWhereUniqueInputSchema: z.ZodType<Prisma.UsuarioCursoWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    user_id_curso_id: z.lazy(() => UsuarioCursoUser_idCurso_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    user_id_curso_id: z.lazy(() => UsuarioCursoUser_idCurso_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  user_id_curso_id: z.lazy(() => UsuarioCursoUser_idCurso_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UsuarioCursoWhereInputSchema),z.lazy(() => UsuarioCursoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioCursoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioCursoWhereInputSchema),z.lazy(() => UsuarioCursoWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_instructor: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
}).strict());

export const UsuarioCursoOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsuarioCursoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  is_instructor: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UsuarioCursoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UsuarioCursoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsuarioCursoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsuarioCursoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UsuarioCursoSumOrderByAggregateInputSchema).optional()
}).strict();

export const UsuarioCursoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsuarioCursoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsuarioCursoScalarWhereWithAggregatesInputSchema),z.lazy(() => UsuarioCursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioCursoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioCursoScalarWhereWithAggregatesInputSchema),z.lazy(() => UsuarioCursoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_instructor: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EjecucionExamenWhereInputSchema: z.ZodType<Prisma.EjecucionExamenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fin_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  pregunta_ejecucion_actual: z.union([ z.lazy(() => PreguntasEjecucionExamenNullableScalarRelationFilterSchema),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema) ]).optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenListRelationFilterSchema).optional()
}).strict();

export const EjecucionExamenOrderByWithRelationInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fin_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  examen: z.lazy(() => ExamenOrderByWithRelationInputSchema).optional(),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenOrderByWithRelationInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => EjecucionExamenOrderByRelevanceInputSchema).optional()
}).strict();

export const EjecucionExamenWhereUniqueInputSchema: z.ZodType<Prisma.EjecucionExamenWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    pregunta_ejecucion_actual_id: z.string(),
    user_id_examen_id: z.lazy(() => EjecucionExamenUser_idExamen_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
    pregunta_ejecucion_actual_id: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    user_id_examen_id: z.lazy(() => EjecucionExamenUser_idExamen_idCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    pregunta_ejecucion_actual_id: z.string(),
    user_id_examen_id: z.lazy(() => EjecucionExamenUser_idExamen_idCompoundUniqueInputSchema),
  }),
  z.object({
    pregunta_ejecucion_actual_id: z.string(),
  }),
  z.object({
    user_id_examen_id: z.lazy(() => EjecucionExamenUser_idExamen_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  pregunta_ejecucion_actual_id: z.string().optional(),
  user_id_examen_id: z.lazy(() => EjecucionExamenUser_idExamen_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenWhereInputSchema),z.lazy(() => EjecucionExamenWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fin_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  pregunta_ejecucion_actual: z.union([ z.lazy(() => PreguntasEjecucionExamenNullableScalarRelationFilterSchema),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema) ]).optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenListRelationFilterSchema).optional()
}).strict());

export const EjecucionExamenOrderByWithAggregationInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fin_examen: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EjecucionExamenCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EjecucionExamenAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EjecucionExamenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EjecucionExamenMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EjecucionExamenSumOrderByAggregateInputSchema).optional()
}).strict();

export const EjecucionExamenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EjecucionExamenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => EjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  fin_examen: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenWhereInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inicio: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ejecucion_examen: z.union([ z.lazy(() => EjecucionExamenScalarRelationFilterSchema),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuesta: z.union([ z.lazy(() => RespuestaNullableScalarRelationFilterSchema),z.lazy(() => RespuestaWhereInputSchema) ]).optional().nullable(),
  ejecucion_actual_de: z.union([ z.lazy(() => EjecucionExamenNullableScalarRelationFilterSchema),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenOrderByWithRelationInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inicio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  final: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ejecucion_examen: z.lazy(() => EjecucionExamenOrderByWithRelationInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaOrderByWithRelationInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaOrderByWithRelationInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => PreguntasEjecucionExamenOrderByRelevanceInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenWhereUniqueInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    pregunta_id_ejecucion_examen_id: z.lazy(() => PreguntasEjecucionExamenPregunta_idEjecucion_examen_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    pregunta_id_ejecucion_examen_id: z.lazy(() => PreguntasEjecucionExamenPregunta_idEjecucion_examen_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  pregunta_id_ejecucion_examen_id: z.lazy(() => PreguntasEjecucionExamenPregunta_idEjecucion_examen_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).array() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inicio: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ejecucion_examen: z.union([ z.lazy(() => EjecucionExamenScalarRelationFilterSchema),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuesta: z.union([ z.lazy(() => RespuestaNullableScalarRelationFilterSchema),z.lazy(() => RespuestaWhereInputSchema) ]).optional().nullable(),
  ejecucion_actual_de: z.union([ z.lazy(() => EjecucionExamenNullableScalarRelationFilterSchema),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PreguntasEjecucionExamenOrderByWithAggregationInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inicio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  final: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PreguntasEjecucionExamenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PreguntasEjecucionExamenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PreguntasEjecucionExamenMinOrderByAggregateInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  inicio: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  final: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => EnumTipoExamenFilterSchema),z.lazy(() => TipoExamenSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
  rubrica_holistica: z.union([ z.lazy(() => RubricaHolisticaNullableScalarRelationFilterSchema),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional().nullable(),
  rubrica_analitica: z.union([ z.lazy(() => RubricaAnaliticaNullableScalarRelationFilterSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema),z.lazy(() => StateWhereInputSchema) ]).optional(),
  preguntas: z.lazy(() => PreguntaListRelationFilterSchema).optional(),
  historial: z.lazy(() => HistorialListRelationFilterSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenListRelationFilterSchema).optional()
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
  tipo_examen: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  curso: z.lazy(() => CursoOrderByWithRelationInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaOrderByWithRelationInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaOrderByWithRelationInputSchema).optional(),
  state: z.lazy(() => StateOrderByWithRelationInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaOrderByRelationAggregateInputSchema).optional(),
  historial: z.lazy(() => HistorialOrderByRelationAggregateInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenOrderByRelationAggregateInputSchema).optional(),
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
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => EnumTipoExamenFilterSchema),z.lazy(() => TipoExamenSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  curso: z.union([ z.lazy(() => CursoScalarRelationFilterSchema),z.lazy(() => CursoWhereInputSchema) ]).optional(),
  rubrica_holistica: z.union([ z.lazy(() => RubricaHolisticaNullableScalarRelationFilterSchema),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional().nullable(),
  rubrica_analitica: z.union([ z.lazy(() => RubricaAnaliticaNullableScalarRelationFilterSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema) ]).optional().nullable(),
  state: z.union([ z.lazy(() => StateScalarRelationFilterSchema),z.lazy(() => StateWhereInputSchema) ]).optional(),
  preguntas: z.lazy(() => PreguntaListRelationFilterSchema).optional(),
  historial: z.lazy(() => HistorialListRelationFilterSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenListRelationFilterSchema).optional()
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
  tipo_examen: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => EnumTipoExamenWithAggregatesFilterSchema),z.lazy(() => TipoExamenSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PreguntaWhereInputSchema: z.ZodType<Prisma.PreguntaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntaWhereInputSchema),z.lazy(() => PreguntaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntaWhereInputSchema),z.lazy(() => PreguntaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  indicadores: z.lazy(() => IndicadoresListRelationFilterSchema).optional(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaListRelationFilterSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenListRelationFilterSchema).optional()
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
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  indicadores: z.lazy(() => IndicadoresOrderByRelationAggregateInputSchema).optional(),
  examen: z.lazy(() => ExamenOrderByWithRelationInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaOrderByRelationAggregateInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => PreguntaOrderByRelevanceInputSchema).optional()
}).strict();

export const PreguntaWhereUniqueInputSchema: z.ZodType<Prisma.PreguntaWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
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
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  indicadores: z.lazy(() => IndicadoresListRelationFilterSchema).optional(),
  examen: z.union([ z.lazy(() => ExamenScalarRelationFilterSchema),z.lazy(() => ExamenWhereInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaListRelationFilterSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenListRelationFilterSchema).optional()
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
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
  examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RespuestaWhereInputSchema: z.ZodType<Prisma.RespuestaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenListRelationFilterSchema).optional()
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
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RespuestaOrderByRelevanceInputSchema).optional()
}).strict();

export const RespuestaWhereUniqueInputSchema: z.ZodType<Prisma.RespuestaWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaWhereInputSchema),z.lazy(() => RespuestaWhereInputSchema).array() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta: z.union([ z.lazy(() => PreguntaScalarRelationFilterSchema),z.lazy(() => PreguntaWhereInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenListRelationFilterSchema).optional()
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
  _max: z.lazy(() => RespuestaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RespuestaMinOrderByAggregateInputSchema).optional()
}).strict();

export const RespuestaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RespuestaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema),z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema),z.lazy(() => RespuestaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const HistorialWhereInputSchema: z.ZodType<Prisma.HistorialWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HistorialWhereInputSchema),z.lazy(() => HistorialWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HistorialWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HistorialWhereInputSchema),z.lazy(() => HistorialWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
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
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
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
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
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
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  puntaje: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const RubricaHolisticaWhereInputSchema: z.ZodType<Prisma.RubricaHolisticaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RubricaHolisticaWhereInputSchema),z.lazy(() => RubricaHolisticaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaHolisticaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaHolisticaWhereInputSchema),z.lazy(() => RubricaHolisticaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroListRelationFilterSchema).optional(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict();

export const RubricaHolisticaOrderByWithRelationInputSchema: z.ZodType<Prisma.RubricaHolisticaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroOrderByRelationAggregateInputSchema).optional(),
  examenes: z.lazy(() => ExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RubricaHolisticaOrderByRelevanceInputSchema).optional()
}).strict();

export const RubricaHolisticaWhereUniqueInputSchema: z.ZodType<Prisma.RubricaHolisticaWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name_user_id: z.lazy(() => RubricaHolisticaNameUser_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name_user_id: z.lazy(() => RubricaHolisticaNameUser_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name_user_id: z.lazy(() => RubricaHolisticaNameUser_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RubricaHolisticaWhereInputSchema),z.lazy(() => RubricaHolisticaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaHolisticaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaHolisticaWhereInputSchema),z.lazy(() => RubricaHolisticaWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroListRelationFilterSchema).optional(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict());

export const RubricaHolisticaOrderByWithAggregationInputSchema: z.ZodType<Prisma.RubricaHolisticaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RubricaHolisticaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RubricaHolisticaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RubricaHolisticaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RubricaHolisticaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RubricaHolisticaSumOrderByAggregateInputSchema).optional()
}).strict();

export const RubricaHolisticaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RubricaHolisticaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RubricaHolisticaScalarWhereWithAggregatesInputSchema),z.lazy(() => RubricaHolisticaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaHolisticaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaHolisticaScalarWhereWithAggregatesInputSchema),z.lazy(() => RubricaHolisticaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const RubricaAnaliticaWhereInputSchema: z.ZodType<Prisma.RubricaAnaliticaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RubricaAnaliticaWhereInputSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaAnaliticaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaAnaliticaWhereInputSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  indicadores: z.lazy(() => IndicadoresListRelationFilterSchema).optional(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict();

export const RubricaAnaliticaOrderByWithRelationInputSchema: z.ZodType<Prisma.RubricaAnaliticaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  indicadores: z.lazy(() => IndicadoresOrderByRelationAggregateInputSchema).optional(),
  examenes: z.lazy(() => ExamenOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RubricaAnaliticaOrderByRelevanceInputSchema).optional()
}).strict();

export const RubricaAnaliticaWhereUniqueInputSchema: z.ZodType<Prisma.RubricaAnaliticaWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name_user_id: z.lazy(() => RubricaAnaliticaNameUser_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name_user_id: z.lazy(() => RubricaAnaliticaNameUser_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name_user_id: z.lazy(() => RubricaAnaliticaNameUser_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RubricaAnaliticaWhereInputSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaAnaliticaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaAnaliticaWhereInputSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  indicadores: z.lazy(() => IndicadoresListRelationFilterSchema).optional(),
  examenes: z.lazy(() => ExamenListRelationFilterSchema).optional()
}).strict());

export const RubricaAnaliticaOrderByWithAggregationInputSchema: z.ZodType<Prisma.RubricaAnaliticaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RubricaAnaliticaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RubricaAnaliticaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RubricaAnaliticaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RubricaAnaliticaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RubricaAnaliticaSumOrderByAggregateInputSchema).optional()
}).strict();

export const RubricaAnaliticaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RubricaAnaliticaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RubricaAnaliticaScalarWhereWithAggregatesInputSchema),z.lazy(() => RubricaAnaliticaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaAnaliticaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaAnaliticaScalarWhereWithAggregatesInputSchema),z.lazy(() => RubricaAnaliticaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const IndicadoresWhereInputSchema: z.ZodType<Prisma.IndicadoresWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndicadoresWhereInputSchema),z.lazy(() => IndicadoresWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndicadoresWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndicadoresWhereInputSchema),z.lazy(() => IndicadoresWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rubrica_analitica: z.union([ z.lazy(() => RubricaAnaliticaScalarRelationFilterSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema) ]).optional(),
  preguntas: z.lazy(() => PreguntaListRelationFilterSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroListRelationFilterSchema).optional()
}).strict();

export const IndicadoresOrderByWithRelationInputSchema: z.ZodType<Prisma.IndicadoresOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaOrderByWithRelationInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaOrderByRelationAggregateInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => IndicadoresOrderByRelevanceInputSchema).optional()
}).strict();

export const IndicadoresWhereUniqueInputSchema: z.ZodType<Prisma.IndicadoresWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name_rubrica_analitica_id: z.lazy(() => IndicadoresNameRubrica_analitica_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name_rubrica_analitica_id: z.lazy(() => IndicadoresNameRubrica_analitica_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name_rubrica_analitica_id: z.lazy(() => IndicadoresNameRubrica_analitica_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => IndicadoresWhereInputSchema),z.lazy(() => IndicadoresWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndicadoresWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndicadoresWhereInputSchema),z.lazy(() => IndicadoresWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rubrica_analitica: z.union([ z.lazy(() => RubricaAnaliticaScalarRelationFilterSchema),z.lazy(() => RubricaAnaliticaWhereInputSchema) ]).optional(),
  preguntas: z.lazy(() => PreguntaListRelationFilterSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroListRelationFilterSchema).optional()
}).strict());

export const IndicadoresOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndicadoresOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => IndicadoresCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IndicadoresAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndicadoresMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndicadoresMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IndicadoresSumOrderByAggregateInputSchema).optional()
}).strict();

export const IndicadoresScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndicadoresScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndicadoresScalarWhereWithAggregatesInputSchema),z.lazy(() => IndicadoresScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndicadoresScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndicadoresScalarWhereWithAggregatesInputSchema),z.lazy(() => IndicadoresScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const NivelesDeLogroWhereInputSchema: z.ZodType<Prisma.NivelesDeLogroWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NivelesDeLogroWhereInputSchema),z.lazy(() => NivelesDeLogroWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NivelesDeLogroWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NivelesDeLogroWhereInputSchema),z.lazy(() => NivelesDeLogroWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  criterios: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumTipoNivelFilterSchema),z.lazy(() => TipoNivelSchema) ]).optional(),
  nota: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  indicador_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rubrica_holistica: z.union([ z.lazy(() => RubricaHolisticaNullableScalarRelationFilterSchema),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional().nullable(),
  indicador: z.union([ z.lazy(() => IndicadoresNullableScalarRelationFilterSchema),z.lazy(() => IndicadoresWhereInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroOrderByWithRelationInputSchema: z.ZodType<Prisma.NivelesDeLogroOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  criterios: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  nota: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  indicador_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaOrderByWithRelationInputSchema).optional(),
  indicador: z.lazy(() => IndicadoresOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => NivelesDeLogroOrderByRelevanceInputSchema).optional()
}).strict();

export const NivelesDeLogroWhereUniqueInputSchema: z.ZodType<Prisma.NivelesDeLogroWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name_indicador_id: z.lazy(() => NivelesDeLogroNameIndicador_idCompoundUniqueInputSchema),
    name_rubrica_holistica_id: z.lazy(() => NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
    name_indicador_id: z.lazy(() => NivelesDeLogroNameIndicador_idCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
    name_rubrica_holistica_id: z.lazy(() => NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name_indicador_id: z.lazy(() => NivelesDeLogroNameIndicador_idCompoundUniqueInputSchema),
    name_rubrica_holistica_id: z.lazy(() => NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInputSchema),
  }),
  z.object({
    name_indicador_id: z.lazy(() => NivelesDeLogroNameIndicador_idCompoundUniqueInputSchema),
  }),
  z.object({
    name_rubrica_holistica_id: z.lazy(() => NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name_indicador_id: z.lazy(() => NivelesDeLogroNameIndicador_idCompoundUniqueInputSchema).optional(),
  name_rubrica_holistica_id: z.lazy(() => NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => NivelesDeLogroWhereInputSchema),z.lazy(() => NivelesDeLogroWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NivelesDeLogroWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NivelesDeLogroWhereInputSchema),z.lazy(() => NivelesDeLogroWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  criterios: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumTipoNivelFilterSchema),z.lazy(() => TipoNivelSchema) ]).optional(),
  nota: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  indicador_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rubrica_holistica: z.union([ z.lazy(() => RubricaHolisticaNullableScalarRelationFilterSchema),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional().nullable(),
  indicador: z.union([ z.lazy(() => IndicadoresNullableScalarRelationFilterSchema),z.lazy(() => IndicadoresWhereInputSchema) ]).optional().nullable(),
}).strict());

export const NivelesDeLogroOrderByWithAggregationInputSchema: z.ZodType<Prisma.NivelesDeLogroOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  criterios: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  nota: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  indicador_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => NivelesDeLogroCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NivelesDeLogroAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NivelesDeLogroMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NivelesDeLogroMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NivelesDeLogroSumOrderByAggregateInputSchema).optional()
}).strict();

export const NivelesDeLogroScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NivelesDeLogroScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NivelesDeLogroScalarWhereWithAggregatesInputSchema),z.lazy(() => NivelesDeLogroScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NivelesDeLogroScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NivelesDeLogroScalarWhereWithAggregatesInputSchema),z.lazy(() => NivelesDeLogroScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  criterios: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumTipoNivelWithAggregatesFilterSchema),z.lazy(() => TipoNivelSchema) ]).optional(),
  nota: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  indicador_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
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

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  is_superuser: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_staff: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaListRelationFilterSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaListRelationFilterSchema).optional(),
  historial: z.lazy(() => HistorialListRelationFilterSchema).optional(),
  examenes_creados: z.lazy(() => ExamenListRelationFilterSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenListRelationFilterSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  is_superuser: z.lazy(() => SortOrderSchema).optional(),
  is_staff: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaOrderByRelationAggregateInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaOrderByRelationAggregateInputSchema).optional(),
  historial: z.lazy(() => HistorialOrderByRelationAggregateInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenOrderByRelationAggregateInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenOrderByRelationAggregateInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  is_superuser: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_staff: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaListRelationFilterSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaListRelationFilterSchema).optional(),
  historial: z.lazy(() => HistorialListRelationFilterSchema).optional(),
  examenes_creados: z.lazy(() => ExamenListRelationFilterSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenListRelationFilterSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  is_superuser: z.lazy(() => SortOrderSchema).optional(),
  is_staff: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  is_superuser: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_staff: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CursoCreateInputSchema: z.ZodType<Prisma.CursoCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutCursoInputSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUncheckedCreateInputSchema: z.ZodType<Prisma.CursoUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutCursoInputSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUpdateInputSchema: z.ZodType<Prisma.CursoUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutCursoNestedInputSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutCursoNestedInputSchema).optional(),
  usuarios: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoCreateManyInputSchema: z.ZodType<Prisma.CursoCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const CursoUpdateManyMutationInputSchema: z.ZodType<Prisma.CursoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CursoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoCreateInputSchema: z.ZodType<Prisma.UsuarioCursoCreateInput> = z.object({
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCursosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutUsuariosInputSchema)
}).strict();

export const UsuarioCursoUncheckedCreateInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UsuarioCursoUpdateInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateInput> = z.object({
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCursosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutUsuariosNestedInputSchema).optional()
}).strict();

export const UsuarioCursoUncheckedUpdateInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoCreateManyInputSchema: z.ZodType<Prisma.UsuarioCursoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UsuarioCursoUpdateManyMutationInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateManyMutationInput> = z.object({
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenCreateInputSchema: z.ZodType<Prisma.EjecucionExamenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_resueltosInputSchema),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutEjecucionesInputSchema),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenCreateNestedOneWithoutEjecucion_actual_deInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  examen_id: z.string(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_resueltosNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema).optional(),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenUpdateOneWithoutEjecucion_actual_deNestedInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenCreateManyInputSchema: z.ZodType<Prisma.EjecucionExamenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  examen_id: z.string(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenUpdateManyMutationInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenCreateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPreguntas_resueltasInputSchema),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutPreguntasEjecucionExamenInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUpdateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutPreguntas_resueltasNestedInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutPreguntasEjecucionExamenNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneWithoutRespuestasEjecucionExamenNestedInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateManyInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntasEjecucionExamenUpdateManyMutationInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
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
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaCreateInputSchema: z.ZodType<Prisma.PreguntaCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutPreguntasInputSchema).optional(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  examen_id: z.string(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutPreguntasInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUpdateInputSchema: z.ZodType<Prisma.PreguntaUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaCreateManyInputSchema: z.ZodType<Prisma.PreguntaCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  examen_id: z.string()
}).strict();

export const PreguntaUpdateManyMutationInputSchema: z.ZodType<Prisma.PreguntaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RespuestaCreateInputSchema: z.ZodType<Prisma.RespuestaCreateInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasInputSchema),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaUncheckedCreateInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta_id: z.string(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaUpdateInputSchema: z.ZodType<Prisma.RespuestaUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaCreateManyInputSchema: z.ZodType<Prisma.RespuestaCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta_id: z.string()
}).strict();

export const RespuestaUpdateManyMutationInputSchema: z.ZodType<Prisma.RespuestaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RespuestaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HistorialCreateInputSchema: z.ZodType<Prisma.HistorialCreateInput> = z.object({
  id: z.string().uuid().optional(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutHistorialInputSchema),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutHistorialInputSchema)
}).strict();

export const HistorialUncheckedCreateInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialUpdateInputSchema: z.ZodType<Prisma.HistorialUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHistorialNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutHistorialNestedInputSchema).optional()
}).strict();

export const HistorialUncheckedUpdateInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialCreateManyInputSchema: z.ZodType<Prisma.HistorialCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialUpdateManyMutationInputSchema: z.ZodType<Prisma.HistorialUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RubricaHolisticaCreateInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRubricas_holisticasInputSchema),
  niveles_de_logro: z.lazy(() => NivelesDeLogroCreateNestedManyWithoutRubrica_holisticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedCreateInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaUpdateInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRubricas_holisticasNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedUpdateInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaCreateManyInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RubricaHolisticaUpdateManyMutationInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RubricaHolisticaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RubricaAnaliticaCreateInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRubricas_analiticasInputSchema),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutRubrica_analiticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedCreateInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaUpdateInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRubricas_analiticasNestedInputSchema).optional(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedUpdateInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaCreateManyInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RubricaAnaliticaUpdateManyMutationInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RubricaAnaliticaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndicadoresCreateInputSchema: z.ZodType<Prisma.IndicadoresCreateInput> = z.object({
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutIndicadoresInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutIndicadoresInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroCreateNestedManyWithoutIndicadorInputSchema).optional()
}).strict();

export const IndicadoresUncheckedCreateInputSchema: z.ZodType<Prisma.IndicadoresUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rubrica_analitica_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutIndicadoresInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedCreateNestedManyWithoutIndicadorInputSchema).optional()
}).strict();

export const IndicadoresUpdateInputSchema: z.ZodType<Prisma.IndicadoresUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneRequiredWithoutIndicadoresNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutIndicadoresNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUpdateManyWithoutIndicadorNestedInputSchema).optional()
}).strict();

export const IndicadoresUncheckedUpdateInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutIndicadoresNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutIndicadorNestedInputSchema).optional()
}).strict();

export const IndicadoresCreateManyInputSchema: z.ZodType<Prisma.IndicadoresCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rubrica_analitica_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const IndicadoresUpdateManyMutationInputSchema: z.ZodType<Prisma.IndicadoresUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndicadoresUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroCreateInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateInput> = z.object({
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutNiveles_de_logroInputSchema).optional(),
  indicador: z.lazy(() => IndicadoresCreateNestedOneWithoutNiveles_de_logroInputSchema).optional()
}).strict();

export const NivelesDeLogroUncheckedCreateInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  rubrica_holistica_id: z.string().optional().nullable(),
  indicador_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const NivelesDeLogroUpdateInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutNiveles_de_logroNestedInputSchema).optional(),
  indicador: z.lazy(() => IndicadoresUpdateOneWithoutNiveles_de_logroNestedInputSchema).optional()
}).strict();

export const NivelesDeLogroUncheckedUpdateInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicador_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroCreateManyInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  rubrica_holistica_id: z.string().optional().nullable(),
  indicador_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const NivelesDeLogroUpdateManyMutationInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicador_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const UsuarioCursoListRelationFilterSchema: z.ZodType<Prisma.UsuarioCursoListRelationFilter> = z.object({
  every: z.lazy(() => UsuarioCursoWhereInputSchema).optional(),
  some: z.lazy(() => UsuarioCursoWhereInputSchema).optional(),
  none: z.lazy(() => UsuarioCursoWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ExamenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExamenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsuarioCursoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsuarioCursoOrderByRelationAggregateInput> = z.object({
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

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CursoScalarRelationFilterSchema: z.ZodType<Prisma.CursoScalarRelationFilter> = z.object({
  is: z.lazy(() => CursoWhereInputSchema).optional(),
  isNot: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const UsuarioCursoOrderByRelevanceInputSchema: z.ZodType<Prisma.UsuarioCursoOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UsuarioCursoOrderByRelevanceFieldEnumSchema),z.lazy(() => UsuarioCursoOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UsuarioCursoUser_idCurso_idCompoundUniqueInputSchema: z.ZodType<Prisma.UsuarioCursoUser_idCurso_idCompoundUniqueInput> = z.object({
  user_id: z.number(),
  curso_id: z.string()
}).strict();

export const UsuarioCursoCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCursoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  is_instructor: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsuarioCursoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCursoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsuarioCursoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCursoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  is_instructor: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsuarioCursoMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCursoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  curso_id: z.lazy(() => SortOrderSchema).optional(),
  is_instructor: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsuarioCursoSumOrderByAggregateInputSchema: z.ZodType<Prisma.UsuarioCursoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
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

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const ExamenScalarRelationFilterSchema: z.ZodType<Prisma.ExamenScalarRelationFilter> = z.object({
  is: z.lazy(() => ExamenWhereInputSchema).optional(),
  isNot: z.lazy(() => ExamenWhereInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenNullableScalarRelationFilterSchema: z.ZodType<Prisma.PreguntasEjecucionExamenNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional().nullable()
}).strict();

export const PreguntasEjecucionExamenListRelationFilterSchema: z.ZodType<Prisma.PreguntasEjecucionExamenListRelationFilter> = z.object({
  every: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional(),
  some: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional(),
  none: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenOrderByRelevanceInputSchema: z.ZodType<Prisma.EjecucionExamenOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => EjecucionExamenOrderByRelevanceFieldEnumSchema),z.lazy(() => EjecucionExamenOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const EjecucionExamenUser_idExamen_idCompoundUniqueInputSchema: z.ZodType<Prisma.EjecucionExamenUser_idExamen_idCompoundUniqueInput> = z.object({
  user_id: z.number(),
  examen_id: z.string()
}).strict();

export const EjecucionExamenCountOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_ejecucion_actual_id: z.lazy(() => SortOrderSchema).optional(),
  fin_examen: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenAvgOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_ejecucion_actual_id: z.lazy(() => SortOrderSchema).optional(),
  fin_examen: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenMinOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_ejecucion_actual_id: z.lazy(() => SortOrderSchema).optional(),
  fin_examen: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EjecucionExamenSumOrderByAggregateInputSchema: z.ZodType<Prisma.EjecucionExamenSumOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional()
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

export const EjecucionExamenScalarRelationFilterSchema: z.ZodType<Prisma.EjecucionExamenScalarRelationFilter> = z.object({
  is: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  isNot: z.lazy(() => EjecucionExamenWhereInputSchema).optional()
}).strict();

export const PreguntaScalarRelationFilterSchema: z.ZodType<Prisma.PreguntaScalarRelationFilter> = z.object({
  is: z.lazy(() => PreguntaWhereInputSchema).optional(),
  isNot: z.lazy(() => PreguntaWhereInputSchema).optional()
}).strict();

export const RespuestaNullableScalarRelationFilterSchema: z.ZodType<Prisma.RespuestaNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => RespuestaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RespuestaWhereInputSchema).optional().nullable()
}).strict();

export const EjecucionExamenNullableScalarRelationFilterSchema: z.ZodType<Prisma.EjecucionExamenNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => EjecucionExamenWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EjecucionExamenWhereInputSchema).optional().nullable()
}).strict();

export const PreguntasEjecucionExamenOrderByRelevanceInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => PreguntasEjecucionExamenOrderByRelevanceFieldEnumSchema),z.lazy(() => PreguntasEjecucionExamenOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const PreguntasEjecucionExamenPregunta_idEjecucion_examen_idCompoundUniqueInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenPregunta_idEjecucion_examen_idCompoundUniqueInput> = z.object({
  pregunta_id: z.string(),
  ejecucion_examen_id: z.string()
}).strict();

export const PreguntasEjecucionExamenCountOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  inicio: z.lazy(() => SortOrderSchema).optional(),
  final: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntasEjecucionExamenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  inicio: z.lazy(() => SortOrderSchema).optional(),
  final: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntasEjecucionExamenMinOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ejecucion_examen_id: z.lazy(() => SortOrderSchema).optional(),
  pregunta_id: z.lazy(() => SortOrderSchema).optional(),
  respuesta_id: z.lazy(() => SortOrderSchema).optional(),
  inicio: z.lazy(() => SortOrderSchema).optional(),
  final: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTipoExamenFilterSchema: z.ZodType<Prisma.EnumTipoExamenFilter> = z.object({
  equals: z.lazy(() => TipoExamenSchema).optional(),
  in: z.lazy(() => TipoExamenSchema).array().optional(),
  notIn: z.lazy(() => TipoExamenSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => NestedEnumTipoExamenFilterSchema) ]).optional(),
}).strict();

export const RubricaHolisticaNullableScalarRelationFilterSchema: z.ZodType<Prisma.RubricaHolisticaNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => RubricaHolisticaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RubricaHolisticaWhereInputSchema).optional().nullable()
}).strict();

export const RubricaAnaliticaNullableScalarRelationFilterSchema: z.ZodType<Prisma.RubricaAnaliticaNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional().nullable()
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
  tipo_examen: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenAvgOrderByAggregateInput> = z.object({
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
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
  tipo_examen: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
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
  tipo_examen: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExamenSumOrderByAggregateInput> = z.object({
  peso: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  state_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTipoExamenWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTipoExamenWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TipoExamenSchema).optional(),
  in: z.lazy(() => TipoExamenSchema).array().optional(),
  notIn: z.lazy(() => TipoExamenSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => NestedEnumTipoExamenWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTipoExamenFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTipoExamenFilterSchema).optional()
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

export const IndicadoresListRelationFilterSchema: z.ZodType<Prisma.IndicadoresListRelationFilter> = z.object({
  every: z.lazy(() => IndicadoresWhereInputSchema).optional(),
  some: z.lazy(() => IndicadoresWhereInputSchema).optional(),
  none: z.lazy(() => IndicadoresWhereInputSchema).optional()
}).strict();

export const RespuestaListRelationFilterSchema: z.ZodType<Prisma.RespuestaListRelationFilter> = z.object({
  every: z.lazy(() => RespuestaWhereInputSchema).optional(),
  some: z.lazy(() => RespuestaWhereInputSchema).optional(),
  none: z.lazy(() => RespuestaWhereInputSchema).optional()
}).strict();

export const IndicadoresOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IndicadoresOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
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
  examen_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaAvgOrderByAggregateInput> = z.object({
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
  examen_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PreguntaSumOrderByAggregateInputSchema: z.ZodType<Prisma.PreguntaSumOrderByAggregateInput> = z.object({
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
  user_id: z.lazy(() => SortOrderSchema).optional(),
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
  user_id: z.lazy(() => SortOrderSchema).optional(),
  puntaje: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NivelesDeLogroListRelationFilterSchema: z.ZodType<Prisma.NivelesDeLogroListRelationFilter> = z.object({
  every: z.lazy(() => NivelesDeLogroWhereInputSchema).optional(),
  some: z.lazy(() => NivelesDeLogroWhereInputSchema).optional(),
  none: z.lazy(() => NivelesDeLogroWhereInputSchema).optional()
}).strict();

export const NivelesDeLogroOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NivelesDeLogroOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaHolisticaOrderByRelevanceInputSchema: z.ZodType<Prisma.RubricaHolisticaOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RubricaHolisticaOrderByRelevanceFieldEnumSchema),z.lazy(() => RubricaHolisticaOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RubricaHolisticaNameUser_idCompoundUniqueInputSchema: z.ZodType<Prisma.RubricaHolisticaNameUser_idCompoundUniqueInput> = z.object({
  name: z.string(),
  user_id: z.number()
}).strict();

export const RubricaHolisticaCountOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaHolisticaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaHolisticaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaHolisticaAvgOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaHolisticaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaHolisticaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaHolisticaMinOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaHolisticaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaHolisticaSumOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaHolisticaSumOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaOrderByRelevanceInputSchema: z.ZodType<Prisma.RubricaAnaliticaOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RubricaAnaliticaOrderByRelevanceFieldEnumSchema),z.lazy(() => RubricaAnaliticaOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RubricaAnaliticaNameUser_idCompoundUniqueInputSchema: z.ZodType<Prisma.RubricaAnaliticaNameUser_idCompoundUniqueInput> = z.object({
  name: z.string(),
  user_id: z.number()
}).strict();

export const RubricaAnaliticaCountOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaAnaliticaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaAnaliticaAvgOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaAnaliticaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaMinOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaAnaliticaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaSumOrderByAggregateInputSchema: z.ZodType<Prisma.RubricaAnaliticaSumOrderByAggregateInput> = z.object({
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaScalarRelationFilterSchema: z.ZodType<Prisma.RubricaAnaliticaScalarRelationFilter> = z.object({
  is: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional(),
  isNot: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional()
}).strict();

export const IndicadoresOrderByRelevanceInputSchema: z.ZodType<Prisma.IndicadoresOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => IndicadoresOrderByRelevanceFieldEnumSchema),z.lazy(() => IndicadoresOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const IndicadoresNameRubrica_analitica_idCompoundUniqueInputSchema: z.ZodType<Prisma.IndicadoresNameRubrica_analitica_idCompoundUniqueInput> = z.object({
  name: z.string(),
  rubrica_analitica_id: z.string()
}).strict();

export const IndicadoresCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndicadoresCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndicadoresAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IndicadoresAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndicadoresMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndicadoresMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndicadoresMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndicadoresMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  rubrica_analitica_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IndicadoresSumOrderByAggregateInputSchema: z.ZodType<Prisma.IndicadoresSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTipoNivelFilterSchema: z.ZodType<Prisma.EnumTipoNivelFilter> = z.object({
  equals: z.lazy(() => TipoNivelSchema).optional(),
  in: z.lazy(() => TipoNivelSchema).array().optional(),
  notIn: z.lazy(() => TipoNivelSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => NestedEnumTipoNivelFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IndicadoresNullableScalarRelationFilterSchema: z.ZodType<Prisma.IndicadoresNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => IndicadoresWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => IndicadoresWhereInputSchema).optional().nullable()
}).strict();

export const NivelesDeLogroOrderByRelevanceInputSchema: z.ZodType<Prisma.NivelesDeLogroOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => NivelesDeLogroOrderByRelevanceFieldEnumSchema),z.lazy(() => NivelesDeLogroOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const NivelesDeLogroNameIndicador_idCompoundUniqueInputSchema: z.ZodType<Prisma.NivelesDeLogroNameIndicador_idCompoundUniqueInput> = z.object({
  name: z.string(),
  indicador_id: z.number()
}).strict();

export const NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInputSchema: z.ZodType<Prisma.NivelesDeLogroNameRubrica_holistica_idCompoundUniqueInput> = z.object({
  name: z.string(),
  rubrica_holistica_id: z.string()
}).strict();

export const NivelesDeLogroCountOrderByAggregateInputSchema: z.ZodType<Prisma.NivelesDeLogroCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  criterios: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  nota: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.lazy(() => SortOrderSchema).optional(),
  indicador_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NivelesDeLogroAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NivelesDeLogroAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  indicador_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NivelesDeLogroMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NivelesDeLogroMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  criterios: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  nota: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.lazy(() => SortOrderSchema).optional(),
  indicador_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NivelesDeLogroMinOrderByAggregateInputSchema: z.ZodType<Prisma.NivelesDeLogroMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  criterios: z.lazy(() => SortOrderSchema).optional(),
  tipo: z.lazy(() => SortOrderSchema).optional(),
  nota: z.lazy(() => SortOrderSchema).optional(),
  rubrica_holistica_id: z.lazy(() => SortOrderSchema).optional(),
  indicador_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NivelesDeLogroSumOrderByAggregateInputSchema: z.ZodType<Prisma.NivelesDeLogroSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  indicador_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTipoNivelWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTipoNivelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TipoNivelSchema).optional(),
  in: z.lazy(() => TipoNivelSchema).array().optional(),
  notIn: z.lazy(() => TipoNivelSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => NestedEnumTipoNivelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTipoNivelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTipoNivelFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
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

export const RubricaHolisticaListRelationFilterSchema: z.ZodType<Prisma.RubricaHolisticaListRelationFilter> = z.object({
  every: z.lazy(() => RubricaHolisticaWhereInputSchema).optional(),
  some: z.lazy(() => RubricaHolisticaWhereInputSchema).optional(),
  none: z.lazy(() => RubricaHolisticaWhereInputSchema).optional()
}).strict();

export const RubricaAnaliticaListRelationFilterSchema: z.ZodType<Prisma.RubricaAnaliticaListRelationFilter> = z.object({
  every: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional(),
  some: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional(),
  none: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional()
}).strict();

export const RubricaHolisticaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RubricaHolisticaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RubricaAnaliticaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RubricaAnaliticaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  is_superuser: z.lazy(() => SortOrderSchema).optional(),
  is_staff: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  is_superuser: z.lazy(() => SortOrderSchema).optional(),
  is_staff: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  is_superuser: z.lazy(() => SortOrderSchema).optional(),
  is_staff: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExamenCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.ExamenCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenCreateWithoutCursoInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsuarioCursoCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutCursoInputSchema),z.lazy(() => ExamenCreateWithoutCursoInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsuarioCursoUncheckedCreateNestedManyWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedCreateNestedManyWithoutCursoInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyCursoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
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

export const UsuarioCursoUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioCursoScalarWhereInputSchema),z.lazy(() => UsuarioCursoScalarWhereInputSchema).array() ]).optional(),
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

export const UsuarioCursoUncheckedUpdateManyWithoutCursoNestedInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateManyWithoutCursoNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutCursoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyCursoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutCursoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutCursoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioCursoScalarWhereInputSchema),z.lazy(() => UsuarioCursoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCursosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCursosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCursosInputSchema),z.lazy(() => UserUncheckedCreateWithoutCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCursosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CursoCreateNestedOneWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutUsuariosInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutUsuariosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutUsuariosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutCursosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCursosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCursosInputSchema),z.lazy(() => UserUncheckedCreateWithoutCursosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCursosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCursosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCursosInputSchema),z.lazy(() => UserUpdateWithoutCursosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCursosInputSchema) ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutUsuariosNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutUsuariosNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutUsuariosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutUsuariosInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutUsuariosInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutUsuariosInputSchema),z.lazy(() => CursoUpdateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutUsuariosInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCreateNestedOneWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExamenes_resueltosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_resueltosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExamenes_resueltosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ExamenCreateNestedOneWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenCreateNestedOneWithoutEjecucionesInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutEjecucionesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutEjecucionesInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateNestedOneWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateNestedOneWithoutEjecucion_actual_deInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_actual_deInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_actual_deInputSchema).optional(),
  connect: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutExamenes_resueltosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutExamenes_resueltosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_resueltosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExamenes_resueltosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExamenes_resueltosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUpdateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExamenes_resueltosInputSchema) ]).optional(),
}).strict();

export const ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema: z.ZodType<Prisma.ExamenUpdateOneRequiredWithoutEjecucionesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutEjecucionesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutEjecucionesInputSchema).optional(),
  upsert: z.lazy(() => ExamenUpsertWithoutEjecucionesInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateToOneWithWhereWithoutEjecucionesInputSchema),z.lazy(() => ExamenUpdateWithoutEjecucionesInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutEjecucionesInputSchema) ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUpdateOneWithoutEjecucion_actual_deNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateOneWithoutEjecucion_actual_deNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_actual_deInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_actual_deInputSchema).optional(),
  upsert: z.lazy(() => PreguntasEjecucionExamenUpsertWithoutEjecucion_actual_deInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PreguntasEjecucionExamenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateToOneWithWhereWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_actual_deInputSchema) ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenCreateNestedOneWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenCreateNestedOneWithoutPreguntas_resueltasInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPreguntas_resueltasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutPreguntas_resueltasInputSchema).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional()
}).strict();

export const PreguntaCreateNestedOneWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaCreateNestedOneWithoutPreguntasEjecucionExamenInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutPreguntasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutPreguntasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional()
}).strict();

export const RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => RespuestaWhereUniqueInputSchema).optional()
}).strict();

export const EjecucionExamenCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenCreateNestedOneWithoutPregunta_ejecucion_actualInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutPregunta_ejecucion_actualInputSchema).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateNestedOneWithoutPregunta_ejecucion_actualInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutPregunta_ejecucion_actualInputSchema).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateOneRequiredWithoutPreguntas_resueltasNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateOneRequiredWithoutPreguntas_resueltasNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPreguntas_resueltasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutPreguntas_resueltasInputSchema).optional(),
  upsert: z.lazy(() => EjecucionExamenUpsertWithoutPreguntas_resueltasInputSchema).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateToOneWithWhereWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUpdateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPreguntas_resueltasInputSchema) ]).optional(),
}).strict();

export const PreguntaUpdateOneRequiredWithoutPreguntasEjecucionExamenNestedInputSchema: z.ZodType<Prisma.PreguntaUpdateOneRequiredWithoutPreguntasEjecucionExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutPreguntasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutPreguntasEjecucionExamenInputSchema).optional(),
  upsert: z.lazy(() => PreguntaUpsertWithoutPreguntasEjecucionExamenInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateToOneWithWhereWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUpdateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutPreguntasEjecucionExamenInputSchema) ]).optional(),
}).strict();

export const RespuestaUpdateOneWithoutRespuestasEjecucionExamenNestedInputSchema: z.ZodType<Prisma.RespuestaUpdateOneWithoutRespuestasEjecucionExamenNestedInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema).optional(),
  upsert: z.lazy(() => RespuestaUpsertWithoutRespuestasEjecucionExamenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RespuestaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RespuestaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RespuestaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RespuestaUpdateToOneWithWhereWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUpdateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema) ]).optional(),
}).strict();

export const EjecucionExamenUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateOneWithoutPregunta_ejecucion_actualNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutPregunta_ejecucion_actualInputSchema).optional(),
  upsert: z.lazy(() => EjecucionExamenUpsertWithoutPregunta_ejecucion_actualInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateToOneWithWhereWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUpdateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPregunta_ejecucion_actualInputSchema) ]).optional(),
}).strict();

export const EjecucionExamenUncheckedUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateOneWithoutPregunta_ejecucion_actualNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EjecucionExamenCreateOrConnectWithoutPregunta_ejecucion_actualInputSchema).optional(),
  upsert: z.lazy(() => EjecucionExamenUpsertWithoutPregunta_ejecucion_actualInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EjecucionExamenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EjecucionExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateToOneWithWhereWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUpdateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPregunta_ejecucion_actualInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExamenes_creadosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_creadosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExamenes_creadosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CursoCreateNestedOneWithoutExamenesInputSchema: z.ZodType<Prisma.CursoCreateNestedOneWithoutExamenesInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional()
}).strict();

export const RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateNestedOneWithoutExamenesInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaHolisticaCreateOrConnectWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).optional()
}).strict();

export const RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateNestedOneWithoutExamenesInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).optional()
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

export const EnumTipoExamenFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTipoExamenFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TipoExamenSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutExamenes_creadosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_creadosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExamenes_creadosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExamenes_creadosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutExamenes_creadosInputSchema),z.lazy(() => UserUpdateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExamenes_creadosInputSchema) ]).optional(),
}).strict();

export const CursoUpdateOneRequiredWithoutExamenesNestedInputSchema: z.ZodType<Prisma.CursoUpdateOneRequiredWithoutExamenesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CursoCreateOrConnectWithoutExamenesInputSchema).optional(),
  upsert: z.lazy(() => CursoUpsertWithoutExamenesInputSchema).optional(),
  connect: z.lazy(() => CursoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CursoUpdateToOneWithWhereWithoutExamenesInputSchema),z.lazy(() => CursoUpdateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutExamenesInputSchema) ]).optional(),
}).strict();

export const RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateOneWithoutExamenesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaHolisticaCreateOrConnectWithoutExamenesInputSchema).optional(),
  upsert: z.lazy(() => RubricaHolisticaUpsertWithoutExamenesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateToOneWithWhereWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUpdateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutExamenesInputSchema) ]).optional(),
}).strict();

export const RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateOneWithoutExamenesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutExamenesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutExamenesInputSchema).optional(),
  upsert: z.lazy(() => RubricaAnaliticaUpsertWithoutExamenesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RubricaAnaliticaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RubricaAnaliticaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateToOneWithWhereWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUpdateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutExamenesInputSchema) ]).optional(),
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

export const IndicadoresCreateNestedManyWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresCreateNestedManyWithoutPreguntasInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
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

export const PreguntasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndicadoresUncheckedCreateNestedManyWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUncheckedCreateNestedManyWithoutPreguntasInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema).array(),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => RespuestaCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RespuestaCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RespuestaWhereUniqueInputSchema),z.lazy(() => RespuestaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  increment: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const IndicadoresUpdateManyWithoutPreguntasNestedInputSchema: z.ZodType<Prisma.IndicadoresUpdateManyWithoutPreguntasNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutPreguntasInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutPreguntasInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndicadoresUpdateManyWithWhereWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUpdateManyWithWhereWithoutPreguntasInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndicadoresScalarWhereInputSchema),z.lazy(() => IndicadoresScalarWhereInputSchema).array() ]).optional(),
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

export const PreguntasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyWithoutPreguntaNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndicadoresUncheckedUpdateManyWithoutPreguntasNestedInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateManyWithoutPreguntasNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutPreguntasInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutPreguntasInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutPreguntasInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndicadoresUpdateManyWithWhereWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUpdateManyWithWhereWithoutPreguntasInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndicadoresScalarWhereInputSchema),z.lazy(() => IndicadoresScalarWhereInputSchema).array() ]).optional(),
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

export const PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PreguntaCreateNestedOneWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaCreateNestedOneWithoutRespuestasInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutRespuestasInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateNestedManyWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateNestedManyWithoutRespuestaInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PreguntaUpdateOneRequiredWithoutRespuestasNestedInputSchema: z.ZodType<Prisma.PreguntaUpdateOneRequiredWithoutRespuestasNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PreguntaCreateOrConnectWithoutRespuestasInputSchema).optional(),
  upsert: z.lazy(() => PreguntaUpsertWithoutRespuestasInputSchema).optional(),
  connect: z.lazy(() => PreguntaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateToOneWithWhereWithoutRespuestasInputSchema),z.lazy(() => PreguntaUpdateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutRespuestasInputSchema) ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUpdateManyWithoutRespuestaNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyWithoutRespuestaNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema).array(),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PreguntasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutHistorialInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHistorialInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedCreateWithoutHistorialInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHistorialInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ExamenCreateNestedOneWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenCreateNestedOneWithoutHistorialInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutHistorialInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutHistorialInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutHistorialNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHistorialNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedCreateWithoutHistorialInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHistorialInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHistorialInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHistorialInputSchema),z.lazy(() => UserUpdateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHistorialInputSchema) ]).optional(),
}).strict();

export const ExamenUpdateOneRequiredWithoutHistorialNestedInputSchema: z.ZodType<Prisma.ExamenUpdateOneRequiredWithoutHistorialNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutHistorialInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExamenCreateOrConnectWithoutHistorialInputSchema).optional(),
  upsert: z.lazy(() => ExamenUpsertWithoutHistorialInputSchema).optional(),
  connect: z.lazy(() => ExamenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateToOneWithWhereWithoutHistorialInputSchema),z.lazy(() => ExamenUpdateWithoutHistorialInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutHistorialInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRubricas_holisticasInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_holisticasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRubricas_holisticasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NivelesDeLogroCreateNestedManyWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateNestedManyWithoutRubrica_holisticaInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenCreateNestedManyWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenCreateNestedManyWithoutRubrica_holisticaInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NivelesDeLogroUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedCreateNestedManyWithoutRubrica_holisticaInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateNestedManyWithoutRubrica_holisticaInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRubricas_holisticasNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRubricas_holisticasNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_holisticasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRubricas_holisticasInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRubricas_holisticasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUpdateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRubricas_holisticasInputSchema) ]).optional(),
}).strict();

export const NivelesDeLogroUpdateManyWithoutRubrica_holisticaNestedInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateManyWithoutRubrica_holisticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NivelesDeLogroScalarWhereInputSchema),z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUpdateManyWithoutRubrica_holisticaNestedInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithoutRubrica_holisticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NivelesDeLogroScalarWhereInputSchema),z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutRubrica_holisticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_holisticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_holisticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRubricas_analiticasInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_analiticasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRubricas_analiticasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IndicadoresCreateNestedManyWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresCreateNestedManyWithoutRubrica_analiticaInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndicadoresCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenCreateNestedManyWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenCreateNestedManyWithoutRubrica_analiticaInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndicadoresUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUncheckedCreateNestedManyWithoutRubrica_analiticaInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndicadoresCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateNestedManyWithoutRubrica_analiticaInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRubricas_analiticasNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRubricas_analiticasNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_analiticasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRubricas_analiticasInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRubricas_analiticasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUpdateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRubricas_analiticasInputSchema) ]).optional(),
}).strict();

export const IndicadoresUpdateManyWithoutRubrica_analiticaNestedInputSchema: z.ZodType<Prisma.IndicadoresUpdateManyWithoutRubrica_analiticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndicadoresCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndicadoresUpdateManyWithWhereWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUpdateManyWithWhereWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndicadoresScalarWhereInputSchema),z.lazy(() => IndicadoresScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUpdateManyWithoutRubrica_analiticaNestedInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithoutRubrica_analiticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndicadoresCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndicadoresWhereUniqueInputSchema),z.lazy(() => IndicadoresWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndicadoresUpdateManyWithWhereWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUpdateManyWithWhereWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndicadoresScalarWhereInputSchema),z.lazy(() => IndicadoresScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutRubrica_analiticaNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyRubrica_analiticaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutRubrica_analiticaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RubricaAnaliticaCreateNestedOneWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateNestedOneWithoutIndicadoresInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutIndicadoresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutIndicadoresInputSchema).optional(),
  connect: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).optional()
}).strict();

export const PreguntaCreateNestedManyWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaCreateNestedManyWithoutIndicadoresInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NivelesDeLogroCreateNestedManyWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateNestedManyWithoutIndicadorInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyIndicadorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PreguntaUncheckedCreateNestedManyWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateNestedManyWithoutIndicadoresInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NivelesDeLogroUncheckedCreateNestedManyWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedCreateNestedManyWithoutIndicadorInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyIndicadorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RubricaAnaliticaUpdateOneRequiredWithoutIndicadoresNestedInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateOneRequiredWithoutIndicadoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutIndicadoresInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutIndicadoresInputSchema).optional(),
  upsert: z.lazy(() => RubricaAnaliticaUpsertWithoutIndicadoresInputSchema).optional(),
  connect: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateToOneWithWhereWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUpdateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutIndicadoresInputSchema) ]).optional(),
}).strict();

export const PreguntaUpdateManyWithoutIndicadoresNestedInputSchema: z.ZodType<Prisma.PreguntaUpdateManyWithoutIndicadoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutIndicadoresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutIndicadoresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntaUpdateManyWithWhereWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUpdateManyWithWhereWithoutIndicadoresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntaScalarWhereInputSchema),z.lazy(() => PreguntaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NivelesDeLogroUpdateManyWithoutIndicadorNestedInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateManyWithoutIndicadorNestedInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutIndicadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyIndicadorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutIndicadorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutIndicadorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NivelesDeLogroScalarWhereInputSchema),z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PreguntaUncheckedUpdateManyWithoutIndicadoresNestedInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyWithoutIndicadoresNestedInput> = z.object({
  create: z.union([ z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema).array(),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema),z.lazy(() => PreguntaCreateOrConnectWithoutIndicadoresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUpsertWithWhereUniqueWithoutIndicadoresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PreguntaWhereUniqueInputSchema),z.lazy(() => PreguntaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUpdateWithWhereUniqueWithoutIndicadoresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PreguntaUpdateManyWithWhereWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUpdateManyWithWhereWithoutIndicadoresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PreguntaScalarWhereInputSchema),z.lazy(() => PreguntaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NivelesDeLogroUncheckedUpdateManyWithoutIndicadorNestedInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateManyWithoutIndicadorNestedInput> = z.object({
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema).array(),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUpsertWithWhereUniqueWithoutIndicadorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NivelesDeLogroCreateManyIndicadorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),z.lazy(() => NivelesDeLogroWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUpdateWithWhereUniqueWithoutIndicadorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUpdateManyWithWhereWithoutIndicadorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NivelesDeLogroScalarWhereInputSchema),z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RubricaHolisticaCreateNestedOneWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateNestedOneWithoutNiveles_de_logroInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutNiveles_de_logroInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaHolisticaCreateOrConnectWithoutNiveles_de_logroInputSchema).optional(),
  connect: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).optional()
}).strict();

export const IndicadoresCreateNestedOneWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresCreateNestedOneWithoutNiveles_de_logroInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutNiveles_de_logroInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndicadoresCreateOrConnectWithoutNiveles_de_logroInputSchema).optional(),
  connect: z.lazy(() => IndicadoresWhereUniqueInputSchema).optional()
}).strict();

export const EnumTipoNivelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTipoNivelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TipoNivelSchema).optional()
}).strict();

export const RubricaHolisticaUpdateOneWithoutNiveles_de_logroNestedInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateOneWithoutNiveles_de_logroNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutNiveles_de_logroInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RubricaHolisticaCreateOrConnectWithoutNiveles_de_logroInputSchema).optional(),
  upsert: z.lazy(() => RubricaHolisticaUpsertWithoutNiveles_de_logroInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RubricaHolisticaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateToOneWithWhereWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUpdateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutNiveles_de_logroInputSchema) ]).optional(),
}).strict();

export const IndicadoresUpdateOneWithoutNiveles_de_logroNestedInputSchema: z.ZodType<Prisma.IndicadoresUpdateOneWithoutNiveles_de_logroNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutNiveles_de_logroInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndicadoresCreateOrConnectWithoutNiveles_de_logroInputSchema).optional(),
  upsert: z.lazy(() => IndicadoresUpsertWithoutNiveles_de_logroInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => IndicadoresWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => IndicadoresWhereInputSchema) ]).optional(),
  connect: z.lazy(() => IndicadoresWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IndicadoresUpdateToOneWithWhereWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUpdateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutNiveles_de_logroInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
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

export const RubricaHolisticaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaHolisticaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RubricaAnaliticaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaAnaliticaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistorialCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HistorialCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutUserInputSchema),z.lazy(() => HistorialCreateWithoutUserInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExamenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutUserInputSchema),z.lazy(() => ExamenCreateWithoutUserInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsuarioCursoCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaHolisticaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaAnaliticaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HistorialUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutUserInputSchema),z.lazy(() => HistorialCreateWithoutUserInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutUserInputSchema),z.lazy(() => ExamenCreateWithoutUserInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RubricaHolisticaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RubricaHolisticaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaHolisticaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RubricaHolisticaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RubricaHolisticaScalarWhereInputSchema),z.lazy(() => RubricaHolisticaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RubricaAnaliticaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaAnaliticaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RubricaAnaliticaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RubricaAnaliticaScalarWhereInputSchema),z.lazy(() => RubricaAnaliticaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistorialUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HistorialUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutUserInputSchema),z.lazy(() => HistorialCreateWithoutUserInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistorialUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HistorialUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistorialUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HistorialUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistorialUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HistorialUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistorialScalarWhereInputSchema),z.lazy(() => HistorialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutUserInputSchema),z.lazy(() => ExamenCreateWithoutUserInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EjecucionExamenScalarWhereInputSchema),z.lazy(() => EjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsuarioCursoUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioCursoScalarWhereInputSchema),z.lazy(() => UsuarioCursoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaHolisticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RubricaHolisticaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaHolisticaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),z.lazy(() => RubricaHolisticaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RubricaHolisticaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RubricaHolisticaScalarWhereInputSchema),z.lazy(() => RubricaHolisticaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema).array(),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RubricaAnaliticaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RubricaAnaliticaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RubricaAnaliticaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RubricaAnaliticaScalarWhereInputSchema),z.lazy(() => RubricaAnaliticaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HistorialUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HistorialCreateWithoutUserInputSchema),z.lazy(() => HistorialCreateWithoutUserInputSchema).array(),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema),z.lazy(() => HistorialCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HistorialUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HistorialUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HistorialCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HistorialWhereUniqueInputSchema),z.lazy(() => HistorialWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HistorialUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HistorialUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HistorialUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HistorialUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HistorialScalarWhereInputSchema),z.lazy(() => HistorialScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExamenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExamenCreateWithoutUserInputSchema),z.lazy(() => ExamenCreateWithoutUserInputSchema).array(),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExamenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExamenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExamenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExamenWhereUniqueInputSchema),z.lazy(() => ExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExamenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExamenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExamenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExamenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExamenScalarWhereInputSchema),z.lazy(() => ExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema).array(),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema),z.lazy(() => EjecucionExamenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EjecucionExamenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EjecucionExamenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EjecucionExamenWhereUniqueInputSchema),z.lazy(() => EjecucionExamenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EjecucionExamenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => EjecucionExamenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EjecucionExamenScalarWhereInputSchema),z.lazy(() => EjecucionExamenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema).array(),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsuarioCursoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsuarioCursoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsuarioCursoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsuarioCursoWhereUniqueInputSchema),z.lazy(() => UsuarioCursoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsuarioCursoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsuarioCursoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsuarioCursoScalarWhereInputSchema),z.lazy(() => UsuarioCursoScalarWhereInputSchema).array() ]).optional(),
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

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const NestedEnumTipoExamenFilterSchema: z.ZodType<Prisma.NestedEnumTipoExamenFilter> = z.object({
  equals: z.lazy(() => TipoExamenSchema).optional(),
  in: z.lazy(() => TipoExamenSchema).array().optional(),
  notIn: z.lazy(() => TipoExamenSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => NestedEnumTipoExamenFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTipoExamenWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTipoExamenWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TipoExamenSchema).optional(),
  in: z.lazy(() => TipoExamenSchema).array().optional(),
  notIn: z.lazy(() => TipoExamenSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => NestedEnumTipoExamenWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTipoExamenFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTipoExamenFilterSchema).optional()
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

export const NestedEnumTipoNivelFilterSchema: z.ZodType<Prisma.NestedEnumTipoNivelFilter> = z.object({
  equals: z.lazy(() => TipoNivelSchema).optional(),
  in: z.lazy(() => TipoNivelSchema).array().optional(),
  notIn: z.lazy(() => TipoNivelSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => NestedEnumTipoNivelFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTipoNivelWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTipoNivelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TipoNivelSchema).optional(),
  in: z.lazy(() => TipoNivelSchema).array().optional(),
  notIn: z.lazy(() => TipoNivelSchema).array().optional(),
  not: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => NestedEnumTipoNivelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTipoNivelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTipoNivelFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
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
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
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
  user_id: z.number().int(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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

export const UsuarioCursoCreateWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoCreateWithoutCursoInput> = z.object({
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutCursosInputSchema)
}).strict();

export const UsuarioCursoUncheckedCreateWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedCreateWithoutCursoInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UsuarioCursoCreateOrConnectWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoCreateOrConnectWithoutCursoInput> = z.object({
  where: z.lazy(() => UsuarioCursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const UsuarioCursoCreateManyCursoInputEnvelopeSchema: z.ZodType<Prisma.UsuarioCursoCreateManyCursoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsuarioCursoCreateManyCursoInputSchema),z.lazy(() => UsuarioCursoCreateManyCursoInputSchema).array() ]),
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
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inicio_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => EnumTipoExamenFilterSchema),z.lazy(() => TipoExamenSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UsuarioCursoUpsertWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUpsertWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => UsuarioCursoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsuarioCursoUpdateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedUpdateWithoutCursoInputSchema) ]),
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutCursoInputSchema) ]),
}).strict();

export const UsuarioCursoUpdateWithWhereUniqueWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateWithWhereUniqueWithoutCursoInput> = z.object({
  where: z.lazy(() => UsuarioCursoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsuarioCursoUpdateWithoutCursoInputSchema),z.lazy(() => UsuarioCursoUncheckedUpdateWithoutCursoInputSchema) ]),
}).strict();

export const UsuarioCursoUpdateManyWithWhereWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateManyWithWhereWithoutCursoInput> = z.object({
  where: z.lazy(() => UsuarioCursoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsuarioCursoUpdateManyMutationInputSchema),z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutCursoInputSchema) ]),
}).strict();

export const UsuarioCursoScalarWhereInputSchema: z.ZodType<Prisma.UsuarioCursoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsuarioCursoScalarWhereInputSchema),z.lazy(() => UsuarioCursoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsuarioCursoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsuarioCursoScalarWhereInputSchema),z.lazy(() => UsuarioCursoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  curso_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_instructor: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutCursosInputSchema: z.ZodType<Prisma.UserCreateWithoutCursosInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCursosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCursosInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCursosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCursosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCursosInputSchema),z.lazy(() => UserUncheckedCreateWithoutCursosInputSchema) ]),
}).strict();

export const CursoCreateWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoCreateWithoutUsuariosInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUncheckedCreateWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutUsuariosInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoCreateOrConnectWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutUsuariosInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutUsuariosInputSchema) ]),
}).strict();

export const UserUpsertWithoutCursosInputSchema: z.ZodType<Prisma.UserUpsertWithoutCursosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCursosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCursosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCursosInputSchema),z.lazy(() => UserUncheckedCreateWithoutCursosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCursosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCursosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCursosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCursosInputSchema) ]),
}).strict();

export const UserUpdateWithoutCursosInputSchema: z.ZodType<Prisma.UserUpdateWithoutCursosInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCursosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCursosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CursoUpsertWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoUpsertWithoutUsuariosInput> = z.object({
  update: z.union([ z.lazy(() => CursoUpdateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutUsuariosInputSchema) ]),
  create: z.union([ z.lazy(() => CursoCreateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedCreateWithoutUsuariosInputSchema) ]),
  where: z.lazy(() => CursoWhereInputSchema).optional()
}).strict();

export const CursoUpdateToOneWithWhereWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoUpdateToOneWithWhereWithoutUsuariosInput> = z.object({
  where: z.lazy(() => CursoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CursoUpdateWithoutUsuariosInputSchema),z.lazy(() => CursoUncheckedUpdateWithoutUsuariosInputSchema) ]),
}).strict();

export const CursoUpdateWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoUpdateWithoutUsuariosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateWithoutUsuariosInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutUsuariosInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserCreateWithoutExamenes_resueltosInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutExamenes_resueltosInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExamenes_resueltosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_resueltosInputSchema) ]),
}).strict();

export const ExamenCreateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenCreateWithoutEjecucionesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutEjecucionesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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

export const PreguntasEjecucionExamenCreateWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateWithoutEjecucion_actual_deInput> = z.object({
  id: z.string().uuid().optional(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPreguntas_resueltasInputSchema),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutPreguntasEjecucionExamenInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_actual_deInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_actual_deInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_actual_deInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateWithoutEjecucion_examenInput> = z.object({
  id: z.string().uuid().optional(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutPreguntasEjecucionExamenInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInput> = z.object({
  id: z.string().uuid().optional(),
  pregunta_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateOrConnectWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenCreateManyEjecucion_examenInputEnvelopeSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyEjecucion_examenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateManyEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateManyEjecucion_examenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserUpsertWithoutExamenes_resueltosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExamenes_resueltosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_resueltosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExamenes_resueltosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutExamenes_resueltosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExamenes_resueltosInputSchema) ]),
}).strict();

export const UserUpdateWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserUpdateWithoutExamenes_resueltosInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutExamenes_resueltosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutExamenes_resueltosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutEjecucionesInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutEjecucionesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUpsertWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpsertWithoutEjecucion_actual_deInput> = z.object({
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_actual_deInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_actual_deInputSchema) ]),
  where: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUpdateToOneWithWhereWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateToOneWithWhereWithoutEjecucion_actual_deInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutEjecucion_actual_deInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_actual_deInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithoutEjecucion_actual_deInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutPreguntas_resueltasNestedInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutPreguntasEjecucionExamenNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneWithoutRespuestasEjecucionExamenNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_actual_deInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_actual_deInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutEjecucion_examenInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyWithWhereWithoutEjecucion_examenInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenScalarWhereInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ejecucion_examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  respuesta_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inicio: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  final: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EjecucionExamenCreateWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenCreateWithoutPreguntas_resueltasInput> = z.object({
  id: z.string().uuid().optional(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_resueltosInputSchema),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutEjecucionesInputSchema),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenCreateNestedOneWithoutEjecucion_actual_deInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateWithoutPreguntas_resueltasInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  examen_id: z.string(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenCreateOrConnectWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenCreateOrConnectWithoutPreguntas_resueltasInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPreguntas_resueltasInputSchema) ]),
}).strict();

export const PreguntaCreateWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaCreateWithoutPreguntasEjecucionExamenInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutPreguntasInputSchema).optional(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutPreguntasEjecucionExamenInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  examen_id: z.string(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutPreguntasInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaCreateOrConnectWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaCreateOrConnectWithoutPreguntasEjecucionExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutPreguntasEjecucionExamenInputSchema) ]),
}).strict();

export const RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaCreateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutRespuestasInputSchema)
}).strict();

export const RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  pregunta_id: z.string()
}).strict();

export const RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaCreateOrConnectWithoutRespuestasEjecucionExamenInput> = z.object({
  where: z.lazy(() => RespuestaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestaCreateWithoutRespuestasEjecucionExamenInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutRespuestasEjecucionExamenInputSchema) ]),
}).strict();

export const EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenCreateWithoutPregunta_ejecucion_actualInput> = z.object({
  id: z.string().uuid().optional(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_resueltosInputSchema),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutEjecucionesInputSchema),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  examen_id: z.string(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenCreateOrConnectWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenCreateOrConnectWithoutPregunta_ejecucion_actualInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema) ]),
}).strict();

export const EjecucionExamenUpsertWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenUpsertWithoutPreguntas_resueltasInput> = z.object({
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPreguntas_resueltasInputSchema) ]),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPreguntas_resueltasInputSchema) ]),
  where: z.lazy(() => EjecucionExamenWhereInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateToOneWithWhereWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateToOneWithWhereWithoutPreguntas_resueltasInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutPreguntas_resueltasInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPreguntas_resueltasInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithoutPreguntas_resueltasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_resueltosNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema).optional(),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenUpdateOneWithoutEjecucion_actual_deNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateWithoutPreguntas_resueltasInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateWithoutPreguntas_resueltasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaUpsertWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUpsertWithoutPreguntasEjecucionExamenInput> = z.object({
  update: z.union([ z.lazy(() => PreguntaUpdateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutPreguntasEjecucionExamenInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutPreguntasEjecucionExamenInputSchema) ]),
  where: z.lazy(() => PreguntaWhereInputSchema).optional()
}).strict();

export const PreguntaUpdateToOneWithWhereWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateToOneWithWhereWithoutPreguntasEjecucionExamenInput> = z.object({
  where: z.lazy(() => PreguntaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PreguntaUpdateWithoutPreguntasEjecucionExamenInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutPreguntasEjecucionExamenInputSchema) ]),
}).strict();

export const PreguntaUpdateWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateWithoutPreguntasEjecucionExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutPreguntasEjecucionExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutPreguntasEjecucionExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutPreguntasNestedInputSchema).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutRespuestasNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateWithoutRespuestasEjecucionExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EjecucionExamenUpsertWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenUpsertWithoutPregunta_ejecucion_actualInput> = z.object({
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPregunta_ejecucion_actualInputSchema) ]),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutPregunta_ejecucion_actualInputSchema) ]),
  where: z.lazy(() => EjecucionExamenWhereInputSchema).optional()
}).strict();

export const EjecucionExamenUpdateToOneWithWhereWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateToOneWithWhereWithoutPregunta_ejecucion_actualInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutPregunta_ejecucion_actualInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutPregunta_ejecucion_actualInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithoutPregunta_ejecucion_actualInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_resueltosNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateWithoutPregunta_ejecucion_actualInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateWithoutPregunta_ejecucion_actualInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserCreateWithoutExamenes_creadosInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutExamenes_creadosInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExamenes_creadosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_creadosInputSchema) ]),
}).strict();

export const CursoCreateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoCreateWithoutExamenesInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  usuarios: z.lazy(() => UsuarioCursoCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoUncheckedCreateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUncheckedCreateWithoutExamenesInput> = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  usuarios: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutCursoInputSchema).optional()
}).strict();

export const CursoCreateOrConnectWithoutExamenesInputSchema: z.ZodType<Prisma.CursoCreateOrConnectWithoutExamenesInput> = z.object({
  where: z.lazy(() => CursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CursoCreateWithoutExamenesInputSchema),z.lazy(() => CursoUncheckedCreateWithoutExamenesInputSchema) ]),
}).strict();

export const RubricaHolisticaCreateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateWithoutExamenesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRubricas_holisticasInputSchema),
  niveles_de_logro: z.lazy(() => NivelesDeLogroCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedCreateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedCreateWithoutExamenesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaCreateOrConnectWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateOrConnectWithoutExamenesInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutExamenesInputSchema) ]),
}).strict();

export const RubricaAnaliticaCreateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateWithoutExamenesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRubricas_analiticasInputSchema),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedCreateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedCreateWithoutExamenesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaCreateOrConnectWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateOrConnectWithoutExamenesInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutExamenesInputSchema) ]),
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
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutPreguntasInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutPreguntasInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
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
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutHistorialInputSchema)
}).strict();

export const HistorialUncheckedCreateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
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
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_resueltosInputSchema),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenCreateNestedOneWithoutEjecucion_actual_deInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateWithoutExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenCreateOrConnectWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenCreateOrConnectWithoutExamenInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutExamenInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutExamenInputSchema) ]),
}).strict();

export const EjecucionExamenCreateManyExamenInputEnvelopeSchema: z.ZodType<Prisma.EjecucionExamenCreateManyExamenInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EjecucionExamenCreateManyExamenInputSchema),z.lazy(() => EjecucionExamenCreateManyExamenInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserUpsertWithoutExamenes_creadosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExamenes_creadosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedCreateWithoutExamenes_creadosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExamenes_creadosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutExamenes_creadosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExamenes_creadosInputSchema) ]),
}).strict();

export const UserUpdateWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserUpdateWithoutExamenes_creadosInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutExamenes_creadosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutExamenes_creadosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  usuarios: z.lazy(() => UsuarioCursoUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const CursoUncheckedUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.CursoUncheckedUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  usuarios: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutCursoNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaUpsertWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaUpsertWithoutExamenesInput> = z.object({
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutExamenesInputSchema) ]),
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutExamenesInputSchema) ]),
  where: z.lazy(() => RubricaHolisticaWhereInputSchema).optional()
}).strict();

export const RubricaHolisticaUpdateToOneWithWhereWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateToOneWithWhereWithoutExamenesInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RubricaHolisticaUpdateWithoutExamenesInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutExamenesInputSchema) ]),
}).strict();

export const RubricaHolisticaUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRubricas_holisticasNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaUpsertWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpsertWithoutExamenesInput> = z.object({
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutExamenesInputSchema) ]),
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutExamenesInputSchema) ]),
  where: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional()
}).strict();

export const RubricaAnaliticaUpdateToOneWithWhereWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateToOneWithWhereWithoutExamenesInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithoutExamenesInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutExamenesInputSchema) ]),
}).strict();

export const RubricaAnaliticaUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRubricas_analiticasNestedInputSchema).optional(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedUpdateWithoutExamenesInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateWithoutExamenesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
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
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  puntos: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  duracion: z.union([ z.lazy(() => DecimalNullableFilterSchema),z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional().nullable(),
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
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
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
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  examen_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fin_examen: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const IndicadoresCreateWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresCreateWithoutPreguntasInput> = z.object({
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutIndicadoresInputSchema),
  niveles_de_logro: z.lazy(() => NivelesDeLogroCreateNestedManyWithoutIndicadorInputSchema).optional()
}).strict();

export const IndicadoresUncheckedCreateWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUncheckedCreateWithoutPreguntasInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rubrica_analitica_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedCreateNestedManyWithoutIndicadorInputSchema).optional()
}).strict();

export const IndicadoresCreateOrConnectWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresCreateOrConnectWithoutPreguntasInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema) ]),
}).strict();

export const ExamenCreateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenCreateWithoutPreguntasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutPreguntasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaUncheckedCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedCreateWithoutPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutRespuestaInputSchema).optional()
}).strict();

export const RespuestaCreateOrConnectWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaCreateOrConnectWithoutPreguntaInput> = z.object({
  where: z.lazy(() => RespuestaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RespuestaCreateWithoutPreguntaInputSchema),z.lazy(() => RespuestaUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const RespuestaCreateManyPreguntaInputEnvelopeSchema: z.ZodType<Prisma.RespuestaCreateManyPreguntaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RespuestaCreateManyPreguntaInputSchema),z.lazy(() => RespuestaCreateManyPreguntaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateWithoutPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPreguntas_resueltasInputSchema),
  respuesta: z.lazy(() => RespuestaCreateNestedOneWithoutRespuestasEjecucionExamenInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateOrConnectWithoutPreguntaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenCreateManyPreguntaInputEnvelopeSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyPreguntaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateManyPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateManyPreguntaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const IndicadoresUpsertWithWhereUniqueWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUpsertWithWhereUniqueWithoutPreguntasInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndicadoresUpdateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutPreguntasInputSchema) ]),
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutPreguntasInputSchema) ]),
}).strict();

export const IndicadoresUpdateWithWhereUniqueWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUpdateWithWhereUniqueWithoutPreguntasInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndicadoresUpdateWithoutPreguntasInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutPreguntasInputSchema) ]),
}).strict();

export const IndicadoresUpdateManyWithWhereWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUpdateManyWithWhereWithoutPreguntasInput> = z.object({
  where: z.lazy(() => IndicadoresScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndicadoresUpdateManyMutationInputSchema),z.lazy(() => IndicadoresUncheckedUpdateManyWithoutPreguntasInputSchema) ]),
}).strict();

export const IndicadoresScalarWhereInputSchema: z.ZodType<Prisma.IndicadoresScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndicadoresScalarWhereInputSchema),z.lazy(() => IndicadoresScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndicadoresScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndicadoresScalarWhereInputSchema),z.lazy(() => IndicadoresScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rubrica_analitica_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutPreguntasInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutPreguntasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  respuesta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  img: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  video: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  correcta: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pregunta_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutPreguntaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutPreguntaInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutPreguntaInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutPreguntaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutPreguntaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutPreguntaInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyWithWhereWithoutPreguntaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaInputSchema) ]),
}).strict();

export const PreguntaCreateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaCreateWithoutRespuestasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutPreguntasInputSchema).optional(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutRespuestasInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  examen_id: z.string(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutPreguntasInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaCreateOrConnectWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaCreateOrConnectWithoutRespuestasInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutRespuestasInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutRespuestasInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateWithoutRespuestaInput> = z.object({
  id: z.string().uuid().optional(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPreguntas_resueltasInputSchema),
  pregunta: z.lazy(() => PreguntaCreateNestedOneWithoutPreguntasEjecucionExamenInputSchema),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.string(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedCreateNestedOneWithoutPregunta_ejecucion_actualInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateOrConnectWithoutRespuestaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenCreateManyRespuestaInputEnvelopeSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyRespuestaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateManyRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenCreateManyRespuestaInputSchema).array() ]),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutRespuestasInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutRespuestasInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpsertWithWhereUniqueWithoutRespuestaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutRespuestaInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntasEjecucionExamenCreateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedCreateWithoutRespuestaInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithWhereUniqueWithoutRespuestaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateWithoutRespuestaInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateWithoutRespuestaInputSchema) ]),
}).strict();

export const PreguntasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyWithWhereWithoutRespuestaInput> = z.object({
  where: z.lazy(() => PreguntasEjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PreguntasEjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaInputSchema) ]),
}).strict();

export const UserCreateWithoutHistorialInputSchema: z.ZodType<Prisma.UserCreateWithoutHistorialInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHistorialInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHistorialInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHistorialInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHistorialInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedCreateWithoutHistorialInputSchema) ]),
}).strict();

export const ExamenCreateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenCreateWithoutHistorialInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutHistorialInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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

export const UserUpsertWithoutHistorialInputSchema: z.ZodType<Prisma.UserUpsertWithoutHistorialInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHistorialInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedCreateWithoutHistorialInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHistorialInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHistorialInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHistorialInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHistorialInputSchema) ]),
}).strict();

export const UserUpdateWithoutHistorialInputSchema: z.ZodType<Prisma.UserUpdateWithoutHistorialInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHistorialInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHistorialInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutHistorialInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutHistorialInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserCreateWithoutRubricas_holisticasInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRubricas_holisticasInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRubricas_holisticasInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_holisticasInputSchema) ]),
}).strict();

export const NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateWithoutRubrica_holisticaInput> = z.object({
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  indicador: z.lazy(() => IndicadoresCreateNestedOneWithoutNiveles_de_logroInputSchema).optional()
}).strict();

export const NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  indicador_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateOrConnectWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const NivelesDeLogroCreateManyRubrica_holisticaInputEnvelopeSchema: z.ZodType<Prisma.NivelesDeLogroCreateManyRubrica_holisticaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NivelesDeLogroCreateManyRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroCreateManyRubrica_holisticaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenCreateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenCreateWithoutRubrica_holisticaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutRubrica_holisticaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_analitica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const ExamenCreateManyRubrica_holisticaInputEnvelopeSchema: z.ZodType<Prisma.ExamenCreateManyRubrica_holisticaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExamenCreateManyRubrica_holisticaInputSchema),z.lazy(() => ExamenCreateManyRubrica_holisticaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserUpsertWithoutRubricas_holisticasInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRubricas_holisticasInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_holisticasInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRubricas_holisticasInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRubricas_holisticasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRubricas_holisticasInputSchema) ]),
}).strict();

export const UserUpdateWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserUpdateWithoutRubricas_holisticasInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRubricas_holisticasInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRubricas_holisticasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_analiticas: z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const NivelesDeLogroUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUpsertWithWhereUniqueWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NivelesDeLogroUpdateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedUpdateWithoutRubrica_holisticaInputSchema) ]),
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const NivelesDeLogroUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateWithWhereUniqueWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NivelesDeLogroUpdateWithoutRubrica_holisticaInputSchema),z.lazy(() => NivelesDeLogroUncheckedUpdateWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const NivelesDeLogroUpdateManyWithWhereWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateManyWithWhereWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => NivelesDeLogroScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NivelesDeLogroUpdateManyMutationInputSchema),z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const NivelesDeLogroScalarWhereInputSchema: z.ZodType<Prisma.NivelesDeLogroScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NivelesDeLogroScalarWhereInputSchema),z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NivelesDeLogroScalarWhereInputSchema),z.lazy(() => NivelesDeLogroScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  criterios: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tipo: z.union([ z.lazy(() => EnumTipoNivelFilterSchema),z.lazy(() => TipoNivelSchema) ]).optional(),
  nota: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rubrica_holistica_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  indicador_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ExamenUpsertWithWhereUniqueWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUpsertWithWhereUniqueWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExamenUpdateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutRubrica_holisticaInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const ExamenUpdateWithWhereUniqueWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUpdateWithWhereUniqueWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutRubrica_holisticaInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const ExamenUpdateManyWithWhereWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithWhereWithoutRubrica_holisticaInput> = z.object({
  where: z.lazy(() => ExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateManyMutationInputSchema),z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_holisticaInputSchema) ]),
}).strict();

export const UserCreateWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserCreateWithoutRubricas_analiticasInput> = z.object({
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRubricas_analiticasInput> = z.object({
  id: z.number().int().optional(),
  is_superuser: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  is_active: z.boolean().optional(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRubricas_analiticasInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_analiticasInputSchema) ]),
}).strict();

export const IndicadoresCreateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresCreateWithoutRubrica_analiticaInput> = z.object({
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutIndicadoresInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroCreateNestedManyWithoutIndicadorInputSchema).optional()
}).strict();

export const IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUncheckedCreateWithoutRubrica_analiticaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutIndicadoresInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedCreateNestedManyWithoutIndicadorInputSchema).optional()
}).strict();

export const IndicadoresCreateOrConnectWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresCreateOrConnectWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const IndicadoresCreateManyRubrica_analiticaInputEnvelopeSchema: z.ZodType<Prisma.IndicadoresCreateManyRubrica_analiticaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndicadoresCreateManyRubrica_analiticaInputSchema),z.lazy(() => IndicadoresCreateManyRubrica_analiticaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenCreateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenCreateWithoutRubrica_analiticaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutRubrica_analiticaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const ExamenCreateManyRubrica_analiticaInputEnvelopeSchema: z.ZodType<Prisma.ExamenCreateManyRubrica_analiticaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExamenCreateManyRubrica_analiticaInputSchema),z.lazy(() => ExamenCreateManyRubrica_analiticaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserUpsertWithoutRubricas_analiticasInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRubricas_analiticasInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedCreateWithoutRubricas_analiticasInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRubricas_analiticasInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRubricas_analiticasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRubricas_analiticasInputSchema) ]),
}).strict();

export const UserUpdateWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserUpdateWithoutRubricas_analiticasInput> = z.object({
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRubricas_analiticasInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRubricas_analiticasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_superuser: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_staff: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubricas_holisticas: z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_creados: z.lazy(() => ExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  examenes_resueltos: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  cursos: z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const IndicadoresUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUpsertWithWhereUniqueWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndicadoresUpdateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutRubrica_analiticaInputSchema) ]),
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const IndicadoresUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUpdateWithWhereUniqueWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndicadoresUpdateWithoutRubrica_analiticaInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const IndicadoresUpdateManyWithWhereWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUpdateManyWithWhereWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => IndicadoresScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndicadoresUpdateManyMutationInputSchema),z.lazy(() => IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const ExamenUpsertWithWhereUniqueWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUpsertWithWhereUniqueWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExamenUpdateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutRubrica_analiticaInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const ExamenUpdateWithWhereUniqueWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUpdateWithWhereUniqueWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutRubrica_analiticaInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const ExamenUpdateManyWithWhereWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithWhereWithoutRubrica_analiticaInput> = z.object({
  where: z.lazy(() => ExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateManyMutationInputSchema),z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_analiticaInputSchema) ]),
}).strict();

export const RubricaAnaliticaCreateWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateWithoutIndicadoresInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRubricas_analiticasInputSchema),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedCreateWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedCreateWithoutIndicadoresInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaCreateOrConnectWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateOrConnectWithoutIndicadoresInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutIndicadoresInputSchema) ]),
}).strict();

export const PreguntaCreateWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaCreateWithoutIndicadoresInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutPreguntasInputSchema),
  respuestas: z.lazy(() => RespuestaCreateNestedManyWithoutPreguntaInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaUncheckedCreateWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUncheckedCreateWithoutIndicadoresInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  examen_id: z.string(),
  respuestas: z.lazy(() => RespuestaUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutPreguntaInputSchema).optional()
}).strict();

export const PreguntaCreateOrConnectWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaCreateOrConnectWithoutIndicadoresInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema) ]),
}).strict();

export const NivelesDeLogroCreateWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateWithoutIndicadorInput> = z.object({
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutNiveles_de_logroInputSchema).optional()
}).strict();

export const NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedCreateWithoutIndicadorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  rubrica_holistica_id: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const NivelesDeLogroCreateOrConnectWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateOrConnectWithoutIndicadorInput> = z.object({
  where: z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema) ]),
}).strict();

export const NivelesDeLogroCreateManyIndicadorInputEnvelopeSchema: z.ZodType<Prisma.NivelesDeLogroCreateManyIndicadorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NivelesDeLogroCreateManyIndicadorInputSchema),z.lazy(() => NivelesDeLogroCreateManyIndicadorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RubricaAnaliticaUpsertWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpsertWithoutIndicadoresInput> = z.object({
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutIndicadoresInputSchema) ]),
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutIndicadoresInputSchema) ]),
  where: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional()
}).strict();

export const RubricaAnaliticaUpdateToOneWithWhereWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateToOneWithWhereWithoutIndicadoresInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithoutIndicadoresInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutIndicadoresInputSchema) ]),
}).strict();

export const RubricaAnaliticaUpdateWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateWithoutIndicadoresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRubricas_analiticasNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedUpdateWithoutIndicadoresInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateWithoutIndicadoresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const PreguntaUpsertWithWhereUniqueWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUpsertWithWhereUniqueWithoutIndicadoresInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PreguntaUpdateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutIndicadoresInputSchema) ]),
  create: z.union([ z.lazy(() => PreguntaCreateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedCreateWithoutIndicadoresInputSchema) ]),
}).strict();

export const PreguntaUpdateWithWhereUniqueWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUpdateWithWhereUniqueWithoutIndicadoresInput> = z.object({
  where: z.lazy(() => PreguntaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PreguntaUpdateWithoutIndicadoresInputSchema),z.lazy(() => PreguntaUncheckedUpdateWithoutIndicadoresInputSchema) ]),
}).strict();

export const PreguntaUpdateManyWithWhereWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUpdateManyWithWhereWithoutIndicadoresInput> = z.object({
  where: z.lazy(() => PreguntaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PreguntaUpdateManyMutationInputSchema),z.lazy(() => PreguntaUncheckedUpdateManyWithoutIndicadoresInputSchema) ]),
}).strict();

export const NivelesDeLogroUpsertWithWhereUniqueWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUpsertWithWhereUniqueWithoutIndicadorInput> = z.object({
  where: z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NivelesDeLogroUpdateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedUpdateWithoutIndicadorInputSchema) ]),
  create: z.union([ z.lazy(() => NivelesDeLogroCreateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedCreateWithoutIndicadorInputSchema) ]),
}).strict();

export const NivelesDeLogroUpdateWithWhereUniqueWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateWithWhereUniqueWithoutIndicadorInput> = z.object({
  where: z.lazy(() => NivelesDeLogroWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NivelesDeLogroUpdateWithoutIndicadorInputSchema),z.lazy(() => NivelesDeLogroUncheckedUpdateWithoutIndicadorInputSchema) ]),
}).strict();

export const NivelesDeLogroUpdateManyWithWhereWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateManyWithWhereWithoutIndicadorInput> = z.object({
  where: z.lazy(() => NivelesDeLogroScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NivelesDeLogroUpdateManyMutationInputSchema),z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutIndicadorInputSchema) ]),
}).strict();

export const RubricaHolisticaCreateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateWithoutNiveles_de_logroInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRubricas_holisticasInputSchema),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedCreateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedCreateWithoutNiveles_de_logroInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  user_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaCreateOrConnectWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateOrConnectWithoutNiveles_de_logroInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutNiveles_de_logroInputSchema) ]),
}).strict();

export const IndicadoresCreateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresCreateWithoutNiveles_de_logroInput> = z.object({
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutIndicadoresInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutIndicadoresInputSchema).optional()
}).strict();

export const IndicadoresUncheckedCreateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresUncheckedCreateWithoutNiveles_de_logroInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rubrica_analitica_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutIndicadoresInputSchema).optional()
}).strict();

export const IndicadoresCreateOrConnectWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresCreateOrConnectWithoutNiveles_de_logroInput> = z.object({
  where: z.lazy(() => IndicadoresWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutNiveles_de_logroInputSchema) ]),
}).strict();

export const RubricaHolisticaUpsertWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaUpsertWithoutNiveles_de_logroInput> = z.object({
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutNiveles_de_logroInputSchema) ]),
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutNiveles_de_logroInputSchema) ]),
  where: z.lazy(() => RubricaHolisticaWhereInputSchema).optional()
}).strict();

export const RubricaHolisticaUpdateToOneWithWhereWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateToOneWithWhereWithoutNiveles_de_logroInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RubricaHolisticaUpdateWithoutNiveles_de_logroInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutNiveles_de_logroInputSchema) ]),
}).strict();

export const RubricaHolisticaUpdateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateWithoutNiveles_de_logroInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRubricas_holisticasNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedUpdateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateWithoutNiveles_de_logroInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const IndicadoresUpsertWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresUpsertWithoutNiveles_de_logroInput> = z.object({
  update: z.union([ z.lazy(() => IndicadoresUpdateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutNiveles_de_logroInputSchema) ]),
  create: z.union([ z.lazy(() => IndicadoresCreateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedCreateWithoutNiveles_de_logroInputSchema) ]),
  where: z.lazy(() => IndicadoresWhereInputSchema).optional()
}).strict();

export const IndicadoresUpdateToOneWithWhereWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresUpdateToOneWithWhereWithoutNiveles_de_logroInput> = z.object({
  where: z.lazy(() => IndicadoresWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IndicadoresUpdateWithoutNiveles_de_logroInputSchema),z.lazy(() => IndicadoresUncheckedUpdateWithoutNiveles_de_logroInputSchema) ]),
}).strict();

export const IndicadoresUpdateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresUpdateWithoutNiveles_de_logroInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneRequiredWithoutIndicadoresNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutIndicadoresNestedInputSchema).optional()
}).strict();

export const IndicadoresUncheckedUpdateWithoutNiveles_de_logroInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateWithoutNiveles_de_logroInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutIndicadoresNestedInputSchema).optional()
}).strict();

export const ExamenCreateWithoutStateInputSchema: z.ZodType<Prisma.ExamenCreateWithoutStateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutExamenes_creadosInputSchema),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutStateInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutStateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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

export const RubricaHolisticaCreateWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroCreateNestedManyWithoutRubrica_holisticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutRubrica_holisticaInputSchema).optional()
}).strict();

export const RubricaHolisticaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RubricaHolisticaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RubricaHolisticaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RubricaHolisticaCreateManyUserInputSchema),z.lazy(() => RubricaHolisticaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RubricaAnaliticaCreateWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  indicadores: z.lazy(() => IndicadoresCreateNestedManyWithoutRubrica_analiticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedCreateNestedManyWithoutRubrica_analiticaInputSchema).optional()
}).strict();

export const RubricaAnaliticaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RubricaAnaliticaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RubricaAnaliticaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RubricaAnaliticaCreateManyUserInputSchema),z.lazy(() => RubricaAnaliticaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HistorialCreateWithoutUserInputSchema: z.ZodType<Prisma.HistorialCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutHistorialInputSchema)
}).strict();

export const HistorialUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.HistorialUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.HistorialCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => HistorialWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HistorialCreateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HistorialCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.HistorialCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HistorialCreateManyUserInputSchema),z.lazy(() => HistorialCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExamenCreateWithoutUserInputSchema: z.ZodType<Prisma.ExamenCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutExamenesInputSchema),
  rubrica_holistica: z.lazy(() => RubricaHolisticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaCreateNestedOneWithoutExamenesInputSchema).optional(),
  state: z.lazy(() => StateCreateNestedOneWithoutExamenesInputSchema),
  preguntas: z.lazy(() => PreguntaCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ExamenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedCreateNestedManyWithoutExamenInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedCreateNestedManyWithoutExamenInputSchema).optional()
}).strict();

export const ExamenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ExamenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExamenCreateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExamenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ExamenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExamenCreateManyUserInputSchema),z.lazy(() => ExamenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EjecucionExamenCreateWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  examen: z.lazy(() => ExamenCreateNestedOneWithoutEjecucionesInputSchema),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenCreateNestedOneWithoutEjecucion_actual_deInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  examen_id: z.string(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedCreateNestedManyWithoutEjecucion_examenInputSchema).optional()
}).strict();

export const EjecucionExamenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EjecucionExamenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.EjecucionExamenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EjecucionExamenCreateManyUserInputSchema),z.lazy(() => EjecucionExamenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsuarioCursoCreateWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoCreateWithoutUserInput> = z.object({
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  curso: z.lazy(() => CursoCreateNestedOneWithoutUsuariosInputSchema)
}).strict();

export const UsuarioCursoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  curso_id: z.string(),
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UsuarioCursoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UsuarioCursoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsuarioCursoCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UsuarioCursoCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsuarioCursoCreateManyUserInputSchema),z.lazy(() => UsuarioCursoCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RubricaHolisticaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RubricaHolisticaUpdateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RubricaHolisticaCreateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RubricaHolisticaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaHolisticaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RubricaHolisticaUpdateWithoutUserInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RubricaHolisticaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaHolisticaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RubricaHolisticaUpdateManyMutationInputSchema),z.lazy(() => RubricaHolisticaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RubricaHolisticaScalarWhereInputSchema: z.ZodType<Prisma.RubricaHolisticaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RubricaHolisticaScalarWhereInputSchema),z.lazy(() => RubricaHolisticaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaHolisticaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaHolisticaScalarWhereInputSchema),z.lazy(() => RubricaHolisticaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const RubricaAnaliticaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RubricaAnaliticaCreateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RubricaAnaliticaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RubricaAnaliticaUpdateWithoutUserInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RubricaAnaliticaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RubricaAnaliticaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RubricaAnaliticaUpdateManyMutationInputSchema),z.lazy(() => RubricaAnaliticaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RubricaAnaliticaScalarWhereInputSchema: z.ZodType<Prisma.RubricaAnaliticaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RubricaAnaliticaScalarWhereInputSchema),z.lazy(() => RubricaAnaliticaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RubricaAnaliticaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RubricaAnaliticaScalarWhereInputSchema),z.lazy(() => RubricaAnaliticaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const HistorialUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HistorialUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HistorialWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HistorialUpdateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => HistorialCreateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HistorialUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HistorialUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HistorialWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HistorialUpdateWithoutUserInputSchema),z.lazy(() => HistorialUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const HistorialUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.HistorialUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => HistorialScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HistorialUpdateManyMutationInputSchema),z.lazy(() => HistorialUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ExamenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExamenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExamenUpdateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ExamenCreateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExamenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExamenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateWithoutUserInputSchema),z.lazy(() => ExamenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ExamenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ExamenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExamenUpdateManyMutationInputSchema),z.lazy(() => ExamenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const EjecucionExamenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EjecucionExamenCreateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => EjecucionExamenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateWithoutUserInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const EjecucionExamenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => EjecucionExamenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EjecucionExamenUpdateManyMutationInputSchema),z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UsuarioCursoUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsuarioCursoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsuarioCursoUpdateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UsuarioCursoCreateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsuarioCursoUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsuarioCursoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsuarioCursoUpdateWithoutUserInputSchema),z.lazy(() => UsuarioCursoUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UsuarioCursoUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UsuarioCursoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsuarioCursoUpdateManyMutationInputSchema),z.lazy(() => UsuarioCursoUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ExamenCreateManyCursoInputSchema: z.ZodType<Prisma.ExamenCreateManyCursoInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UsuarioCursoCreateManyCursoInputSchema: z.ZodType<Prisma.UsuarioCursoCreateManyCursoInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  is_instructor: z.boolean().optional(),
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
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
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoUpdateWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateWithoutCursoInput> = z.object({
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCursosNestedInputSchema).optional()
}).strict();

export const UsuarioCursoUncheckedUpdateWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateWithoutCursoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoUncheckedUpdateManyWithoutCursoInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateManyWithoutCursoInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenCreateManyEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyEjecucion_examenInput> = z.object({
  id: z.string().uuid().optional(),
  pregunta_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntasEjecucionExamenUpdateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithoutEjecucion_examenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutPreguntasEjecucionExamenNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneWithoutRespuestasEjecucionExamenNestedInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateWithoutEjecucion_examenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntaCreateManyExamenInputSchema: z.ZodType<Prisma.PreguntaCreateManyExamenInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  puntos: z.number().int().optional(),
  duracion: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable()
}).strict();

export const HistorialCreateManyExamenInputSchema: z.ZodType<Prisma.HistorialCreateManyExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenCreateManyExamenInputSchema: z.ZodType<Prisma.EjecucionExamenCreateManyExamenInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.number().int(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntaUpdateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateManyWithoutExamenInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUpdateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHistorialNestedInputSchema).optional()
}).strict();

export const HistorialUncheckedUpdateWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUncheckedUpdateManyWithoutExamenInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenUpdateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_resueltosNestedInputSchema).optional(),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenUpdateOneWithoutEjecucion_actual_deNestedInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateManyWithoutExamenInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyWithoutExamenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestaCreateManyPreguntaInputSchema: z.ZodType<Prisma.RespuestaCreateManyPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  respuesta: z.string(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  correcta: z.boolean().optional()
}).strict();

export const PreguntasEjecucionExamenCreateManyPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyPreguntaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  respuesta_id: z.string().optional().nullable(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const IndicadoresUpdateWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUpdateWithoutPreguntasInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneRequiredWithoutIndicadoresNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUpdateManyWithoutIndicadorNestedInputSchema).optional()
}).strict();

export const IndicadoresUncheckedUpdateWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateWithoutPreguntasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutIndicadorNestedInputSchema).optional()
}).strict();

export const IndicadoresUncheckedUpdateManyWithoutPreguntasInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateManyWithoutPreguntasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RespuestaUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  respuestasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaNestedInputSchema).optional()
}).strict();

export const RespuestaUncheckedUpdateManyWithoutPreguntaInputSchema: z.ZodType<Prisma.RespuestaUncheckedUpdateManyWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  correcta: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PreguntasEjecucionExamenUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutPreguntas_resueltasNestedInputSchema).optional(),
  respuesta: z.lazy(() => RespuestaUpdateOneWithoutRespuestasEjecucionExamenNestedInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuesta_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PreguntasEjecucionExamenCreateManyRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyRespuestaInput> = z.object({
  id: z.string().uuid().optional(),
  ejecucion_examen_id: z.string(),
  pregunta_id: z.string(),
  inicio: z.coerce.date().optional().nullable(),
  final: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntasEjecucionExamenUpdateWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateWithoutRespuestaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_examen: z.lazy(() => EjecucionExamenUpdateOneRequiredWithoutPreguntas_resueltasNestedInputSchema).optional(),
  pregunta: z.lazy(() => PreguntaUpdateOneRequiredWithoutPreguntasEjecucionExamenNestedInputSchema).optional(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateWithoutRespuestaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ejecucion_actual_de: z.lazy(() => EjecucionExamenUncheckedUpdateOneWithoutPregunta_ejecucion_actualNestedInputSchema).optional()
}).strict();

export const PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaInputSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUncheckedUpdateManyWithoutRespuestaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ejecucion_examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroCreateManyRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateManyRubrica_holisticaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  indicador_id: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const ExamenCreateManyRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenCreateManyRubrica_holisticaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_analitica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const NivelesDeLogroUpdateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateWithoutRubrica_holisticaInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicador: z.lazy(() => IndicadoresUpdateOneWithoutNiveles_de_logroNestedInputSchema).optional()
}).strict();

export const NivelesDeLogroUncheckedUpdateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateWithoutRubrica_holisticaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  indicador_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  indicador_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenUpdateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutRubrica_holisticaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutRubrica_holisticaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateManyWithoutRubrica_holisticaInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutRubrica_holisticaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndicadoresCreateManyRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresCreateManyRubrica_analiticaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const ExamenCreateManyRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenCreateManyRubrica_analiticaInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const IndicadoresUpdateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUpdateWithoutRubrica_analiticaInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutIndicadoresNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUpdateManyWithoutIndicadorNestedInputSchema).optional()
}).strict();

export const IndicadoresUncheckedUpdateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateWithoutRubrica_analiticaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutIndicadoresNestedInputSchema).optional(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutIndicadorNestedInputSchema).optional()
}).strict();

export const IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenUpdateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutRubrica_analiticaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutRubrica_analiticaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateManyWithoutRubrica_analiticaInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutRubrica_analiticaInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroCreateManyIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroCreateManyIndicadorInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  criterios: z.string(),
  tipo: z.lazy(() => TipoNivelSchema),
  nota: z.string(),
  rubrica_holistica_id: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PreguntaUpdateWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUpdateWithoutIndicadoresInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutPreguntasNestedInputSchema).optional(),
  respuestas: z.lazy(() => RespuestaUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateWithoutIndicadoresInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  respuestas: z.lazy(() => RespuestaUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional(),
  preguntasEjecucionExamen: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutPreguntaNestedInputSchema).optional()
}).strict();

export const PreguntaUncheckedUpdateManyWithoutIndicadoresInputSchema: z.ZodType<Prisma.PreguntaUncheckedUpdateManyWithoutIndicadoresInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  puntos: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  duracion: z.union([ z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NivelesDeLogroUpdateWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUpdateWithoutIndicadorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutNiveles_de_logroNestedInputSchema).optional()
}).strict();

export const NivelesDeLogroUncheckedUpdateWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateWithoutIndicadorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NivelesDeLogroUncheckedUpdateManyWithoutIndicadorInputSchema: z.ZodType<Prisma.NivelesDeLogroUncheckedUpdateManyWithoutIndicadorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  criterios: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tipo: z.union([ z.lazy(() => TipoNivelSchema),z.lazy(() => EnumTipoNivelFieldUpdateOperationsInputSchema) ]).optional(),
  nota: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  user_id: z.number().int(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
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
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExamenes_creadosNestedInputSchema).optional(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutStateInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutStateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RubricaHolisticaCreateManyUserInputSchema: z.ZodType<Prisma.RubricaHolisticaCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RubricaAnaliticaCreateManyUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const HistorialCreateManyUserInputSchema: z.ZodType<Prisma.HistorialCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  examen_id: z.string(),
  puntaje: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const ExamenCreateManyUserInputSchema: z.ZodType<Prisma.ExamenCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  img: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  peso: z.number().int().optional(),
  curso_id: z.string(),
  inicio_examen: z.coerce.date().optional().nullable(),
  final_examen: z.coerce.date().optional().nullable(),
  tipo_examen: z.lazy(() => TipoExamenSchema).optional(),
  rubrica_holistica_id: z.string().optional().nullable(),
  rubrica_analitica_id: z.string().optional().nullable(),
  state_id: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const EjecucionExamenCreateManyUserInputSchema: z.ZodType<Prisma.EjecucionExamenCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  examen_id: z.string(),
  pregunta_ejecucion_actual_id: z.string().optional().nullable(),
  fin_examen: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const UsuarioCursoCreateManyUserInputSchema: z.ZodType<Prisma.UsuarioCursoCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  curso_id: z.string(),
  is_instructor: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const RubricaHolisticaUpdateWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  niveles_de_logro: z.lazy(() => NivelesDeLogroUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_holisticaNestedInputSchema).optional()
}).strict();

export const RubricaHolisticaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RubricaHolisticaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RubricaAnaliticaUpdateWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  indicadores: z.lazy(() => IndicadoresUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional(),
  examenes: z.lazy(() => ExamenUncheckedUpdateManyWithoutRubrica_analiticaNestedInputSchema).optional()
}).strict();

export const RubricaAnaliticaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RubricaAnaliticaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUpdateWithoutUserInputSchema: z.ZodType<Prisma.HistorialUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutHistorialNestedInputSchema).optional()
}).strict();

export const HistorialUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HistorialUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.HistorialUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  puntaje: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExamenUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExamenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  rubrica_holistica: z.lazy(() => RubricaHolisticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  rubrica_analitica: z.lazy(() => RubricaAnaliticaUpdateOneWithoutExamenesNestedInputSchema).optional(),
  state: z.lazy(() => StateUpdateOneRequiredWithoutExamenesNestedInputSchema).optional(),
  preguntas: z.lazy(() => PreguntaUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas: z.lazy(() => PreguntaUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  historial: z.lazy(() => HistorialUncheckedUpdateManyWithoutExamenNestedInputSchema).optional(),
  ejecuciones: z.lazy(() => EjecucionExamenUncheckedUpdateManyWithoutExamenNestedInputSchema).optional()
}).strict();

export const ExamenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ExamenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  img: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  video: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  peso: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inicio_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  final_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tipo_examen: z.union([ z.lazy(() => TipoExamenSchema),z.lazy(() => EnumTipoExamenFieldUpdateOperationsInputSchema) ]).optional(),
  rubrica_holistica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rubrica_analitica_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EjecucionExamenUpdateWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  examen: z.lazy(() => ExamenUpdateOneRequiredWithoutEjecucionesNestedInputSchema).optional(),
  pregunta_ejecucion_actual: z.lazy(() => PreguntasEjecucionExamenUpdateOneWithoutEjecucion_actual_deNestedInputSchema).optional(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preguntas_resueltas: z.lazy(() => PreguntasEjecucionExamenUncheckedUpdateManyWithoutEjecucion_examenNestedInputSchema).optional()
}).strict();

export const EjecucionExamenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.EjecucionExamenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  examen_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pregunta_ejecucion_actual_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fin_examen: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUpdateWithoutUserInput> = z.object({
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  curso: z.lazy(() => CursoUpdateOneRequiredWithoutUsuariosNestedInputSchema).optional()
}).strict();

export const UsuarioCursoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UsuarioCursoUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UsuarioCursoUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  curso_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_instructor: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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

export const UsuarioCursoFindFirstArgsSchema: z.ZodType<Prisma.UsuarioCursoFindFirstArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereInputSchema.optional(),
  orderBy: z.union([ UsuarioCursoOrderByWithRelationInputSchema.array(),UsuarioCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsuarioCursoScalarFieldEnumSchema,UsuarioCursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsuarioCursoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsuarioCursoFindFirstOrThrowArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereInputSchema.optional(),
  orderBy: z.union([ UsuarioCursoOrderByWithRelationInputSchema.array(),UsuarioCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsuarioCursoScalarFieldEnumSchema,UsuarioCursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsuarioCursoFindManyArgsSchema: z.ZodType<Prisma.UsuarioCursoFindManyArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereInputSchema.optional(),
  orderBy: z.union([ UsuarioCursoOrderByWithRelationInputSchema.array(),UsuarioCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsuarioCursoScalarFieldEnumSchema,UsuarioCursoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UsuarioCursoAggregateArgsSchema: z.ZodType<Prisma.UsuarioCursoAggregateArgs> = z.object({
  where: UsuarioCursoWhereInputSchema.optional(),
  orderBy: z.union([ UsuarioCursoOrderByWithRelationInputSchema.array(),UsuarioCursoOrderByWithRelationInputSchema ]).optional(),
  cursor: UsuarioCursoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsuarioCursoGroupByArgsSchema: z.ZodType<Prisma.UsuarioCursoGroupByArgs> = z.object({
  where: UsuarioCursoWhereInputSchema.optional(),
  orderBy: z.union([ UsuarioCursoOrderByWithAggregationInputSchema.array(),UsuarioCursoOrderByWithAggregationInputSchema ]).optional(),
  by: UsuarioCursoScalarFieldEnumSchema.array(),
  having: UsuarioCursoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UsuarioCursoFindUniqueArgsSchema: z.ZodType<Prisma.UsuarioCursoFindUniqueArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereUniqueInputSchema,
}).strict() ;

export const UsuarioCursoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsuarioCursoFindUniqueOrThrowArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereUniqueInputSchema,
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

export const PreguntasEjecucionExamenFindFirstArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenFindFirstArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ PreguntasEjecucionExamenOrderByWithRelationInputSchema.array(),PreguntasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PreguntasEjecucionExamenScalarFieldEnumSchema,PreguntasEjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PreguntasEjecucionExamenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenFindFirstOrThrowArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ PreguntasEjecucionExamenOrderByWithRelationInputSchema.array(),PreguntasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PreguntasEjecucionExamenScalarFieldEnumSchema,PreguntasEjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PreguntasEjecucionExamenFindManyArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenFindManyArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ PreguntasEjecucionExamenOrderByWithRelationInputSchema.array(),PreguntasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PreguntasEjecucionExamenScalarFieldEnumSchema,PreguntasEjecucionExamenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PreguntasEjecucionExamenAggregateArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenAggregateArgs> = z.object({
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ PreguntasEjecucionExamenOrderByWithRelationInputSchema.array(),PreguntasEjecucionExamenOrderByWithRelationInputSchema ]).optional(),
  cursor: PreguntasEjecucionExamenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PreguntasEjecucionExamenGroupByArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenGroupByArgs> = z.object({
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
  orderBy: z.union([ PreguntasEjecucionExamenOrderByWithAggregationInputSchema.array(),PreguntasEjecucionExamenOrderByWithAggregationInputSchema ]).optional(),
  by: PreguntasEjecucionExamenScalarFieldEnumSchema.array(),
  having: PreguntasEjecucionExamenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PreguntasEjecucionExamenFindUniqueArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenFindUniqueArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const PreguntasEjecucionExamenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenFindUniqueOrThrowArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereUniqueInputSchema,
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

export const RubricaHolisticaFindFirstArgsSchema: z.ZodType<Prisma.RubricaHolisticaFindFirstArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaHolisticaOrderByWithRelationInputSchema.array(),RubricaHolisticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaHolisticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RubricaHolisticaScalarFieldEnumSchema,RubricaHolisticaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RubricaHolisticaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RubricaHolisticaFindFirstOrThrowArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaHolisticaOrderByWithRelationInputSchema.array(),RubricaHolisticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaHolisticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RubricaHolisticaScalarFieldEnumSchema,RubricaHolisticaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RubricaHolisticaFindManyArgsSchema: z.ZodType<Prisma.RubricaHolisticaFindManyArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaHolisticaOrderByWithRelationInputSchema.array(),RubricaHolisticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaHolisticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RubricaHolisticaScalarFieldEnumSchema,RubricaHolisticaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RubricaHolisticaAggregateArgsSchema: z.ZodType<Prisma.RubricaHolisticaAggregateArgs> = z.object({
  where: RubricaHolisticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaHolisticaOrderByWithRelationInputSchema.array(),RubricaHolisticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaHolisticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RubricaHolisticaGroupByArgsSchema: z.ZodType<Prisma.RubricaHolisticaGroupByArgs> = z.object({
  where: RubricaHolisticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaHolisticaOrderByWithAggregationInputSchema.array(),RubricaHolisticaOrderByWithAggregationInputSchema ]).optional(),
  by: RubricaHolisticaScalarFieldEnumSchema.array(),
  having: RubricaHolisticaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RubricaHolisticaFindUniqueArgsSchema: z.ZodType<Prisma.RubricaHolisticaFindUniqueArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaHolisticaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RubricaHolisticaFindUniqueOrThrowArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaAnaliticaFindFirstArgsSchema: z.ZodType<Prisma.RubricaAnaliticaFindFirstArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaAnaliticaOrderByWithRelationInputSchema.array(),RubricaAnaliticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaAnaliticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RubricaAnaliticaScalarFieldEnumSchema,RubricaAnaliticaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RubricaAnaliticaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RubricaAnaliticaFindFirstOrThrowArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaAnaliticaOrderByWithRelationInputSchema.array(),RubricaAnaliticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaAnaliticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RubricaAnaliticaScalarFieldEnumSchema,RubricaAnaliticaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RubricaAnaliticaFindManyArgsSchema: z.ZodType<Prisma.RubricaAnaliticaFindManyArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaAnaliticaOrderByWithRelationInputSchema.array(),RubricaAnaliticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaAnaliticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RubricaAnaliticaScalarFieldEnumSchema,RubricaAnaliticaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RubricaAnaliticaAggregateArgsSchema: z.ZodType<Prisma.RubricaAnaliticaAggregateArgs> = z.object({
  where: RubricaAnaliticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaAnaliticaOrderByWithRelationInputSchema.array(),RubricaAnaliticaOrderByWithRelationInputSchema ]).optional(),
  cursor: RubricaAnaliticaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RubricaAnaliticaGroupByArgsSchema: z.ZodType<Prisma.RubricaAnaliticaGroupByArgs> = z.object({
  where: RubricaAnaliticaWhereInputSchema.optional(),
  orderBy: z.union([ RubricaAnaliticaOrderByWithAggregationInputSchema.array(),RubricaAnaliticaOrderByWithAggregationInputSchema ]).optional(),
  by: RubricaAnaliticaScalarFieldEnumSchema.array(),
  having: RubricaAnaliticaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RubricaAnaliticaFindUniqueArgsSchema: z.ZodType<Prisma.RubricaAnaliticaFindUniqueArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaAnaliticaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RubricaAnaliticaFindUniqueOrThrowArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereUniqueInputSchema,
}).strict() ;

export const IndicadoresFindFirstArgsSchema: z.ZodType<Prisma.IndicadoresFindFirstArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereInputSchema.optional(),
  orderBy: z.union([ IndicadoresOrderByWithRelationInputSchema.array(),IndicadoresOrderByWithRelationInputSchema ]).optional(),
  cursor: IndicadoresWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IndicadoresScalarFieldEnumSchema,IndicadoresScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IndicadoresFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndicadoresFindFirstOrThrowArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereInputSchema.optional(),
  orderBy: z.union([ IndicadoresOrderByWithRelationInputSchema.array(),IndicadoresOrderByWithRelationInputSchema ]).optional(),
  cursor: IndicadoresWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IndicadoresScalarFieldEnumSchema,IndicadoresScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IndicadoresFindManyArgsSchema: z.ZodType<Prisma.IndicadoresFindManyArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereInputSchema.optional(),
  orderBy: z.union([ IndicadoresOrderByWithRelationInputSchema.array(),IndicadoresOrderByWithRelationInputSchema ]).optional(),
  cursor: IndicadoresWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IndicadoresScalarFieldEnumSchema,IndicadoresScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IndicadoresAggregateArgsSchema: z.ZodType<Prisma.IndicadoresAggregateArgs> = z.object({
  where: IndicadoresWhereInputSchema.optional(),
  orderBy: z.union([ IndicadoresOrderByWithRelationInputSchema.array(),IndicadoresOrderByWithRelationInputSchema ]).optional(),
  cursor: IndicadoresWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IndicadoresGroupByArgsSchema: z.ZodType<Prisma.IndicadoresGroupByArgs> = z.object({
  where: IndicadoresWhereInputSchema.optional(),
  orderBy: z.union([ IndicadoresOrderByWithAggregationInputSchema.array(),IndicadoresOrderByWithAggregationInputSchema ]).optional(),
  by: IndicadoresScalarFieldEnumSchema.array(),
  having: IndicadoresScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IndicadoresFindUniqueArgsSchema: z.ZodType<Prisma.IndicadoresFindUniqueArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereUniqueInputSchema,
}).strict() ;

export const IndicadoresFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndicadoresFindUniqueOrThrowArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereUniqueInputSchema,
}).strict() ;

export const NivelesDeLogroFindFirstArgsSchema: z.ZodType<Prisma.NivelesDeLogroFindFirstArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereInputSchema.optional(),
  orderBy: z.union([ NivelesDeLogroOrderByWithRelationInputSchema.array(),NivelesDeLogroOrderByWithRelationInputSchema ]).optional(),
  cursor: NivelesDeLogroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NivelesDeLogroScalarFieldEnumSchema,NivelesDeLogroScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NivelesDeLogroFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NivelesDeLogroFindFirstOrThrowArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereInputSchema.optional(),
  orderBy: z.union([ NivelesDeLogroOrderByWithRelationInputSchema.array(),NivelesDeLogroOrderByWithRelationInputSchema ]).optional(),
  cursor: NivelesDeLogroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NivelesDeLogroScalarFieldEnumSchema,NivelesDeLogroScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NivelesDeLogroFindManyArgsSchema: z.ZodType<Prisma.NivelesDeLogroFindManyArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereInputSchema.optional(),
  orderBy: z.union([ NivelesDeLogroOrderByWithRelationInputSchema.array(),NivelesDeLogroOrderByWithRelationInputSchema ]).optional(),
  cursor: NivelesDeLogroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NivelesDeLogroScalarFieldEnumSchema,NivelesDeLogroScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NivelesDeLogroAggregateArgsSchema: z.ZodType<Prisma.NivelesDeLogroAggregateArgs> = z.object({
  where: NivelesDeLogroWhereInputSchema.optional(),
  orderBy: z.union([ NivelesDeLogroOrderByWithRelationInputSchema.array(),NivelesDeLogroOrderByWithRelationInputSchema ]).optional(),
  cursor: NivelesDeLogroWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NivelesDeLogroGroupByArgsSchema: z.ZodType<Prisma.NivelesDeLogroGroupByArgs> = z.object({
  where: NivelesDeLogroWhereInputSchema.optional(),
  orderBy: z.union([ NivelesDeLogroOrderByWithAggregationInputSchema.array(),NivelesDeLogroOrderByWithAggregationInputSchema ]).optional(),
  by: NivelesDeLogroScalarFieldEnumSchema.array(),
  having: NivelesDeLogroScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NivelesDeLogroFindUniqueArgsSchema: z.ZodType<Prisma.NivelesDeLogroFindUniqueArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereUniqueInputSchema,
}).strict() ;

export const NivelesDeLogroFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NivelesDeLogroFindUniqueOrThrowArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereUniqueInputSchema,
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

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
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

export const UsuarioCursoCreateArgsSchema: z.ZodType<Prisma.UsuarioCursoCreateArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  data: z.union([ UsuarioCursoCreateInputSchema,UsuarioCursoUncheckedCreateInputSchema ]),
}).strict() ;

export const UsuarioCursoUpsertArgsSchema: z.ZodType<Prisma.UsuarioCursoUpsertArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereUniqueInputSchema,
  create: z.union([ UsuarioCursoCreateInputSchema,UsuarioCursoUncheckedCreateInputSchema ]),
  update: z.union([ UsuarioCursoUpdateInputSchema,UsuarioCursoUncheckedUpdateInputSchema ]),
}).strict() ;

export const UsuarioCursoCreateManyArgsSchema: z.ZodType<Prisma.UsuarioCursoCreateManyArgs> = z.object({
  data: z.union([ UsuarioCursoCreateManyInputSchema,UsuarioCursoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UsuarioCursoDeleteArgsSchema: z.ZodType<Prisma.UsuarioCursoDeleteArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  where: UsuarioCursoWhereUniqueInputSchema,
}).strict() ;

export const UsuarioCursoUpdateArgsSchema: z.ZodType<Prisma.UsuarioCursoUpdateArgs> = z.object({
  select: UsuarioCursoSelectSchema.optional(),
  include: UsuarioCursoIncludeSchema.optional(),
  data: z.union([ UsuarioCursoUpdateInputSchema,UsuarioCursoUncheckedUpdateInputSchema ]),
  where: UsuarioCursoWhereUniqueInputSchema,
}).strict() ;

export const UsuarioCursoUpdateManyArgsSchema: z.ZodType<Prisma.UsuarioCursoUpdateManyArgs> = z.object({
  data: z.union([ UsuarioCursoUpdateManyMutationInputSchema,UsuarioCursoUncheckedUpdateManyInputSchema ]),
  where: UsuarioCursoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UsuarioCursoDeleteManyArgsSchema: z.ZodType<Prisma.UsuarioCursoDeleteManyArgs> = z.object({
  where: UsuarioCursoWhereInputSchema.optional(),
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

export const PreguntasEjecucionExamenCreateArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  data: z.union([ PreguntasEjecucionExamenCreateInputSchema,PreguntasEjecucionExamenUncheckedCreateInputSchema ]),
}).strict() ;

export const PreguntasEjecucionExamenUpsertArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpsertArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereUniqueInputSchema,
  create: z.union([ PreguntasEjecucionExamenCreateInputSchema,PreguntasEjecucionExamenUncheckedCreateInputSchema ]),
  update: z.union([ PreguntasEjecucionExamenUpdateInputSchema,PreguntasEjecucionExamenUncheckedUpdateInputSchema ]),
}).strict() ;

export const PreguntasEjecucionExamenCreateManyArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenCreateManyArgs> = z.object({
  data: z.union([ PreguntasEjecucionExamenCreateManyInputSchema,PreguntasEjecucionExamenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PreguntasEjecucionExamenDeleteArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenDeleteArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  where: PreguntasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const PreguntasEjecucionExamenUpdateArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateArgs> = z.object({
  select: PreguntasEjecucionExamenSelectSchema.optional(),
  include: PreguntasEjecucionExamenIncludeSchema.optional(),
  data: z.union([ PreguntasEjecucionExamenUpdateInputSchema,PreguntasEjecucionExamenUncheckedUpdateInputSchema ]),
  where: PreguntasEjecucionExamenWhereUniqueInputSchema,
}).strict() ;

export const PreguntasEjecucionExamenUpdateManyArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenUpdateManyArgs> = z.object({
  data: z.union([ PreguntasEjecucionExamenUpdateManyMutationInputSchema,PreguntasEjecucionExamenUncheckedUpdateManyInputSchema ]),
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PreguntasEjecucionExamenDeleteManyArgsSchema: z.ZodType<Prisma.PreguntasEjecucionExamenDeleteManyArgs> = z.object({
  where: PreguntasEjecucionExamenWhereInputSchema.optional(),
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

export const RubricaHolisticaCreateArgsSchema: z.ZodType<Prisma.RubricaHolisticaCreateArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  data: z.union([ RubricaHolisticaCreateInputSchema,RubricaHolisticaUncheckedCreateInputSchema ]),
}).strict() ;

export const RubricaHolisticaUpsertArgsSchema: z.ZodType<Prisma.RubricaHolisticaUpsertArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereUniqueInputSchema,
  create: z.union([ RubricaHolisticaCreateInputSchema,RubricaHolisticaUncheckedCreateInputSchema ]),
  update: z.union([ RubricaHolisticaUpdateInputSchema,RubricaHolisticaUncheckedUpdateInputSchema ]),
}).strict() ;

export const RubricaHolisticaCreateManyArgsSchema: z.ZodType<Prisma.RubricaHolisticaCreateManyArgs> = z.object({
  data: z.union([ RubricaHolisticaCreateManyInputSchema,RubricaHolisticaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RubricaHolisticaDeleteArgsSchema: z.ZodType<Prisma.RubricaHolisticaDeleteArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  where: RubricaHolisticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaHolisticaUpdateArgsSchema: z.ZodType<Prisma.RubricaHolisticaUpdateArgs> = z.object({
  select: RubricaHolisticaSelectSchema.optional(),
  include: RubricaHolisticaIncludeSchema.optional(),
  data: z.union([ RubricaHolisticaUpdateInputSchema,RubricaHolisticaUncheckedUpdateInputSchema ]),
  where: RubricaHolisticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaHolisticaUpdateManyArgsSchema: z.ZodType<Prisma.RubricaHolisticaUpdateManyArgs> = z.object({
  data: z.union([ RubricaHolisticaUpdateManyMutationInputSchema,RubricaHolisticaUncheckedUpdateManyInputSchema ]),
  where: RubricaHolisticaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RubricaHolisticaDeleteManyArgsSchema: z.ZodType<Prisma.RubricaHolisticaDeleteManyArgs> = z.object({
  where: RubricaHolisticaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RubricaAnaliticaCreateArgsSchema: z.ZodType<Prisma.RubricaAnaliticaCreateArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  data: z.union([ RubricaAnaliticaCreateInputSchema,RubricaAnaliticaUncheckedCreateInputSchema ]),
}).strict() ;

export const RubricaAnaliticaUpsertArgsSchema: z.ZodType<Prisma.RubricaAnaliticaUpsertArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereUniqueInputSchema,
  create: z.union([ RubricaAnaliticaCreateInputSchema,RubricaAnaliticaUncheckedCreateInputSchema ]),
  update: z.union([ RubricaAnaliticaUpdateInputSchema,RubricaAnaliticaUncheckedUpdateInputSchema ]),
}).strict() ;

export const RubricaAnaliticaCreateManyArgsSchema: z.ZodType<Prisma.RubricaAnaliticaCreateManyArgs> = z.object({
  data: z.union([ RubricaAnaliticaCreateManyInputSchema,RubricaAnaliticaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RubricaAnaliticaDeleteArgsSchema: z.ZodType<Prisma.RubricaAnaliticaDeleteArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  where: RubricaAnaliticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaAnaliticaUpdateArgsSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateArgs> = z.object({
  select: RubricaAnaliticaSelectSchema.optional(),
  include: RubricaAnaliticaIncludeSchema.optional(),
  data: z.union([ RubricaAnaliticaUpdateInputSchema,RubricaAnaliticaUncheckedUpdateInputSchema ]),
  where: RubricaAnaliticaWhereUniqueInputSchema,
}).strict() ;

export const RubricaAnaliticaUpdateManyArgsSchema: z.ZodType<Prisma.RubricaAnaliticaUpdateManyArgs> = z.object({
  data: z.union([ RubricaAnaliticaUpdateManyMutationInputSchema,RubricaAnaliticaUncheckedUpdateManyInputSchema ]),
  where: RubricaAnaliticaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RubricaAnaliticaDeleteManyArgsSchema: z.ZodType<Prisma.RubricaAnaliticaDeleteManyArgs> = z.object({
  where: RubricaAnaliticaWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const IndicadoresCreateArgsSchema: z.ZodType<Prisma.IndicadoresCreateArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  data: z.union([ IndicadoresCreateInputSchema,IndicadoresUncheckedCreateInputSchema ]),
}).strict() ;

export const IndicadoresUpsertArgsSchema: z.ZodType<Prisma.IndicadoresUpsertArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereUniqueInputSchema,
  create: z.union([ IndicadoresCreateInputSchema,IndicadoresUncheckedCreateInputSchema ]),
  update: z.union([ IndicadoresUpdateInputSchema,IndicadoresUncheckedUpdateInputSchema ]),
}).strict() ;

export const IndicadoresCreateManyArgsSchema: z.ZodType<Prisma.IndicadoresCreateManyArgs> = z.object({
  data: z.union([ IndicadoresCreateManyInputSchema,IndicadoresCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IndicadoresDeleteArgsSchema: z.ZodType<Prisma.IndicadoresDeleteArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  where: IndicadoresWhereUniqueInputSchema,
}).strict() ;

export const IndicadoresUpdateArgsSchema: z.ZodType<Prisma.IndicadoresUpdateArgs> = z.object({
  select: IndicadoresSelectSchema.optional(),
  include: IndicadoresIncludeSchema.optional(),
  data: z.union([ IndicadoresUpdateInputSchema,IndicadoresUncheckedUpdateInputSchema ]),
  where: IndicadoresWhereUniqueInputSchema,
}).strict() ;

export const IndicadoresUpdateManyArgsSchema: z.ZodType<Prisma.IndicadoresUpdateManyArgs> = z.object({
  data: z.union([ IndicadoresUpdateManyMutationInputSchema,IndicadoresUncheckedUpdateManyInputSchema ]),
  where: IndicadoresWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const IndicadoresDeleteManyArgsSchema: z.ZodType<Prisma.IndicadoresDeleteManyArgs> = z.object({
  where: IndicadoresWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NivelesDeLogroCreateArgsSchema: z.ZodType<Prisma.NivelesDeLogroCreateArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  data: z.union([ NivelesDeLogroCreateInputSchema,NivelesDeLogroUncheckedCreateInputSchema ]),
}).strict() ;

export const NivelesDeLogroUpsertArgsSchema: z.ZodType<Prisma.NivelesDeLogroUpsertArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereUniqueInputSchema,
  create: z.union([ NivelesDeLogroCreateInputSchema,NivelesDeLogroUncheckedCreateInputSchema ]),
  update: z.union([ NivelesDeLogroUpdateInputSchema,NivelesDeLogroUncheckedUpdateInputSchema ]),
}).strict() ;

export const NivelesDeLogroCreateManyArgsSchema: z.ZodType<Prisma.NivelesDeLogroCreateManyArgs> = z.object({
  data: z.union([ NivelesDeLogroCreateManyInputSchema,NivelesDeLogroCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NivelesDeLogroDeleteArgsSchema: z.ZodType<Prisma.NivelesDeLogroDeleteArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  where: NivelesDeLogroWhereUniqueInputSchema,
}).strict() ;

export const NivelesDeLogroUpdateArgsSchema: z.ZodType<Prisma.NivelesDeLogroUpdateArgs> = z.object({
  select: NivelesDeLogroSelectSchema.optional(),
  include: NivelesDeLogroIncludeSchema.optional(),
  data: z.union([ NivelesDeLogroUpdateInputSchema,NivelesDeLogroUncheckedUpdateInputSchema ]),
  where: NivelesDeLogroWhereUniqueInputSchema,
}).strict() ;

export const NivelesDeLogroUpdateManyArgsSchema: z.ZodType<Prisma.NivelesDeLogroUpdateManyArgs> = z.object({
  data: z.union([ NivelesDeLogroUpdateManyMutationInputSchema,NivelesDeLogroUncheckedUpdateManyInputSchema ]),
  where: NivelesDeLogroWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const NivelesDeLogroDeleteManyArgsSchema: z.ZodType<Prisma.NivelesDeLogroDeleteManyArgs> = z.object({
  where: NivelesDeLogroWhereInputSchema.optional(),
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

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;