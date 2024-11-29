<script setup lang="ts">
  //<script setup lang="ts">
  import type { TableColumn, TimeSlotWithTeacherAvailabilityRow } from '~/types'
  const props = defineProps<Props>()

  const { toggleAvailability } = useTeacherAvailability()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: TimeSlotWithTeacherAvailabilityRow[]
    teacherId: string
    //rows: Array<Record<string, unknown>>
  }

  const handleAvailability = async (
    item: TimeSlotWithTeacherAvailabilityRow,
  ) => {
    await toggleAvailability(item, props.teacherId)
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
          @click="handleAvailability(row)"
        />
      </template>
    </UTable>
  </AppCard>
</template>
