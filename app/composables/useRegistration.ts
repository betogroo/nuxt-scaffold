import {
  addFormSchema,
  viewFormSchema,
  type AddForm,
  type ViewForm,
} from '~/models/form'

const fakeUsers = ref<ViewForm[]>([])
const isDevelopment = () => process.env.NODE_ENV !== 'production'

const isPending = reactive({
  addUser: false,
  deleteUser: false,
  pendingItemId: null as string | null,
})

const useRegistration = () => {
  const { delay, getRandomUUID } = useHelpers()
  const addUser = async (data: AddForm) => {
    isPending.addUser = true
    if (isDevelopment()) {
      await delay(2000, 'Testing addUser')
      //throw new Error('Erro simulado no cadastro')
    }
    try {
      const parsedFormData = addFormSchema.parse(data)
      const parsedFakedUser = createFakeUser(parsedFormData)
      fakeUsers.value = [...fakeUsers.value, parsedFakedUser]
      console.log(parsedFormData, 'enviado ao db:', fakeUsers.value)
    } catch (err) {
      const e = err
      throw e
    } finally {
      isPending.addUser = false
    }
  }

  const deleteUser = async (id: string) => {
    try {
      isPending.deleteUser = true
      isPending.pendingItemId = id
      if (isDevelopment()) {
        await delay(2000, 'Testing deleteUser')
        //throw new Error('Erro simulado ao deletar')
      }
      fakeUsers.value = fakeUsers.value.filter((item) => item.id !== id)
    } catch (err) {
      const e = err as Error
      throw e
    } finally {
      isPending.deleteUser = false
    }
  }
  const createFakeUser = (formData: AddForm) => {
    return viewFormSchema.parse({
      ...formData,
      id: getRandomUUID(),
      created_at: new Date().toISOString(),
    })
  }
  return { addUser, deleteUser, fakeUsers, isPending }
}

export default useRegistration
