import type { ZodError } from 'zod'
import { addFormSchema, type AddForm, type ViewForm } from '~/models/form'
const { delay, getRandomUUID } = useHelpers()

const fakeUsers = ref<ViewForm[]>([])
const isPending = ref<boolean>(false)
const useRegistration = () => {
  const addUser = async (data: AddForm) => {
    isPending.value = true
    console.log('Simulando um cadastro')
    await delay(2000, 'Testing addData')
    try {
      const parsedData = addFormSchema.parse(data)
      if (!parsedData) throw Error('Não foi possível cadastrar')
      //throw new Error('Erro simulado no cadastro')
      fakeUsers.value.push({
        ...parsedData,
        id: getRandomUUID(),
        created_at: new Date().toISOString(),
      })
      console.log(parsedData, 'enviado ao db', fakeUsers.value)
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
