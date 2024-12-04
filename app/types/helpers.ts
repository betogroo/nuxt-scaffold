import type { z } from 'zod'
import type { pendingStateSchema, pendingOptionsSchema } from '~/schemas'

import type { Database } from '~/types/supabase'
export type { PostgrestError } from '@supabase/supabase-js'

export type PendingState = z.infer<typeof pendingStateSchema>
export type PendingOptions = z.infer<typeof pendingOptionsSchema>

export type SelectOption<T = string> = { name: string; value: T }

export type Tables = keyof Database['public']['Tables']
export type { Database }
