import type { z } from 'zod'
import type { pendingStateSchema } from '~/schemas'
import type { Database } from '~/types/supabase'

export type PendingState = z.infer<typeof pendingStateSchema>
export type SelectOption<T = string> = { name: string; value: T }

export type Tables = keyof Database['public']['Tables']
export type { Database }
