import { z } from 'zod'

export const pendingStateSchema = z.object({
  action: z.string().nullable(),
  itemId: z.union([z.string(), z.number()]).nullable(),
  isLoading: z.boolean().default(false),
})
