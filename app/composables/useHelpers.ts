import { ZodError } from 'zod'
import { v4 as uuid } from 'uuid'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { ViewUser } from '~/types'

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

  const showToast = (
    type: 'success' | 'error',
    title: string,
    timeout = 1500,
  ): void => {
    const color = type === 'success' ? 'green' : 'red'
    const icon =
      type === 'success'
        ? 'i-heroicons-check-circle'
        : 'i-heroicons-exclamation-circle'
    toast.add({
      color,
      title,
      icon,
      timeout,
    })
  }
  return {
    delay,
    handleError,
    getRandomUUID,
    genFakeUser,
    genFakeUsers,
    showToast,
  }
}

export default useHelpers
