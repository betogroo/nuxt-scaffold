import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const nameSchema = z
  .string()
  .min(1, 'Campo Obrigatório')
  .min(2, TWO_LETTERS_MINIMUM_NAME)
  .trim()
  .refine(
    (data) => {
      const words = data.split(/\s+/)
      return words.length >= 2
    },
    {
      message: MUST_INCLUDE_FIRST_AND_LAST_NAME,
    },
  )

export const teacherRowSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  name: nameSchema,
})
export const teacherRowsSchema = z.array(teacherRowSchema)

export const teacherInsertSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: nameSchema,
})

export const teacherUpdateSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: nameSchema.optional(),
})

export const validateTeacher = toTypedSchema(teacherInsertSchema)
