<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import { validationUserSchema } from '~/schemas'
  import type { AddUser } from '~/types'

  import { fakerPT_BR as faker } from '@faker-js/faker'

  interface Props {
    isPending?: boolean
  }

  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    onSubmit: [values: AddUser]
  }>()

  const { values, handleSubmit, meta, resetForm } = useForm<AddUser>({
    validationSchema: validationUserSchema,
    // fake pre-filled form
    initialValues: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
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
        :loading="isPending"
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
