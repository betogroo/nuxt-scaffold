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
  const teacherAvailability = ref<TimeSlotWithTeacherAvailabilityRow[]>([])
  const { timeSlots, fetchTimeSlots } = useTimeSlots()
  const { data: availability, getWithFilters } = useGenericGet<
    TeacherAvailabilityRow[]
  >('teacher_availability', teacherAvailabilityRowsSchema)

  const getTimeSlotsWithTeacherAvailability = async (
    teacherId: string,
    dayOfWeek: number,
  ) => {
    await fetchTimeSlots({ column: 'start_time' })

    await getWithFilters({ teacher_id: teacherId, day_of_week: dayOfWeek })

    const mergedData: TimeSlotWithTeacherAvailabilityRow[] =
      timeSlots.value.map((slot) => {
        if (!availability.value) throw new Error('erro')
        const availabilityMatch = availability.value.find(
          (a) => a.time_slot_id === slot.id,
        )

        return {
          ...slot,
          is_available: availabilityMatch
            ? availabilityMatch.is_available
            : null,
          availability_id: availabilityMatch ? availabilityMatch.id : null,
        }
      })
    const parsedData =
      timeSlotsWithTeacherAvailabilityRowsSchema.parse(mergedData)

    teacherAvailability.value = parsedData
  }

  const { deleteDataById: deleteTeacherAvailability } = useGenericDelete(
    'teacher_availability',
  )

  const { insertData: insertTeacherAvailability } = useGenericInsert<
    TeacherAvailabilityInsert,
    TeacherAvailabilityRow
  >('teacher_availability', teacherAvailabilityInsertSchema)

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
    getTimeSlotsWithTeacherAvailability,
    teacherAvailability,
    deleteTeacherAvailability,
    insertTeacherAvailability,
  }
}

export default useTeacherAvailability
