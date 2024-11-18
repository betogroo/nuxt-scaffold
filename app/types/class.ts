import type { z } from 'zod'

import type {
  classInsertSchema,
  classRowSchema,
  classUpdateSchema,
} from '~/schemas'

export type ClassInsert = z.infer<typeof classInsertSchema>
export type ClassRow = z.infer<typeof classRowSchema>
export type ClassUpdate = z.infer<typeof classUpdateSchema>
