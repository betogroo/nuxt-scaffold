<script setup lang="ts">
  import type { TableColumn, TimeSlotWithTeacherAvailabilityRow } from '~/types'

  const { params } = useRoute()
  const { validateWithSchema, schemaError } = useSchema()
  const { getById, getDataPending, teacher } = useTeacher()
  const {
    fetchTimeSlotsWithTeacherAvailability,
    teacherAvailability,
    upsertPending,
    toggleAvailability,
  } = useTeacherAvailability()
  const { handleError } = useHelpers()
  const parsedId = validateWithSchema(params.id!, uuidSchema)
  onMounted(async () => {
    try {
      await getById(parsedId)
      await fetchTimeSlotsWithTeacherAvailability(parsedId, 1)
    } catch (error) {
      const err = handleError(error)
      console.log(err)
    }
  })
  const handleAvailability = async (
    item: TimeSlotWithTeacherAvailabilityRow,
  ) => {
    await toggleAvailability(item, parsedId)
  }

  const columns: TableColumn[] = [
    {
      key: 'time',
      label: 'Horário',
    },
    {
      key: 'availability',
      label: 'Disponibilidade',
    },
  ]
</script>

<template>
  <div>
    <template v-if="!schemaError">
      <teacher-details
        :is-pending="getDataPending.isLoading"
        :teacher="teacher"
      />
      <table-time-slot
        :columns="columns"
        :row-pending="upsertPending"
        :rows="teacherAvailability"
        :teacher-id="parsedId"
        title="Disponibilidades"
        @handle-availability="handleAvailability"
      />
    </template>
    <div v-else>
      <error-data-invalid
        :message="schemaError.errors[0]?.message"
        :title="schemaError.errors[0]?.code"
      />
    </div>
  </div>
</template>
