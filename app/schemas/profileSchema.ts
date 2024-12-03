import { z } from 'zod'
export const profileRowSchema = z.object({
  id: uuidSchema,
  updated_at: z.string().nullable(),
  username: z.string().nullable(),
  email: z.string().email().optional(),
  name: z.string(),
})
