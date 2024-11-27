<script setup lang="ts">
  import type { TableColumn } from '~/types'

  const { params } = useRoute()
  const { validateWithSchema, schemaError } = useSchema()
  const { getById, getDataPending, teacher } = useTeacher()
  const { getTeacherAvailability, teacherAvailability } =
    useTeacherAvailability()
  const { handleError } = useHelpers()
  const parsedId = validateWithSchema(params.id!, uuidSchema)

  onMounted(async () => {
    try {
      await getById(parsedId)
      await getTeacherAvailability(parsedId, 1)
    } catch (error) {
      const err = handleError(error)
      console.log(err)
    }
  })

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Horário',
    },
    {
      key: 'start_time',
      label: 'Início', // fazser merge notemplate
    },
    {
      key: 'end_time',
      label: 'Fim', // fazser merge notemplate
    },
    {
      key: 'availability_id',
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
        :rows="teacherAvailability"
        :teacher-id="parsedId"
        title="Disponibilidades"
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
