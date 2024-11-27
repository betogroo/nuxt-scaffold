import type { z } from 'zod'
import type {
  timeSlotsWithTeacherAvailabilityRowSchema,
  timeSlotsInsertSchema,
  timeSlotsRowSchema,
  timeSlotsUpdateSchema,
} from '~/schemas'

export type TimeSlotWithTeacherAvailabilityRow = z.infer<
  typeof timeSlotsWithTeacherAvailabilityRowSchema
>

export type TimeSlotsRow = z.infer<typeof timeSlotsRowSchema>
export type TimeSlotsInsert = z.infer<typeof timeSlotsInsertSchema>
export type TimeSlotsUpdate = z.infer<typeof timeSlotsUpdateSchema>
