<script setup lang="ts" generic="T">
  import { useField, useForm } from 'vee-validate'
  import { validationFormSchema } from '~/models/form.js'
  import type { AddForm } from '~/models/form'
  import type { _padding } from '#tailwind-config/theme'

  interface Props {
    title?: string
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    submit: [values: AddForm]
    close: []
  }>()

  const { values, handleSubmit, meta, resetForm } = useForm<AddForm>({
    validationSchema: validationFormSchema,
  })

  const { value: name, errorMessage: nameError } = useField<string>('name')
  const { value: email, errorMessage: emailError } = useField<string>('email')

  const addData = handleSubmit(async () => {
    $emit('submit', values)
  })

  const close = () => {
    $emit('close')
  }
</script>

<template>
  <UModal width="25">
    <UCard
      :ui="{
        header: {
          padding: 'py-2',
        },
      }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold">{{ title }}</h1>
          <UButton
            color="black"
            icon="mdi-close"
            size="xs"
            variant="ghost"
            @click="close"
          />
        </div>
      </template>
      <form @submit.prevent="addData">
        <UFormGroup
          :error="nameError"
          label="Nome"
        >
          <UInput v-model="name" />
        </UFormGroup>

        <UFormGroup
          :error="emailError"
          label="Email"
        >
          <UInput v-model="email" />
        </UFormGroup>

        <div class="flex justify-end space-x-4">
          <UButton
            :disabled="!meta.valid"
            label="Enviar"
            type="submit"
          />
          <UButton
            color="red"
            label="Limpar"
            variant="outline"
            @click="resetForm()"
          />
        </div>
      </form>
    </UCard>
  </UModal>
</template>
