import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericGet = <RowType>(tableName: Tables, schema: ZodSchema) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: getPending, setPendingState } = useHelpers()
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
        const parsedData = schema.parse(newData)
        data.value = parsedData
      }
    }, `get-${tableName}`)
  }

  return { getPending, getById, data }
}

export default useGenericGet
