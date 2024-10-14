<script setup lang="ts">
  import type { UserCredencial, CredencialType } from '~/types'
  import { useField, useForm } from 'vee-validate'
  import { validationCredencial } from '~/types'

  interface Props {
    type: CredencialType
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [values: UserCredencial]
  }>()

  const { type, isPending } = toRefs(props)

  const label = ref(type.value === 'login' ? 'Login' : 'Cadastrar')

  const userCredencial = ref<UserCredencial>({
    email: '',
    password: '',
  })

  const { values, handleSubmit, meta } = useForm<UserCredencial>({
    validationSchema: validationCredencial,
    initialValues: userCredencial.value,
  })

  const { value: email, errorMessage: emailError } = useField<string>('email')
  const { value: password, errorMessage: passwordError } =
    useField<string>('password')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
  })
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UFormGroup
      :error="emailError"
      label="Email"
      required
      size="2xs"
    >
      <UInput
        v-model="email"
        icon="mdi-email-outline"
        placeholder="email.exemplo.com.br"
        size="md"
      />
    </UFormGroup>
    <UFormGroup
      :error="passwordError"
      label="Senha"
      required
      size="2xs"
    >
      <UInput
        v-model="password"
        icon="mdi-lock-outline"
        placeholder="Digite sua senha"
        size="md"
        type="password"
      />
    </UFormGroup>
    <div class="flex justify-end">
      <UButton
        :disabled="!meta.valid"
        icon="mdi-account-plus-outline"
        :label="label"
        :loading="isPending"
        type="submit"
      />
    </div>
  </form>
</template>
