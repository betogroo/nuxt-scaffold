const useAuth = () => {
  const supabase = useSupabaseClient()
  const isPending = ref(false)
  const success = ref<string | false>(false)
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

  const handleSignUp = async (email: string, password: string) => {
    isPending.value = true
    try {
      await delay(3000)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      showToast(
        'success',
        `Um link de confirmação foi enviado para ${data.user?.email}`,
      )
      success.value = data.user?.email || 'cadastrado'
    } catch (err) {
      const e = err as Error
      showToast('error', 'Erro ao Cadastrar')
      console.log(e)
    } finally {
      isPending.value = false
    }
  }
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return { isPending, success, handleLogout, handleLogin, handleSignUp }
}

export default useAuth
