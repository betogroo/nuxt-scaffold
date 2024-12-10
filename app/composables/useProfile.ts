import { profileRowSchema, profileUpdateSchema } from '~/schemas'
import type { Profile, ProfileUpdate } from '~/types'
const { validateWithSchema } = useSchema()

const useProfile = () => {
  const { user } = useUserStatus()
  const { updateEmail, isPending: updateEmailPending } = useAuth()

  const { data: profile, getById } = useGenericGet<Profile>(
    'profiles',
    profileRowSchema,
  )

  const { update, updatePending: updateProfilePending } =
    useGenericUpdate<ProfileUpdate>('profiles', profileUpdateSchema)

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

  const updateProfile = async (data: ProfileUpdate) => {
    const { email, id, ...newData } = data
    if (email) {
      await updateEmail(email)
    }

    if (newData) {
      await update(id!, newData)
    }
  }

  return {
    profile,
    getProfile,
    updateProfile,
    updateEmailPending,
    updateProfilePending,
  }
}

export default useProfile
