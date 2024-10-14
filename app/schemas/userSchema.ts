import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const baseUserSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  name: z.string().min(8, 'Campo Obrigatório'),
  email: z.string().min(1, 'Campo Obrigatório').email('Email Inválido'),
})

export const userCredencialSchema = baseUserSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  })

export const addUserSchema = baseUserSchema.omit({
  id: true,
  created_at: true,
})

export const editUserSchema = baseUserSchema.partial().extend({
  id: z.string().uuid(),
})

export const viewUserSchema = baseUserSchema
export const validationUserSchema = toTypedSchema(addUserSchema)
export const validationCredencial = toTypedSchema(userCredencialSchema)
