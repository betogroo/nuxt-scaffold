<script setup lang="ts">
  import type { UserLogin } from '~/types'
  const { showToast, handleError } = useHelpers()
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')

  const { isPending, handleLogin } = useAuth()

  const login = async (credential: UserLogin) => {
    try {
      await handleLogin(credential)
    } catch (error) {
      const err = handleError(error)
      console.error(err)
      showToast('error', 'Usuário ou Senha incorretos')
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
      title="Login"
    >
      <FormCredencial
        :is-pending="isPending.isLoading && isPending.action === 'handleLogin'"
        type="login"
        @on-submit="login"
      />
      <div>
        Ainda não é cadastrado? <ULink to="/signup">Clique aqui!</ULink>
      </div>
    </AppCard>
  </div>
</template>
