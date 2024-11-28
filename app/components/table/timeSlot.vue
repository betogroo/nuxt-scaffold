<script setup lang="ts">
  //<script setup lang="ts">
  import type { TableColumn, TimeSlotWithTeacherAvailabilityRow } from '~/types'
  import { teacherAvailabilityInsertSchema } from '~/schemas'
  const props = defineProps<Props>()

  const { deleteTeacherAvailability, insertTeacherAvailability } =
    useTeacherAvailability()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: TimeSlotWithTeacherAvailabilityRow[]
    teacherId: string
    //rows: Array<Record<string, unknown>>
  }

  const toggleAvailability = async (
    item: TimeSlotWithTeacherAvailabilityRow,
  ) => {
    try {
      if (item.availability_id) {
        await deleteTeacherAvailability(item.availability_id)
      } else {
        const newData = {
          time_slot_id: item.id,
          teacher_id: props.teacherId,
          day_of_week: 1,
        }
        const parsedInsert = teacherAvailabilityInsertSchema.parse(newData)

        await insertTeacherAvailability(parsedInsert)
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <AppCard :title="title">
    <UTable
      :columns="columns"
      :rows="rows"
      :ui="{ td: { padding: 'p-1', color: 'text-gray-800' } }"
    >
      <template #time-data="{ row }">
        {{
          `${row.name} - ${row.start_time.substring(
            0,
            5,
          )} às ${row.end_time.substring(0, 5)}`
        }}
      </template>
      <template #availability-data="{ row }">
        <UButton
          :disabled="row.is_break"
          :icon="
            row.availability_id && row.is_available
              ? iconOutline.checkCircle
              : iconOutline.close
          "
          variant="link"
          @click="toggleAvailability(row)"
        />
      </template>
    </UTable>
  </AppCard>
</template>
