import { timeSlotsRowsSchema } from '~/schemas'
import type { TimeSlotsRow } from '~/types'

const useTimeSlots = () => {
  const { data: timeSlots, fetch: fetchTimeSlots } =
    useGenericFetch<TimeSlotsRow>('time_slots', timeSlotsRowsSchema)

  return { timeSlots, fetchTimeSlots }
}

export default useTimeSlots
