import type { z } from 'zod'

import type {
  subjectInsertSchema,
  subjectRowSchema,
  subjectUpdateSchema,
} from '~/schemas'

export type SubjectInsert = z.infer<typeof subjectInsertSchema>
export type SubjectRow = z.infer<typeof subjectRowSchema>
export type SubjectUpdate = z.infer<typeof subjectUpdateSchema>
