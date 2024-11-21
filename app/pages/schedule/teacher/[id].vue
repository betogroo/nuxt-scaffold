<script setup lang="ts">
  const { params } = useRoute()
</script>

<template>
  <div>Detalhes do professor {{ params.id }}</div>
</template>
