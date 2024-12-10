import { z } from 'zod'

export const uuidSchema = z.string().uuid()
export const dayOfWeekSchema = z.number().min(0).max(6)

export const nameSchema = z
  .string()
  .min(1, MANDATORY_FIELD)
  .min(2, MIN_LENGTH(2))
  .trim()
  .refine(
    (data) => {
      const words = data.split(/\s+/)
      return words.length >= 2
    },
    {
      message: MUST_INCLUDE_FIRST_AND_LAST_NAME,
    },
  )

export const usernameSchema = z
  .string()
  .min(1, MANDATORY_FIELD)
  .min(4, MIN_LENGTH(4))
  .trim()
  .regex(/^\S*$/, NO_SPACES)
