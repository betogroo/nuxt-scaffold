<script setup lang="ts">
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')

  const { isPending, handleLogin } = useAuth()
  const email = ref<string>('luizhumberto@gmail.com')
  const password = ref<string>('123456')
</script>

<template>
  <div
    class="flex items-center justify-center h-screen w-screen overflow-hidden"
  >
    <AppCard
      class="w-72 lg:w-96"
      ring="green"
      title="Login"
      ><form @submit.prevent="handleLogin(email, password)">
        <UFormGroup
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
            icon="mdi-login"
            :loading="isPending"
            type="submit"
            >Login</UButton
          >
        </div>
      </form>
    </AppCard>
  </div>
</template>
