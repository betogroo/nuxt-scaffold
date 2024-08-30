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
const useRegistration = () => {
  const addUser = async (data: AddForm) => {
    isPending.value = true
    console.log('Simulando um cadastro')
    await delay(2000, 'Testing addData')

    try {
      //throw new Error('Erro simulado no cadastro')
      const parsedData = addFormSchema.parse(data)
      const parsedFakedUser = viewFormSchema.parse({
        ...parsedData,
        id: getRandomUUID(),
        created_at: new Date().toISOString(),
      })
      /* if (!parsedData || !parsedFakedUser)
        throw Error('Não foi possível cadastrar') */
      fakeUsers.value.push(parsedFakedUser)
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
