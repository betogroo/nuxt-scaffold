import type { ZodError } from 'zod'
import {
  addFormSchema,
  viewFormSchema,
  type AddForm,
  type ViewForm,
} from '~/models/form'
const { delay, getRandomUUID } = useHelpers()

const fakeUsers = ref<ViewForm[]>([])
const isPending = ref<boolean>(false)
const createFakeUser = (formData: AddForm) => {
  return viewFormSchema.parse({
    ...formData,
    id: getRandomUUID(),
    created_at: new Date().toISOString(),
  })
}

const useRegistration = () => {
  const addUser = async (data: AddForm) => {
    isPending.value = true
    console.log('Simulando um cadastro')
    await delay(2000, 'Testing addData')

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
      isPending.value = false
    }
  }
  return { addUser, fakeUsers, isPending }
}

export default useRegistration
