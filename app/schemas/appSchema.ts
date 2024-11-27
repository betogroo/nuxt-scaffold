import { z } from 'zod'

export const tableColumnSchema = z.object({
  key: z.string().trim(),
  label: z.string().trim().optional(),
})
