import type {
  Database,
  TeacherAvailabilityInsert,
  TeacherAvailabilityRow,
  TimeSlotWithTeacherAvailabilityRow,
} from '~/types'
import {
  teacherAvailabilityInsertSchema,
  teacherAvailabilityRowsSchema,
  timeSlotsWithTeacherAvailabilityRowsSchema,
} from '~/schemas'

const useTeacherAvailability = () => {
  const supabase = useSupabaseClient<Database>()
  const { timeSlots, fetchTimeSlots } = useTimeSlots()
  const { validateWithSchema } = useSchema()

  const { data: availability, getWithFilters } = useGenericGet<
    TeacherAvailabilityRow[]
  >('teacher_availability', teacherAvailabilityRowsSchema)

  const teacherAvailability = computed<TimeSlotWithTeacherAvailabilityRow[]>(
    () => {
      if (!availability.value || !timeSlots.value) return []
      return timeSlots.value.map((slot) => {
        const availabilityMatch = availability.value?.find(
          (a) => a.time_slot_id === slot.id,
        )

        return {
          ...slot,
          is_available: availabilityMatch?.is_available ?? null,
          availability_id: availabilityMatch?.id ?? null,
        }
      })
    },
  )

  const fetchTimeSlotsWithTeacherAvailability = async (
    teacherId: string,
    dayOfWeek: number,
  ): Promise<void> => {
    await Promise.all([
      await fetchTimeSlots({ column: 'start_time' }),
      await getWithFilters({ teacher_id: teacherId, day_of_week: dayOfWeek }),
    ])
    validateWithSchema(
      teacherAvailability.value,
      timeSlotsWithTeacherAvailabilityRowsSchema,
    )
  }

  const { deleteDataById: deleteTeacherAvailability } = useGenericDelete(
    'teacher_availability',
  )

  const { insert: insertTeacherAvailability } = useGenericInsert<
    TeacherAvailabilityInsert,
    TeacherAvailabilityRow
  >('teacher_availability', teacherAvailabilityInsertSchema)

  const { upsert: teacherAvailabilityUpsert, upsertPending } =
    useGenericUpsert<TeacherAvailabilityInsert>(
      'teacher_availability',
      ['teacher_id', 'day_of_week', 'time_slot_id'],
      teacherAvailabilityInsertSchema,
    )

  const toggleAvailability = async (
    rowData: TimeSlotWithTeacherAvailabilityRow,
    teacher_id: string,
  ) => {
    try {
      validateWithSchema(teacher_id, uuidSchema)
      uuidSchema.parse(teacher_id)
      const { is_available, id: time_slot_id } = rowData
      const newData: TeacherAvailabilityInsert = {
        day_of_week: 1,
        teacher_id,
        time_slot_id,
        is_available: !is_available,
      }
      await teacherAvailabilityUpsert(newData, newData.time_slot_id)
      fetchTimeSlotsWithTeacherAvailability(teacher_id, 1)
    } catch (error) {
      console.log(error)
    }
  }

  supabase
    .channel('teacher_availability_refresh')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'teacher_availability',
      },
      (event) => {
        console.log(event)
        console.log('Vai INSERIR a tabela')
        const { new: newTeacherAvailability } = event
        console.log(newTeacherAvailability)
      },
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'teacher_availability' },
      (event) => {
        const { new: newTeacherAvailability } = event
        console.log(newTeacherAvailability)
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'teacher_availability' },
      (event) => {
        console.log('vai deletar', event.new)
        const { old: newTeacherAvailability } = event
        console.log(newTeacherAvailability)
      },
    )
    .subscribe()

  return {
    fetchTimeSlotsWithTeacherAvailability,
    teacherAvailability,
    deleteTeacherAvailability,
    insertTeacherAvailability,
    toggleAvailability,
    teacherAvailabilityUpsert,
    upsertPending,
  }
}

export default useTeacherAvailability
