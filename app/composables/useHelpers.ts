import { ZodError } from 'zod'
import { v4 as uuid } from 'uuid'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { ViewUser, PendingState, SelectOption } from '~/types'

const useHelpers = () => {
  const toast = useToast()
  type CustomError = {
    type: 'validation' | 'database' | 'unknown'
    message: string
    details?: string[]
  }

  const getRandomUUID = (): string => uuid()
  const genFakeUser = (): ViewUser => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const fullName = faker.person.fullName({ firstName, lastName })
    const email = faker.internet.email({ firstName, lastName })
    return {
      name: fullName,
      email: email,
      id: faker.string.uuid(),
      created_at: faker.date.recent().toISOString(),
    }
  }
  const genFakeUsers = (fakeUsersAmount: number = 10): ViewUser[] => {
    return Array.from({ length: fakeUsersAmount }, () => genFakeUser())
  }

  const handleError = (err: unknown): CustomError => {
    if (err instanceof ZodError) {
      // Erros de validação do Zod
      const messages = err.errors.map(
        (e) => `${e.path.join('.')}: ${e.message}`,
      )
      return {
        type: 'validation',
        message: 'Erro de validação nos dados fornecidos.',
        details: messages,
      }
      /*  } else if (err instanceof PostgrestError) {
      // Erros do Supabase
      return {
        type: 'database',
        message: `Erro de banco de dados: ${err.message}`,
        details: [err.hint || ''],
      } */
    } else if (err instanceof Error) {
      // Outros erros que são instâncias de Error
      return {
        type: 'unknown',
        message: `Erro inesperado: ${err.message}`,
      }
    } else {
      // Erros não identificados
      return {
        type: 'unknown',
        message: 'Um erro desconhecido ocorreu.',
      }
    }
  }

  const delay = (time = 800, msg: boolean | string = false): Promise<void> => {
    if (msg) console.log(`${msg} - ${time}ms delay`)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const isDevelopment = () => process.env.NODE_ENV !== 'production'

  const simulateDelayInDevelopment = async () => {
    if (isDevelopment()) {
      await delay(2000, 'Delay for testing...')
    }
  }

  const showToast = (
    type: 'success' | 'error',
    title: string,
    timeout = 1500,
  ): void => {
    const color = type === 'success' ? 'green' : 'red'
    const icon =
      type === 'success' ? iconOutline.checkCircle : iconOutline.exclamation
    toast.add({
      color,
      title,
      icon,
      timeout,
    })
  }

  const isPending = ref<PendingState>({
    action: null,
    itemId: null,
    isLoading: false,
  })
  const error = ref()
  const setPendingState = async <T>(
    fn: () => Promise<T>,
    action: string,
    itemId: number | string | null = null,
  ): Promise<T> => {
    isPending.value = { action, itemId, isLoading: true }
    await simulateDelayInDevelopment()
    try {
      return await fn() // Executa a função passada como argumento (a operação principal)
    } catch (err) {
      error.value = err
      console.log(err)
      throw err // Propaga o erro, se houver
    } finally {
      isPending.value = { action: null, itemId: null, isLoading: false }
    }
  }

  const getOptionName = <T>(value: T, options: SelectOption<T>[]): string => {
    const option = options.find((option) => option.value === value)
    return option ? option.name : 'Outros'
  }

  const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase() + s.slice(1)
  return {
    isPending,
    capitalize,
    delay,
    genFakeUser,
    genFakeUsers,
    getOptionName,
    getRandomUUID,
    handleError,
    isDevelopment,
    setPendingState,
    showToast,
    simulateDelayInDevelopment,
  }
}

export default useHelpers
