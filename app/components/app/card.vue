<script setup lang="ts">
  interface Props {
    title: string
    subtitle?: string
  }
  defineProps<Props>()
</script>

<template>
  <UCard class="my-2">
    <template #header>
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <h2
        v-if="subtitle"
        class="text-xl"
      >
        {{ subtitle }}
      </h2>
    </template>
    <div class="text-justify">
      <slot />
    </div>
  </UCard>
</template>
