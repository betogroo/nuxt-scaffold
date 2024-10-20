import type { z } from 'zod'

import type {
  documentDemandInsertSchema,
  documentDemandRowSchema,
  demandSiteSchema,
} from './'

export type DemandSite = z.infer<typeof demandSiteSchema>

export type DocumentDemandInsert = z.infer<typeof documentDemandInsertSchema>
export type DocumentDemandRow = z.infer<typeof documentDemandRowSchema>
