<script setup lang="ts" generic="T">
  import { useField, useForm } from 'vee-validate'
  import { validationFormSchema } from '~/models/form.js'
  import type { AddForm } from '~/models/form'

  interface Props {
    title?: string
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    submit: [values: AddForm]
    close: []
  }>()

  const state = ref<AddForm>({
    name: '',
    email: '',
  })

  const { values, handleSubmit, meta, resetForm } = useForm<AddForm>({
    validationSchema: validationFormSchema,
  })

  //const name = useField('name', validationFormSchema)
  //const email = useField('email', validationFormSchema)
  const { value: name, errorMessage: nameError } = useField(
    'name',
    validationFormSchema,
  )
  const { value: email, errorMessage: emailError } = useField('email')

  const addData = handleSubmit(async () => {
    state.value = {
      name: name.value as string,
      email: email.value as string,
    }
    $emit('submit', state.value)
  })

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
      <form @submit.prevent="addData">
        <UFormGroup
          :error="nameError"
          label="Nome"
        >
          <UInput v-model="name as string" />
        </UFormGroup>

        <UFormGroup
          :error="emailError"
          label="Email"
        >
          <UInput v-model="email as string" />
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
    {{ values }}
  </UModal>
</template>
