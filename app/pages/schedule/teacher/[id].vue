<script setup lang="ts">
  const { params } = useRoute()
  const { validateWithSchema, schemaError } = useSchema()
  const { getById, getDataPending, teacher } = useTeacher()
  const { handleError } = useHelpers()

  onMounted(async () => {
    try {
      const parsedId = validateWithSchema(params.id!, uuidSchema)
      await getById(parsedId)
    } catch (error) {
      const err = handleError(error)
      console.log(err)
    }
  })
</script>

<template>
  <div>
    <template v-if="!schemaError">
      <teacher-details
        :is-pending="getDataPending.isLoading"
        :teacher="teacher"
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
