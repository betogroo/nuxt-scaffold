<script setup lang="ts">
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')

  const { success, isPending, handleLogin } = useAuth()
  const email = ref<string>('')
</script>

<template>
  <div
    class="flex items-center justify-center h-screen w-screen overflow-hidden"
  >
    <AppCard
      class="w-72 lg:w-96"
      ring="green"
      :title="success ? 'Email Enviado' : 'Login'"
      ><form
        v-if="!success"
        @submit.prevent="handleLogin(email)"
      >
        <UFormGroup
          help="Você receberá um link para o acesso."
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
        <div class="flex justify-end">
          <UButton
            icon="mdi-login"
            :loading="isPending"
            type="submit"
            >Login</UButton
          >
        </div>
      </form>
      <div
        v-else
        class="text-justify"
      >
        <p class="mb-4">
          Enviamos um email para <strong>rmsil@email.com</strong> com o link
          para o login.
        </p>
        <p><strong>Importante:</strong> O Link expirará em 5 minutos.</p>
      </div>
    </AppCard>
  </div>
</template>
