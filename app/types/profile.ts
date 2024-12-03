import type { z } from 'zod'
import type { profileRowSchema } from '~/schemas'

export type Profile = z.infer<typeof profileRowSchema>
