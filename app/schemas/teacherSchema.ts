import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { jsonSchema } from './helpersSchema'

export const teacherRowSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  name: z.string(),
  availabilities: jsonSchema.nullable(),
  subjects: jsonSchema.nullable(),
})

export const teacherInsertSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string(),
  availabilities: jsonSchema.optional().nullable(),
  subjects: jsonSchema.optional().nullable(),
})

export const teacherUpdateSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string().optional(),
  availabilities: jsonSchema.optional().nullable(),
  subjects: jsonSchema.optional().nullable(),
})

export const validateTeacher = toTypedSchema(teacherInsertSchema)
