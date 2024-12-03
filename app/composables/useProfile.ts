import { profileRowSchema } from '~/schemas'
import type { Profile } from '~/types'

const useProfile = () => {
  const { user } = useUserStatus()

  const { data: profile, getById } = useGenericGet<Profile>(
    'profiles',
    profileRowSchema,
  )

  const getProfile = async () => {
    if (!user.value) throw Error('Usuário não identificado')
    await getById(user.value?.id)
    if (profile.value) {
      profile.value = { ...profile.value, email: user.value.email || '' }
    }
  }

  return { profile, getProfile }
}

export default useProfile
