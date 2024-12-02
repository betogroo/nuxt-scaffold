<script setup lang="ts">
  import type {
    PendingState,
    TableColumn,
    TimeSlotWithTeacherAvailabilityRow,
  } from '~/types'
  defineProps<Props>()
  const $emit = defineEmits<{
    handleAvailability: [item: TimeSlotWithTeacherAvailabilityRow]
  }>()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: TimeSlotWithTeacherAvailabilityRow[]
    teacherId: string
    rowPending: PendingState
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
          :loading="
            rowPending.isLoading &&
            rowPending.action === 'teacher_availability' &&
            rowPending.itemId === row.id
          "
          variant="link"
          @click="$emit('handleAvailability', row)"
        />
      </template>
    </UTable>
  </AppCard>
</template>
