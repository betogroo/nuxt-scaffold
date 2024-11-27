import { z } from 'zod'

export const uuidSchema = z.string().uuid()
export const dayOfWeekSchema = z.number().min(0).max(6)
