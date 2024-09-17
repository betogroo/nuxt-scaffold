import type { ZodError } from 'zod'
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
const isPending = ref<string | null>(null)
const pendingItemId = ref<string | -1>(-1)
const createFakeUser = (formData: AddForm) => {
  return viewFormSchema.parse({
    ...formData,
    id: getRandomUUID(),
    created_at: new Date().toISOString(),
  })
}

const useRegistration = () => {
  const addUser = async (data: AddForm) => {
    isPending.value = 'addingUser'
    console.log('Simulando um cadastro')
    await delay(2000, 'Testing addUser')

    try {
      //throw new Error('Erro simulado no cadastro')
      const parsedFormData = addFormSchema.parse(data)
      const parsedFakedUser = createFakeUser(parsedFormData)
      fakeUsers.value.push(parsedFakedUser)
      console.log(parsedFormData, 'enviado ao db:', fakeUsers.value)
    } catch (err) {
      const e = err as ZodError
      throw e
    } finally {
      isPending.value = null
    }
  }

  const deleteUser = async (id: string) => {
    isPending.value = 'deletingUser'
    pendingItemId.value = id
    console.log('Simulando a exclusão do item')
    await delay(2000, 'Testing deleteUser')
    try {
      console.log(id)
      fakeUsers.value = fakeUsers.value.filter((item) => item.id !== id)
    } catch (err) {
      const e = err as Error
      console.log(e)
    } finally {
      isPending.value = null
    }
  }
  return { addUser, deleteUser, fakeUsers, isPending, pendingItemId }
}

export default useRegistration
