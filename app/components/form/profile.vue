<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { ProfileUpdate } from '~/types'
  import { validateProfile } from '~/schemas'

  interface Props {
    isPending?: boolean
    initialValues: ProfileUpdate
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [values: ProfileUpdate]
    'on-cancel': []
  }>()
  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<ProfileUpdate>({
    validationSchema: validateProfile,
    initialValues: props.initialValues,
  })

  const { value: name, errorMessage: nameError } =
    useField<ProfileUpdate['name']>('name')
  const { value: username, errorMessage: usernameError } =
    useField<ProfileUpdate['username']>('username')
  const { value: email, errorMessage: emailError } =
    useField<ProfileUpdate['email']>('email')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
  })
</script>

<template>
  <form
    class="pa-2 ma-2"
    @submit.prevent="onSubmit"
  >
    <UFormGroup
      :error="nameError"
      label="Nome"
      required
    >
      <UInput v-model="name" />
    </UFormGroup>
    <UFormGroup
      :error="usernameError"
      label="Username"
      required
    >
      <UInput v-model="username" />
      <UFormGroup
        :error="emailError"
        label="Email"
        required
      >
        <UInput v-model="email" />
      </UFormGroup>

      <div class="flex justify-start space-x-2 mt-2">
        <UButton
          :disabled="!meta.valid"
          :loading="isPending"
          type="submit"
          >Enviar</UButton
        >
        <UButton
          color="red"
          :disabled="!meta.valid"
          :loading="isPending"
          variant="outline"
          @click="$emit('on-cancel')"
          >Cancelar</UButton
        >
      </div>
    </UFormGroup>
  </form>
</template>
