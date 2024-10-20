import type { UserLogin, UserSignup } from '~/types'
import { userLoginSchema, userSignupSchema } from '~/schemas'
import type { Database, Tables } from '~/types/supabase'
const useAuth = () => {
  const supabase = useSupabaseClient<Database>()
  const success = ref<string | false>(false)
  const remainingTime = ref(90)
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
  const { delay, showToast, isPending, setPendingState } = useHelpers()

  const startCountdown = () => {
    remainingTime.value = 90
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
    await setPendingState(async () => {
      const { data, error } = await supabase.from('profiles').select('*')
      if (error) throw error
      if (data) profile.value = data
    }, 'testProfile')
  }

  const handleLogin = async (credencial: UserLogin) => {
    await setPendingState(async () => {
      const parsedData = userLoginSchema.parse(credencial)
      const { email, password } = parsedData
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    }, 'handleLogin')
  }

  const handleSignUp = async (credencial: UserSignup) => {
    await setPendingState(async () => {
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
    }, 'handleSignUp')
  }
  const resendEmailConfirmation = async (email: string) => {
    await setPendingState(async () => {
      startCountdown()
      await delay(3000)
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) throw error

      showToast('success', `Um link de confirmação foi enviado para ${email}`)
    }, 'resendEmailConfirmation')
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
