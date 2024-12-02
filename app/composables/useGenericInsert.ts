//import type { Database } from '~/types/supabase'
import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericInsert = <InsertType, RowType>(
  tableName: Tables, //ver refatoração
  schema: ZodSchema,
) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: insertPending, setPendingState } = useHelpers()

  const insert = async (data: InsertType) => {
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
  return { insertPending, insert }
}

export default useGenericInsert
