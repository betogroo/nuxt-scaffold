<script setup lang="ts">
  const { params } = useRoute()

  const { getById, getDataPending, teacher } = useTeacher()

  onMounted(async () => {
    try {
      await getById(params.id + '')
    } catch (error) {
      console.log(error)
    }
  })
</script>

<template>
  <div>
    <div>Detalhes da demanda {{ params.id }}</div>
    <div v-if="getDataPending.isLoading"><USkeleton class="h-8" /></div>
    <div v-else>{{ teacher }}</div>
  </div>
</template>
