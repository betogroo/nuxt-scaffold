import type { AddUser, ViewUser } from '~/types'
import { addUserSchema, viewUserSchema } from '~/schemas'

const fakeUsers = ref<ViewUser[]>([])

const useRegistration = () => {
  const { isPending, setPendingState } = useHelpers()
  const { getRandomUUID } = useHelpers()
  const addUser = async (data: AddUser) => {
    await setPendingState(async () => {
      const parsedFormData = addUserSchema.parse(data)
      const parsedFakedUser = createFakeUser(parsedFormData)
      fakeUsers.value = [...fakeUsers.value, parsedFakedUser]
      console.log(parsedFormData, 'enviado ao db:', fakeUsers.value)
    }, 'addUser')
  }

  const deleteUser = async (id: string) => {
    await setPendingState(
      async () => {
        fakeUsers.value = fakeUsers.value.filter((item) => item.id !== id)
      },
      'deleteUser',
      { itemId: id, delay: 500 },
    )
  }
  const createFakeUser = (formData: AddUser) => {
    return viewUserSchema.parse({
      ...formData,
      id: getRandomUUID(),
      created_at: new Date().toISOString(),
    })
  }
  return { addUser, deleteUser, fakeUsers, isPending }
}

export default useRegistration
