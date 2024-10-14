<script setup lang="ts">
  import type { UserCredencial } from '~/types'
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')

  const { isPending, handleLogin } = useAuth()
  const userCredencial = ref<UserCredencial>({
    email: '',
    password: '',
  })
</script>

<template>
  <div
    class="flex items-center justify-center h-screen w-screen overflow-hidden"
  >
    <AppCard
      class="w-72 lg:w-96"
      ring="green"
      title="Login"
      ><form
        class="mb-3"
        @submit.prevent="handleLogin(userCredencial)"
      >
        <UFormGroup
          label="Email"
          required
          size="2xs"
        >
          <UInput
            v-model="userCredencial.email"
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
            v-model="userCredencial.password"
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
      <div>
        Ainda não é cadastrado? <ULink to="/signup">Clique aqui!</ULink>
      </div>
    </AppCard>
  </div>
</template>
