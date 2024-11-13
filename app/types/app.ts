import type { z } from 'zod'

import type { navbarItemSchema } from '~/schemas'
export type { DropdownItem } from '#ui/types'

export type NavbarItem = z.infer<typeof navbarItemSchema>
