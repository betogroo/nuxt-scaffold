const useAuth = () => {
  const supabase = useSupabaseClient()
  const isPending = ref(false)
  const { delay, showToast } = useHelpers()

  const handleLogin = async (email: string, password: string) => {
    isPending.value = true
    try {
      await delay(3000)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
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

  return { isPending, handleLogout, handleLogin }
}

export default useAuth
