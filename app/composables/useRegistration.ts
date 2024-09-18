import {
  addFormSchema,
  viewFormSchema,
  type AddForm,
  type ViewForm,
} from '~/models/form'
const { delay, getRandomUUID } = useHelpers()

const fakeUsers = ref<ViewForm[]>([
  {
    id: '124325c3-3ab0-4510-aedd-372e31354091',
    created_at: '2024-09-17T18:46:46.033Z',
    name: 'lllllllllllll',
    email: 'lllllllllll@ll.com',
  },
  {
    id: '4125e3d0-17d1-402c-afe9-562c278f47f8',
    created_at: '2024-09-17T18:46:58.830Z',
    name: 'kkkkkkkkk',
    email: 'kkkkkkkkk@ll.com',
  },
])
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
    await delay(2000, 'Testing addUser')
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
    //throw new Error('Erro simulado ao deletar')
    isPending.deleteUser = true
    isPending.pendingItemId = id
    await delay(2000, 'Testing deleteUser')
    try {
      console.log(id)
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
