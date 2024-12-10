import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericUpdate = <UpdateType>(
  tableName: Tables,

  schema: ZodSchema,
) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: updatePending, setPendingState } = useHelpers()
  const { validateWithSchema } = useSchema()

  const update = async (
    id: string | number,
    data: UpdateType,
    pendingRow?: string | number | undefined,
  ) => {
    await setPendingState(
      async () => {
        const parsedData = validateWithSchema(data, schema)
        const { error } = await supabase
          .from(tableName)
          .update(parsedData)
          .eq('id', id)
        if (error) throw error
      },
      tableName,
      { itemId: pendingRow, delay: 5000 },
    )
  }

  return { update, updatePending }
}

export default useGenericUpdate
