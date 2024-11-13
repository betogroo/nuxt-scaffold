import type { z } from 'zod'

import type {
  dropdownItemSchema,
  dropdownActivatorSchema,
  navbarItemSchema,
} from '~/schemas'

export type DropdownItem = z.infer<typeof dropdownItemSchema>
export type DropdownActivatorSchema = z.infer<typeof dropdownActivatorSchema>

export type NavbarItem = z.infer<typeof navbarItemSchema>
