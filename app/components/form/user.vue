<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import { validationFormSchema } from '~/models/form.js'
  import type { AddForm } from '~/models/form'
  const $emit = defineEmits<{
    onSubmit: [values: AddForm]
  }>()

  const { values, handleSubmit, meta, resetForm } = useForm<AddForm>({
    validationSchema: validationFormSchema,
    initialValues: {
      name: 'lllllllllllll',
      email: 'lllllllllll@ll.com',
    },
  })

  const { value: name, errorMessage: nameError } = useField<string>('name')
  const { value: email, errorMessage: emailError } = useField<string>('email')

  const addData = handleSubmit(async () => {
    //$emit('onSubmit', { name: 'dddd', email: 'emam' })
    $emit('onSubmit', values)
  })
</script>

<template>
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
</template>
