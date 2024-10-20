import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const demandStatusSchema = z.union([
  z.literal('new'),
  z.literal('consulted'),
  z.literal('released'),
  z.literal('issued'),
  z.literal('error'),
])
export const documentDemandRowSchema = z.object({
  created_at: z.string().nullable(),
  document_number: z.string(),
  id: z.number(),
  name: z.string().min(1, 'Campo Obrigatório').trim(),
  status: demandStatusSchema,
  updated_at: z.string().nullable(),
  user_id: z.string(),
})

export const documentDemandInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  document_number: z
    .string()
    .min(10, 'Digite o documento no padrão 00000000-0'),
  id: z.number().optional(),
  name: z
    .string()
    .min(1, 'Campo Obrigatório')
    .min(2, 'Parte do node deve conter no mínimo duas letras')
    .trim()
    .refine(
      (data) => {
        const words = data.split(/\s+/)
        return words.length >= 2
      },
      {
        message: 'Deve conter pelo menos o nome e sobrenome',
      },
    ),
  status: demandStatusSchema.optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid(),
})

export const validateDocumentDemand = toTypedSchema(documentDemandInsertSchema)
