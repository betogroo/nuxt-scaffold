import { z } from 'zod'

export const timeSlotRowSchema = z.object({
  id: z.number().int().positive(), // ID do time_slot (deve ser um inteiro positivo)
  name: z.string().min(1), // Nome do horário (ex.: "1ª aula")
  start_time: z.string(),
  end_time: z.string(),
  is_break: z.boolean(), // Indica se é um intervalo
  is_available: z.boolean().optional().nullable(), // Disponibilidade do professor (null se não definido)
  availability_id: uuidSchema.optional().nullable(), // ID da disponibilidade (null se não definido)
})

export const timeSlotRowsSchema = z.array(timeSlotRowSchema)
