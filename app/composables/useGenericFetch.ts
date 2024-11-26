import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericFetch = <RowType>(tableName: Tables, schema: ZodSchema) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: fetchPending, setPendingState } = useHelpers()
  const data = ref<RowType[]>([])

  const fetch = async (orderBy?: { column?: string; ascending?: boolean }) => {
    return setPendingState(async () => {
      const column = orderBy?.column || 'id'
      const ascending = orderBy?.ascending ?? true
      const { data: newData, error } = await supabase
        .from(tableName)
        .select('*')
        .order(column, { ascending })
        .returns<RowType>()
      if (error) throw error
      if (newData) {
        const parsedData = schema.parse(newData)
        data.value = parsedData
      }
    }, `fetch-${tableName}`)
  }
  return { fetchPending, data, fetch }
}

export default useGenericFetch
