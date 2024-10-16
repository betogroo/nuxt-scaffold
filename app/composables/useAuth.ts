import {
  userLoginSchema,
  userSignupSchema,
  type UserLogin,
  type UserSignup,
} from '~/types'
import type { Database, Tables } from '~/types/supabase'
const useAuth = () => {
  const supabase = useSupabaseClient<Database>()
  const isPending = ref(false)
  const success = ref<string | false>(false)
  const remainingTime = ref(90)
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
  const { delay, showToast } = useHelpers()

  const startCountdown = () => {
    intervalId.value = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--
      } else if (intervalId.value !== null) {
        clearInterval(intervalId.value)
      }
    }, 1000)
  }

  const profile = ref<Tables<'profiles'>[]>()
  const testProfile = async () => {
    isPending.value = true
    try {
      const { data, error } = await supabase.from('profiles').select('*')
      if (error) throw error
      if (data) profile.value = data
    } catch (err) {
      const e = err as Error

      console.log(e)
    } finally {
      isPending.value = false
    }
  }

  const handleLogin = async (credencial: UserLogin) => {
    isPending.value = true

    try {
      await delay(3000)
      const parsedData = userLoginSchema.parse(credencial)
      const { email, password } = parsedData
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (err) {
      const e = err as Error
      showToast('error', e.message || 'Erro ao Autenticar')
      console.log(e)
    } finally {
      isPending.value = false
    }

    isPending.value = false
  }

  const handleSignUp = async (credencial: UserSignup) => {
    isPending.value = true
    try {
      await delay(3000)
      const parsedData = userSignupSchema.parse(credencial)
      const { email, password } = parsedData
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      showToast(
        'success',
        `Um link de confirmação foi enviado para ${data.user?.email}`,
      )
      startCountdown()
      success.value = data.user?.email || 'cadastrado'
    } catch (err) {
      const e = err as Error
      showToast('error', e.message || 'Erro ao cadastrar.')
      console.log(e)
    } finally {
      isPending.value = false
    }
  }
  const resendEmailConfirmation = async (email: string) => {
    isPending.value = true
    startCountdown()
    try {
      await delay(3000)
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) throw error

      showToast('success', `Um link de confirmação foi enviado para ${email}`)
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

  return {
    isPending,
    success,
    handleLogout,
    handleLogin,
    handleSignUp,
    remainingTime,
    resendEmailConfirmation,
    testProfile,
    profile,
  }
}

export default useAuth
