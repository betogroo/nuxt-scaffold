const useAuth = () => {
  const supabase = useSupabaseClient()
  const isPending = ref(false)
  const success = ref(false)
  const { delay, showToast } = useHelpers()

  const handleLogin = async (email: string) => {
    isPending.value = true
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
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
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }
  return { isPending, success, handleLogout, handleLogin }
}

export default useAuth
