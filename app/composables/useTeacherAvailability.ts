import type {
  Database,
  TeacherAvailabilityInsert,
  TeacherAvailabilityRow,
  TimeSlotRow,
} from '~/types'
import {
  teacherAvailabilityInsertSchema,
  teacherAvailabilityRowsSchema,
  timeSlotRowsSchema,
} from '~/schemas'

const useTeacherAvailability = () => {
  const supabase = useSupabaseClient<Database>()
  const teacherAvailability = ref<TimeSlotRow[]>([])
  const { timeSlots, fetchTimeSlots } = useTimeSlots()

  const getTeacherAvailability = async (
    teacherId: string,
    dayOfWeek: number,
  ) => {
    await fetchTimeSlots({ column: 'start_time' })

    const { data: availability, getWithFilters } = useGenericGet<
      TeacherAvailabilityRow[]
    >('teacher_availability', teacherAvailabilityRowsSchema)
    await getWithFilters({ teacher_id: teacherId, day_of_week: dayOfWeek })
    console.log(availability.value, timeSlots.value)

    /* const { data: availability, error: availabilityError } = await supabase
      .from('teacher_availability')
      .select('id, time_slot_id, is_available')
      .eq('teacher_id', teacherId)
      .eq('day_of_week', dayOfWeek)

    if (availabilityError) {
      console.error('Error fetching teacher availability:', availabilityError)
      return null
    } */

    const mergedData: TimeSlotRow[] = timeSlots.value.map((slot) => {
      if (!availability.value) throw new Error('erro')
      const availabilityMatch = availability.value.find(
        (a) => a.time_slot_id === slot.id,
      )

      return {
        ...slot,
        is_available: availabilityMatch ? availabilityMatch.is_available : null,
        availability_id: availabilityMatch ? availabilityMatch.id : null,
      }
    })
    const parsedData = timeSlotRowsSchema.parse(mergedData)

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
        console.log('Vai mudar a tabela')
        const { new: newTeacherAvailability } = event
        console.log(newTeacherAvailability)
        /*  try {
          const parsedTeacherAvailability = timeSlotRowsSchema.parse(newTeacherAvailability)
          teacherAvailability.value.push(parsedTeacherAvailability)
        } catch (error) {
          console.error('Erro ao validar a nova demanda:', error)
        } */
      },
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'teacher_availability' },
      (event) => {
        const { new: newTeacherAvailability } = event
        console.log(newTeacherAvailability)
        /* const index = demands.value.findIndex(
          (demand) => demand.id === updatedDocumentDemand.id,
        )
        if (index !== -1) {
          demands.value[index] = updatedDocumentDemand as DocumentDemandRow
        } */
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'teacher_availability' },
      (event) => {
        console.log('vai deletar', event.new)
        const { old: newTeacherAvailability } = event
        console.log(newTeacherAvailability)
        /* demands.value = demands.value.filter(
          (demand) => demand.id !== deletedDocumentDemand.id,
        ) */
      },
    )
    .subscribe()

  return {
    getTeacherAvailability,
    teacherAvailability,
    deleteTeacherAvailability,
    insertTeacherAvailability,
  }
}

export default useTeacherAvailability
