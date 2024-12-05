import type { z } from 'zod'
import type { profileRowSchema, profileUpdateSchema } from '~/schemas'

export type Profile = z.infer<typeof profileRowSchema>
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>
