import type { AddUser, ViewUser } from '~/types'
import { addUserSchema, viewUserSchema } from '~/types'

const fakeUsers = ref<ViewUser[]>([])
const isDevelopment = () => process.env.NODE_ENV !== 'production'
const { isPending, setPendingState } = usePending()

const useRegistration = () => {
  const { delay, getRandomUUID } = useHelpers()
  const addUser = async (data: AddUser) => {
    await setPendingState(async () => {
      if (isDevelopment()) {
        await delay(2000, 'Testing addUser')
        //throw new Error('Erro simulado no cadastro')
      }
      const parsedFormData = addUserSchema.parse(data)
      const parsedFakedUser = createFakeUser(parsedFormData)
      fakeUsers.value = [...fakeUsers.value, parsedFakedUser]
      console.log(parsedFormData, 'enviado ao db:', fakeUsers.value)
    }, 'addUser')
  }

  const deleteUser = async (id: string) => {
    await setPendingState(
      async () => {
        if (isDevelopment()) {
          await delay(2000, 'Testing deleteUser')
          //throw new Error('Erro simulado ao deletar')
        }
        fakeUsers.value = fakeUsers.value.filter((item) => item.id !== id)
      },
      'deleteUser',
      id,
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
