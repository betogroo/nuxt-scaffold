import type { z } from 'zod'

import type {
  documentDemandInsertSchema,
  documentDemandRowSchema,
  demandSiteSchema,
  demandStatusSchema,
} from '~/schemas'

export type DemandSite = z.infer<typeof demandSiteSchema>
export type DemandStatus = z.infer<typeof demandStatusSchema>

export type DocumentDemandInsert = z.infer<typeof documentDemandInsertSchema>
export type DocumentDemandRow = z.infer<typeof documentDemandRowSchema>
