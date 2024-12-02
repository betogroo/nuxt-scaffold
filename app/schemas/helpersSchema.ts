import { z } from 'zod'
import type { Json } from './../types/supabase.d'

export const pendingStateSchema = z.object({
  action: z.string().nullable(),
  itemId: z.union([z.string(), z.number()]).nullable(),
  isLoading: z.boolean().default(false),
})

export const pendingOptionsSchema = z.object({
  itemId: z.union([z.string(), z.number().positive()]).optional(),
  delay: z.number().positive().optional(),
})

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
)
