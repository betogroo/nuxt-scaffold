<script setup lang="ts">
  //<script setup lang="ts">
  import type { TableColumn, TimeSlotRow } from '~/types'
  import { teacherAvailabilityInsertSchema } from '~/schemas'

  const props = defineProps<Props>()

  const { deleteTeacherAvailability, insertTeacherAvailability } =
    useTeacherAvailability()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: TimeSlotRow[]
    teacherId: string
  }
  const toggleAvailability = async (item: TimeSlotRow) => {
    try {
      if (item.availability_id) {
        console.log('vai deletar')
        await deleteTeacherAvailability(item.availability_id)
      } else {
        const newData = {
          time_slot_id: item.id,
          teacher_id: props.teacherId,
          day_of_week: 1,
        }
        const parsedInsert = teacherAvailabilityInsertSchema.parse(newData)
        console.log('vai inserir')
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
      <template #availability_id-data="{ row }">
        <UButton
          :disabled="row.is_break"
          :icon="
            row.availability_id ? iconOutline.checkCircle : iconOutline.close
          "
          variant="link"
          @click="toggleAvailability(row)"
        />
      </template>
    </UTable>
  </AppCard>
</template>
