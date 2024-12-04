import type { ZodError, ZodSchema } from 'zod'

const schemaError = ref<ZodError | false>()
const useSchema = () => {
  const validateWithSchema = <T>(data: T, schema: ZodSchema) => {
    try {
      schemaError.value = false
      return schema.parse(data)
    } catch (error) {
      console.error('Erro de validação: ', error)
      schemaError.value = error as ZodError
      throw error
    }
  }
  return { validateWithSchema, schemaError }
}

export default useSchema
