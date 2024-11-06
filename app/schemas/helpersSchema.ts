import { z } from 'zod'

export const pendingStateSchema = z.object({
  action: z.string().nullable(),
  itemId: z.union([z.string(), z.number()]).nullable(),
  isLoading: z.boolean().default(false),
})

export const tableColumnSchema = z.object({
  key: z.string().trim(),
  label: z.string().trim().optional(),
})
