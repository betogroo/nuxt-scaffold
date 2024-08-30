import { ZodError } from 'zod'
import { v4 as uuid } from 'uuid'
//import { PostgrestError } from '@supabase/supabase-js'
const useHelpers = () => {
  type CustomError = {
    type: 'validation' | 'database' | 'unknown'
    message: string
    details?: string[]
  }

  const getRandomUUID = () => {
    return uuid()
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
  return { delay, handleError, getRandomUUID }
}

export default useHelpers
