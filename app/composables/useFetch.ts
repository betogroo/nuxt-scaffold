import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useFetch = <RowType>(tableName: Tables, schema: ZodSchema) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()
  const fetchedData = ref<RowType>()

  const fetch = async () => {
    return setPendingState(async () => {
      const { data: newData, error } = await supabase
        .from('document_demand')
        .select('*')
        .order('id', { ascending: true })
        .returns<RowType>()
      if (error) throw error
      if (newData) {
        const parsedData = schema.parse(newData)
        fetchedData.value = parsedData
      }
    }, `fetch-${tableName}`)
  }
  return { isPending, fetchedData, fetch }
}

export default useFetch
