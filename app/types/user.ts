import type { z } from 'zod'
import type {
  addUserSchema,
  credencialTypeSchema,
  editUserSchema,
  userCredencialSchema,
  viewUserSchema,
} from '../schemas/userSchema.js'

export type AddUser = z.infer<typeof addUserSchema>
export type EditUser = z.infer<typeof editUserSchema>
export type ViewUser = z.infer<typeof viewUserSchema>
export type UserCredencial = z.infer<typeof userCredencialSchema>
export type CredencialType = z.infer<typeof credencialTypeSchema>
