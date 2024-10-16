<script setup lang="ts">
  import type { UserLogin } from '~/types'
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')

  const { isPending, handleLogin } = useAuth()

  const login = async (credential: UserLogin) => {
    await handleLogin(credential)
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
        :is-pending="isPending"
        type="login"
        @on-submit="login"
      />
      <div>
        Ainda não é cadastrado? <ULink to="/signup">Clique aqui!</ULink>
      </div>
    </AppCard>
  </div>
</template>
