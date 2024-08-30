import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const baseFormSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  name: z.string().min(8, 'Campo Obrigatório'),
  email: z.string().min(1, 'Campo Obrigatório').email('Email Inválido'),
})

export const addFormSchema = baseFormSchema.omit({
  id: true,
  created_at: true,
})

export const editFormSchema = baseFormSchema.partial().extend({
  id: z.string().uuid(),
})

export const viewFormSchema = baseFormSchema
export const validationFormSchema = toTypedSchema(addFormSchema)

export type AddForm = z.infer<typeof addFormSchema>
export type EditForm = z.infer<typeof editFormSchema>
export type ViewForm = z.infer<typeof viewFormSchema>
