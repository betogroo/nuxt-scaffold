import type { z } from 'zod'
import type { timeSlotRowSchema } from '~/schemas'

export type TimeSlotRow = z.infer<typeof timeSlotRowSchema>
