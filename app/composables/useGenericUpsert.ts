import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericUpsert = <InsertType>(
  tableName: Tables,
  onConflict: string[],
  schema: ZodSchema,
) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: upsertPending, setPendingState } = useHelpers()

  const upsertData = async (data: InsertType) => {
    await setPendingState(async () => {
      const parsedData = schema.parse(data)
      const onConflictString = onConflict.join(',')
      await supabase.from(tableName).upsert(parsedData, {
        onConflict: onConflictString,
      })
    }, tableName)
  }

  return { upsertData, upsertPending }
}

export default useGenericUpsert
