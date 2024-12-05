import { profileRowSchema } from '~/schemas'
import type { Profile } from '~/types'
const { validateWithSchema } = useSchema()

const useProfile = () => {
  const { user } = useUserStatus()

  const { data: profile, getById } = useGenericGet<Profile>(
    'profiles',
    profileRowSchema,
  )

  const getProfile = async () => {
    try {
      if (!user.value) throw Error('Usuário não identificado')
      await getById(user.value.id)
      if (profile.value) {
        profile.value = { ...profile.value, email: user.value.email || '' }
        validateWithSchema<Profile>(profile.value, profileRowSchema)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { profile, getProfile }
}

export default useProfile
