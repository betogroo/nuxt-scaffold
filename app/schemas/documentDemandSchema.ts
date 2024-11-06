import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const demandStatusSchema = z.union([
  z.literal('new'),
  z.literal('consulted'),
  z.literal('released'),
  z.literal('issued'),
  z.literal('error'),
])
export const demandSiteSchema = z.union([
  z.literal('1062-9'),
  z.literal('1342-5'),
])

export const demandTypeSchema = z.union([
  z.literal('1cin'),
  z.literal('2cin'),
  z.literal('1v'),
  z.literal('2v'),
  z.literal('2vt'),
  z.literal('1ve'),
  z.literal('2ve'),
])
export const documentDemandRowSchema = z.object({
  created_at: z.string().nullable(),
  document_number: z.string(),
  id: z.number(),
  name: z.string().min(1, 'Campo Obrigatório').trim(),
  status: demandStatusSchema,
  site: demandSiteSchema,
  type: demandTypeSchema,
  updated_at: z.string().nullable(),
  user_id: z.string(),
  note: z.string().nullable(),
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
    .min(2, 'Parte do nome deve conter no mínimo duas letras')
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
  site: demandSiteSchema,
  type: demandTypeSchema,
  updated_at: z.string().optional().nullable(),
  user_id: z.string().uuid(),
  note: z.string().optional(),
})

export const validateDocumentDemand = toTypedSchema(documentDemandInsertSchema)
