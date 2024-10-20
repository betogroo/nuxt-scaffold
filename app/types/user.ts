import type { z } from 'zod'

import type {
  addUserSchema,
  credencialTypeSchema,
  editUserSchema,
  userLoginSchema,
  userSignupSchema,
  viewUserSchema,
} from '~/schemas'

export type AddUser = z.infer<typeof addUserSchema>
export type EditUser = z.infer<typeof editUserSchema>
export type ViewUser = z.infer<typeof viewUserSchema>
export type UserLogin = z.infer<typeof userLoginSchema>
export type UserSignup = z.infer<typeof userSignupSchema>
export type CredencialType = z.infer<typeof credencialTypeSchema>
