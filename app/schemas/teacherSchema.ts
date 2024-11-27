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
  id: uuidSchema,
  created_at: z.string(),
  name: nameSchema,
})
export const teacherRowsSchema = z.array(teacherRowSchema)

export const teacherInsertSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  name: nameSchema,
})

export const teacherUpdateSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  name: nameSchema.optional(),
})

export const teacherAvailabilityRowSchema = z.object({
  id: uuidSchema,
  created_at: z.string(),
  day_of_week: dayOfWeekSchema,
  is_available: z.boolean(),
  teacher_id: uuidSchema,
  time_slot_id: z.number(),
})
export const teacherAvailabilityRowsSchema = z.array(
  teacherAvailabilityRowSchema,
)

export const teacherAvailabilityInsertSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  day_of_week: dayOfWeekSchema,
  is_available: z.boolean().optional(),
  teacher_id: uuidSchema,
  time_slot_id: z.number(),
})

export const teacherAvailabilityUpdateSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  day_of_week: dayOfWeekSchema.optional(),
  is_available: z.boolean().optional(),
  teacher_id: uuidSchema.optional(),
  time_slot_id: z.number().optional(),
})

export const validateTeacher = toTypedSchema(teacherInsertSchema)
