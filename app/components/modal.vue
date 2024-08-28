<script setup lang="ts" generic="T">
  import type { AddFormSchema } from '~/models/form'

  interface Props {
    title?: string
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    submit: [state: typeof state]
    close: []
  }>()

  const state = ref<AddFormSchema>({
    name: '',
    email: '',
  })

  const addData = () => {
    $emit('submit', state)
  }

  const close = () => {
    $emit('close')
  }
</script>

<template>
  <UModal width="25">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-semibold">{{ title }}</h1>
      </template>
      <UForm
        :state="state"
        @submit="addData"
      >
        <UFormGroup label="Nome">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <div class="flex justify-end space-x-4">
          <UButton
            label="Enviar"
            type="submit"
          />
          <UButton
            color="red"
            label="Fechar"
            variant="outline"
            @click="close"
          />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
