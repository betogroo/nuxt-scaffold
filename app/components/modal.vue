<script setup lang="ts">
  interface Props {
    title?: string
  }
  defineProps<Props>()
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <h1 class="page-title">{{ title }}</h1>
      </template>
      <div class="space-y-2">
        <p>This modal was opened programmatically !</p>
      </div>
    </UCard>
  </UModal>
</template>
