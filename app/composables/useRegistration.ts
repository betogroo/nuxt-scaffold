import {
  addFormSchema,
  viewFormSchema,
  type AddForm,
  type ViewForm,
} from '~/models/form'
const { delay, getRandomUUID } = useHelpers()

const fakeUsers = ref<ViewForm[]>([])
const isDevelopment = () => process.env.NODE_ENV !== 'production'

const isPending = reactive({
  addUser: false,
  deleteUser: false,
  pendingItemId: null as string | null,
})
const createFakeUser = (formData: AddForm) => {
  return viewFormSchema.parse({
    ...formData,
    id: getRandomUUID(),
    created_at: new Date().toISOString(),
  })
}

const useRegistration = () => {
  const addUser = async (data: AddForm) => {
    isPending.addUser = true
    if (isDevelopment()) await delay(2000, 'Testing addUser')
    try {
      //throw new Error('Erro simulado no cadastro')
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
    console.log(isDevelopment)
    //throw new Error('Erro simulado ao deletar')
    isPending.deleteUser = true
    isPending.pendingItemId = id
    if (isDevelopment()) await delay(2000, 'Testing deleteUser')
    try {
      fakeUsers.value = fakeUsers.value.filter((item) => item.id !== id)
    } catch (err) {
      const e = err
      throw e
    } finally {
      isPending.deleteUser = false
    }
  }
  return { addUser, deleteUser, fakeUsers, isPending }
}

export default useRegistration
