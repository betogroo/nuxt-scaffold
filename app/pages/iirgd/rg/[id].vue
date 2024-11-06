<script setup lang="ts">
  const { params } = useRoute()
</script>

<template>
  <div>Detalhes da demanda {{ params.id }}</div>
</template>
