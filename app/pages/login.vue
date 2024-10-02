<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
    order: 5,
  })
  useRedirectIfAuthenticated()

  const { delay, showToast } = useHelpers()
  const supabase = useSupabaseClient()
  const email = ref<string>('')

  const success = ref(false)
  const isPending = ref(false)

  const handleLogin = async () => {
    isPending.value = true
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: 'http://localhost:3000/confirm',
        },
      })
      await delay(3000)
      if (!error) {
        showToast('success', 'Email Enviado', 1500)
        await delay(1500)
        success.value = true
      }
    } catch (err) {
      const e = err as Error
      showToast('error', 'Erro ao Autenticar')
      console.log(e)
    } finally {
      isPending.value = false
    }

    isPending.value = false
  }
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
        @submit.prevent="handleLogin"
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
