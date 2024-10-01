<script setup lang="ts">
  interface Props {
    title: string
    subtitle?: string
    ring?: string
    loading?: boolean
  }
  withDefaults(defineProps<Props>(), {
    ring: 'green',
    subtitle: '',
    loading: false,
  })
</script>

<template>
  <UCard
    class="my-2"
    :ui="{
      strategy: 'override',
      divide: 'divide-none',
      ring: `ring-1 ring-${ring}-500 dark:ring-${ring}-800`,
      header: { padding: 'px-2 pt-4 pb-2' },
      body: { padding: 'px-2' },
      footer: { padding: 'px-2 pb-4' },
    }"
  >
    <template #header>
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <h2
        v-if="subtitle"
        class="text-xl"
      >
        {{ subtitle }}
      </h2>
    </template>

    <div class="text-justify pa-0">
      <slot />
    </div>
    <template #footer />
  </UCard>
</template>
