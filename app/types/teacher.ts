import type { z } from 'zod'

import type {
  teacherInsertSchema,
  teacherRowSchema,
  teacherUpdateSchema,
  teacherAvailabilityInsertSchema,
  teacherAvailabilityRowSchema,
} from '~/schemas'

export type TeacherInsert = z.infer<typeof teacherInsertSchema>
export type TeacherRow = z.infer<typeof teacherRowSchema>
export type TeacherUpdate = z.infer<typeof teacherUpdateSchema>
export type TeacherAvailabilityRow = z.infer<
  typeof teacherAvailabilityRowSchema
>
export type TeacherAvailabilityInsert = z.infer<
  typeof teacherAvailabilityInsertSchema
>
