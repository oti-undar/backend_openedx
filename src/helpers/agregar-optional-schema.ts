import { z } from 'zod'

export const addOptionalToNullable = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  const newShape = {} as any

  for (const key in schema.shape) {
    const field = schema.shape[key]
    // Verificamos si el tipo incluye nullable
    if (field.isNullable?.()) {
      newShape[key] = field.optional()
    } else {
      newShape[key] = field
    }
  }

  return z.object(newShape) as z.ZodObject<T>
}
