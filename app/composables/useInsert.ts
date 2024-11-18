//import type { Database } from '~/types/supabase'
import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useInsert = <InsertType, RowType>(
  tableName: Tables, //ver refatoração
  schema: ZodSchema,
) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()

  const addInsert = async (data: InsertType) => {
    return setPendingState(async () => {
      const parsedData = schema.parse(data)
      const { data: newInsert, error } = await supabase
        .from(tableName)
        .insert(parsedData)
        .select()
        .returns<RowType[]>()
        .single()
      if (error) throw error
      return newInsert
    }, `add-${tableName}`)
  }
  return { isPending, addInsert }
}

export default useInsert
