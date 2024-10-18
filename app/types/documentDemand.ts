import type { z } from 'zod'

import type { documentDemandInsertSchema, documentDemandRowSchema } from './'

export type DocumentDemandInsert = z.infer<typeof documentDemandInsertSchema>
export type DocumentDemandRow = z.infer<typeof documentDemandRowSchema>
