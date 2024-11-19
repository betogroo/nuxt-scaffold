import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericFetch = <RowType>(tableName: Tables, schema: ZodSchema) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()
  const data = ref<RowType[]>([])

  const fetch = async () => {
    return setPendingState(async () => {
      const { data: newData, error } = await supabase
        .from(tableName)
        .select('*')
        .order('id', { ascending: true })
        .returns<RowType>()
      if (error) throw error
      if (newData) {
        const parsedData = schema.parse(newData)
        data.value = parsedData
      }
    }, `fetch-${tableName}`)
  }
  return { isPending, data, fetch }
}

export default useGenericFetch
