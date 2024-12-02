import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericGet = <RowType>(tableName: Tables, schema: ZodSchema) => {
  const supabase = useSupabaseClient<Database>()
  const { validateWithSchema } = useSchema()
  const { isPending: getDataPending, setPendingState } = useHelpers()
  const data = ref<RowType | null>(null)

  const getById = async (id: string) => {
    return setPendingState(async () => {
      const { data: newData, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .returns<RowType>()
        .single()

      if (error) throw error

      if (newData) {
        const parsedData = validateWithSchema(newData, schema)
        data.value = parsedData
      }
    }, `get-${tableName}`)
  }

  const getWithFilters = async (
    filters: Record<string, string | number> = {},
  ) => {
    return setPendingState(async () => {
      let query = supabase.from(tableName).select('*')
      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value)
      }
      const { data: newData, error } = await query.returns<RowType>()
      if (error) throw error
      if (newData) {
        const parsedData = validateWithSchema(newData, schema)
        data.value = parsedData
      }
    }, `get-${tableName}`)
  }

  return { getDataPending, getById, getWithFilters, data }
}

export default useGenericGet
