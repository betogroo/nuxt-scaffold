import type { z } from 'zod'
import type { tableColumnSchema } from '~/schemas'

export type TableColumn = z.infer<typeof tableColumnSchema>
