import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const nameSchema = z
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
  )

export const teacherRowSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  name: z.string(),
})

export const teacherInsertSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: nameSchema,
})

export const teacherUpdateSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: nameSchema.optional(),
})

export const validateTeacher = toTypedSchema(teacherInsertSchema)
