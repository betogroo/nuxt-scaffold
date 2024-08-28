<script setup lang="ts">
  import { useCounterStore } from '~/store/useCounterStore'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Contador',
    order: 2,
  })

  const store = useCounterStore()
  const { displayNumber, isDisabled } = storeToRefs(store)
  const { increaseValue, decreaseValue } = store
</script>

<template>
  <div class="flex h-lvh items-center">
    <UContainer
      class="bg-gray-50 flex flex-col border-2 border-black border-dashed rounded-xl"
    >
      <div class="mx-auto text-8xl">{{ displayNumber }}</div>
      <div class="flex justify-center space-x-5 m-6">
        <UButton
          :color="isDisabled ? 'gray' : 'red'"
          :disabled="isDisabled"
          icon="i-heroicons:minus-16-solid"
          size="xl"
          square
          variant="solid"
          @click="decreaseValue"
        />
        <UButton
          icon="i-heroicons:plus-16-solid"
          size="xl"
          square
          variant="outline"
          @click="increaseValue"
        />
      </div>
      <div class="flex flex-col w-full px-2">
        <UButton
          block
          color="red"
          :disabled="isDisabled"
          @click="store.$reset"
          >Reset</UButton
        >
        <div class="text-justify mt-4">
          Vá para
          <ULink
            class="font-semibold hover:underline mb-4"
            to="/about"
            >About</ULink
          >
          para testar o funcionamento do Pinia
        </div>
      </div>
    </UContainer>
  </div>
</template>
