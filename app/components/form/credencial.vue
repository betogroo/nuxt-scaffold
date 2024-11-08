<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { UserLogin, UserSignup, CredencialType } from '~/types'
  import { validationLogin, validationSignup } from '~/schemas'

  interface Props {
    type: CredencialType
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [values: UserSignup | UserLogin]
  }>()

  const { type, isPending } = toRefs(props)

  const label = ref(type.value === 'login' ? 'Login' : 'Cadastrar')

  const userCredencial = ref<UserSignup | UserLogin>({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { values, handleSubmit, meta } = useForm<UserLogin | UserSignup>({
    validationSchema:
      type.value === 'login' ? validationLogin : validationSignup,
    initialValues: userCredencial.value,
  })

  const { value: email, errorMessage: emailError } = useField<string>('email')
  const { value: password, errorMessage: passwordError } =
    useField<string>('password')
  const { value: passwordConfirm, errorMessage: passwordConfirmError } =
    useField<string>('passwordConfirm')

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
        :icon="iconOutline.email"
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
        :icon="iconOutline.password"
        placeholder="Digite sua senha"
        size="md"
        type="password"
      />
    </UFormGroup>
    <UFormGroup
      v-if="type === 'signup'"
      :error="passwordConfirmError"
      label="Confirme a senha"
      required
      size="2xs"
    >
      <UInput
        v-model="passwordConfirm"
        :icon="iconOutline.password"
        placeholder="Digite sua senha"
        size="md"
        type="password"
      />
    </UFormGroup>
    <div class="flex justify-end">
      <UButton
        :disabled="!meta.valid"
        :icon="iconOutline.user"
        :label="label"
        :loading="isPending"
        type="submit"
      />
    </div>
  </form>
</template>
