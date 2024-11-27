import { z } from 'zod'

export const timeSlotsWithTeacherAvailabilityRowSchema = z.object({
  id: z.number().int().positive(), // ID do time_slot (deve ser um inteiro positivo)
  name: z.string().min(1), // Nome do horário (ex.: "1ª aula")
  start_time: z.string(),
  end_time: z.string(),
  is_break: z.boolean(), // Indica se é um intervalo
  is_available: z.boolean().optional().nullable(), // Disponibilidade do professor (null se não definido)
  availability_id: uuidSchema.optional().nullable(), // ID da disponibilidade (null se não definido)
})

export const timeSlotsWithTeacherAvailabilityRowsSchema = z.array(
  timeSlotsWithTeacherAvailabilityRowSchema,
)

export const timeSlotsRowSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  is_break: z.boolean(),
})

export const timeSlotsRowsSchema = z.array(timeSlotsRowSchema)

export const timeSlotsInsertSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  is_break: z.boolean().optional(),
})

export const timeSlotsUpdateSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  is_break: z.boolean().optional(),
})
