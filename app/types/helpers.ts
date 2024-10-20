import type { z } from 'zod'
import type { pendingStateSchema } from '~/schemas'

export type PendingState = z.infer<typeof pendingStateSchema>
export type SelectOption<T = string> = { name: string; value: T }
