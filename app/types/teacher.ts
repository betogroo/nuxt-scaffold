import type { z } from 'zod'

import type {
  teacherInsertSchema,
  teacherRowSchema,
  teacherUpdateSchema,
} from '~/schemas'

export type TeacherInsert = z.infer<typeof teacherInsertSchema>
export type TeacherRow = z.infer<typeof teacherRowSchema>
export type TeacherUpdate = z.infer<typeof teacherUpdateSchema>
