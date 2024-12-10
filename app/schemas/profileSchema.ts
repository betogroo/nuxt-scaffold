import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const profileRowSchema = z.object({
  id: uuidSchema,
  updated_at: z.string().nullable(),
  name: nameSchema.optional().nullable(),
  username: usernameSchema.optional(),
  email: z.string().email().optional(),
})

export const profileUpdateSchema = z.object({
  id: uuidSchema.optional(),
  name: nameSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  username: usernameSchema.optional(),
  email: z.string().email().optional(),
})

export const validateProfile = toTypedSchema(profileUpdateSchema)
