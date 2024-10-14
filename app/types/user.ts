import type { z } from 'zod'
import type {
  addUserSchema,
  editUserSchema,
  viewUserSchema,
  userCredencialSchema,
} from '../schemas/userSchema.js'

export type AddUser = z.infer<typeof addUserSchema>
export type EditUser = z.infer<typeof editUserSchema>
export type ViewUser = z.infer<typeof viewUserSchema>
export type UserCredencial = z.infer<typeof userCredencialSchema>
