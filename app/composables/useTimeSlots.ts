import { timeSlotRowsSchema } from '~/schemas'
import type { TimeSlotRow } from '~/types'

const useTimeSlots = () => {
  const { data: timeSlots, fetch: fetchTimeSlots } =
    useGenericFetch<TimeSlotRow>('time_slots', timeSlotRowsSchema)

  return { timeSlots, fetchTimeSlots }
}

export default useTimeSlots
