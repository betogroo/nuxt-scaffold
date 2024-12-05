import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const profileRowSchema = z.object({
  id: uuidSchema,
  updated_at: z.string().nullable(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
})

export const profileUpdateSchema = z.object({
  id: uuidSchema.optional(),
  name: z.string().optional(),
  updated_at: z.string().optional().nullable(),
  username: z.string().optional(),
  email: z.string().email().optional(),
})

export const validateProfile = toTypedSchema(profileUpdateSchema)
