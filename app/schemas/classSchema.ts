import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const classNameSchema = z
  .string()
  .min(1, MANDATORY_FIELD)
  .min(2, TWO_LETTERS_MINIMUM_NAME)
  .trim()

export const classRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  name: classNameSchema,
})
export const classRowsSchema = z.array(classRowSchema)

export const classInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: classNameSchema,
})

export const classUpdateSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: classNameSchema.optional(),
})

export const validateClass = toTypedSchema(classInsertSchema)
