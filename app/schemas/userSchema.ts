import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const baseUserSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  name: z.string().min(8, 'Campo Obrigatório'),
  email: z.string().min(1, 'Campo Obrigatório').email('Email Inválido'),
})

export const credencialTypeSchema = z.enum(['login', 'signup'])

export const userLoginSchema = baseUserSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  })

export const userSignupSchema = z
  .object({
    passwordConfirm: z
      .string()
      .min(1, 'É necessário confirmar a senha')
      .min(6, 'A confirmação deve ter no mínimo 6 dígitos')
      .optional(),
  })
  .merge(userLoginSchema)
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser idênticas',
    path: ['passwordConfirm'],
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
export const validationLogin = toTypedSchema(userLoginSchema)
export const validationSignup = toTypedSchema(userSignupSchema)
