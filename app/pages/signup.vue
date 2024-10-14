<script setup lang="ts">
  import type { UserCredencial } from '~/types'
  import { useField, useForm } from 'vee-validate'
  import { validationCredencial } from '~/types'
  definePageMeta({
    showInNavBar: false,
    requiresAuth: false,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')
  const {
    isPending,
    success,
    handleSignUp,
    remainingTime,
    resendEmailConfirmation,
  } = useAuth()
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

  const signup = handleSubmit(async () => {
    handleSignUp(values)
  })
</script>

<template>
  <div
    class="flex items-center justify-center h-screen w-screen overflow-hidden"
  >
    <AppCard
      class="w-72 lg:w-96"
      ring="green"
      title="Cadastro"
    >
      <div v-if="!success">
        <form @submit.prevent="signup">
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
              :loading="isPending"
              type="submit"
              >Cadastrar</UButton
            >
          </div>
        </form>
        <div>Já é cadastrado? <ULink to="/login">Faça Login</ULink></div>
      </div>
      <div v-else>
        <p>
          Um link para confirmação de cadastro foi enviado para o email
          {{ success }}
        </p>
        <p>Aguarde alguns instantes, por favor.</p>
        <UButton
          :disabled="remainingTime > 0"
          :loading="isPending"
          @click="resendEmailConfirmation(success)"
          >Reenviar</UButton
        >
      </div>
    </AppCard>
  </div>
</template>
