import type { z } from 'zod'
import type { pendingStateSchema, tableColumnSchema } from '~/schemas'

export type PendingState = z.infer<typeof pendingStateSchema>
export type SelectOption<T = string> = { name: string; value: T }

export type TableColumn = z.infer<typeof tableColumnSchema>
