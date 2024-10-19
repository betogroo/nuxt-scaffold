import type { z } from 'zod'
import type { pendingStateSchema } from '~/schemas/helpersSchema'

export type PendingState = z.infer<typeof pendingStateSchema>
