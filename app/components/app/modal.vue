<script setup lang="ts" generic="T">
  interface Props {
    title?: string
  }
  defineProps<Props>()

  const isOpen = defineModel<boolean>()
</script>

<template>
  <UModal
    v-model="isOpen"
    width="25"
  >
    <UCard
      :ui="{
        strategy: 'override',
        header: {
          padding: 'py-2 px-2',
        },
        divide: 'divide-none',
        footer: {
          padding: 'pa-0 ma-0',
        },
      }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold">{{ title }}</h1>
          <UButton
            color="black"
            :icon="iconOutline.close"
            size="xs"
            variant="ghost"
            @click="isOpen = false"
          />
        </div>
      </template>
      <slot />
      <template #footer />
    </UCard>
  </UModal>
</template>
