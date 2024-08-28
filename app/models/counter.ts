import { z } from 'zod'

const baseFormSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  name: z.string(),
  email: z.string().email('Email Inválido'),
})

export const addFormSchema = baseFormSchema.omit({
  id: true,
  created_at: true,
})

export const editFormSchema = baseFormSchema.partial().extend({
  id: z.number(),
})

export const viewFormSchema = baseFormSchema

export type AddFormSchema = z.infer<typeof addFormSchema>
export type EditFormSchema = z.infer<typeof editFormSchema>
export type ViewFormSchema = z.infer<typeof viewFormSchema>
