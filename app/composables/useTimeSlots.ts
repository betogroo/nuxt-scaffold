import { timeSlotsRowsSchema } from '~/schemas'
import type { TimeSlotsRow, TimeSlotWithTeacherAvailabilityRow } from '~/types'
const timeSlotsWithTeacherAvailability = ref<
  TimeSlotWithTeacherAvailabilityRow[]
>([])

const useTimeSlots = () => {
  const { data: timeSlots, fetch: fetchTimeSlots } =
    useGenericFetch<TimeSlotsRow>('time_slots', timeSlotsRowsSchema)

  return { timeSlots, fetchTimeSlots, timeSlotsWithTeacherAvailability }
}

export default useTimeSlots
