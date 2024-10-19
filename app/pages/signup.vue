<script setup lang="ts">
  import type { UserSignup } from '~/types'
  const { showToast, handleError } = useHelpers()

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

  const signup = async (credential: UserSignup) => {
    try {
      await handleSignUp(credential)
    } catch (error) {
      const err = handleError(error)
      showToast('error', err.message)
    }
  }
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
        <FormCredencial
          :is-pending="
            isPending.isLoading && isPending.action === 'handleSignUp'
          "
          type="signup"
          @on-submit="signup"
        />
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
          :loading="
            isPending.isLoading &&
            isPending.action === 'resendEmailConfirmation'
          "
          @click="resendEmailConfirmation(success)"
          >Reenviar</UButton
        >
      </div>
    </AppCard>
  </div>
</template>
