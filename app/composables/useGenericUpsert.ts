import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericUpsert = <InsertType>(
  tableName: Tables,
  onConflict: string[],
  schema: ZodSchema,
) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: upsertPending, setPendingState } = useHelpers()
  const { validateWithSchema } = useSchema()

  const upsert = async (
    data: InsertType,
    pendingRow?: string | number | undefined,
  ) => {
    await setPendingState(
      async () => {
        const parsedData = validateWithSchema(data, schema)
        const onConflictString = onConflict.join(',')
        await supabase.from(tableName).upsert(parsedData, {
          onConflict: onConflictString,
        })
      },
      tableName,
      { itemId: pendingRow },
    )
  }

  return { upsert, upsertPending }
}

export default useGenericUpsert
