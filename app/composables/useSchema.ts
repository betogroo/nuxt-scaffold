import type { ZodError, ZodSchema } from 'zod'

const schemaError = ref<ZodError>()
const useSchema = () => {
  const validateWithSchema = (data: unknown, schema: ZodSchema) => {
    try {
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
