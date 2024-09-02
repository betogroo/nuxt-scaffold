<script setup lang="ts">
  interface Props {
    title: string
  }
  defineProps<Props>()
</script>

<template>
  <UCard class="my-2">
    <template #header>
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
    </template>
    <div class="text-justify">
      <slot />
    </div>
  </UCard>
</template>
