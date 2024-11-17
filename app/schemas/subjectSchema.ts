import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const subjectNameSchema = z
  .string()
  .min(1, MANDATORY_FIELD)
  .min(2, TWO_LETTERS_MINIMUM_NAME)
  .trim()

export const subjectRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  name: subjectNameSchema,
})

export const subjectInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: subjectNameSchema,
})

export const subjectUpdateSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: subjectNameSchema.optional(),
})

export const validateSubject = toTypedSchema(subjectInsertSchema)
