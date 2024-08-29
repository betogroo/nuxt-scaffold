import type { ZodError } from 'zod'
import { addFormSchema, type AddForm } from '~/models/form'
const { delay } = useHelpers()

const fakeUsers = ref<AddForm[]>([])
const useRegistration = () => {
  const addUser = async (data: AddForm) => {
    console.log('Simulando um cadastro')
    await delay(2000, 'Testing addData')
    try {
      const parsedData = addFormSchema.parse(data)
      //throw new Error('Erro simulado no cadastro')
      fakeUsers.value.push(parsedData)
      if (!parsedData) throw Error('Não foi possível cadastrar')
      console.log(parsedData, 'enviado ao db', fakeUsers.value)
    } catch (err) {
      const e = err as ZodError
      throw e
    }
  }
  return { addUser, fakeUsers }
}

export default useRegistration
