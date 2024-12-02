import type { Database, Tables } from '~/types'

const useGenericDelete = (tableName: Tables) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: deletePending, setPendingState } = useHelpers()
  const deleteDataById = async (id: string | number) => {
    return setPendingState(
      async () => {
        const { data: deletedData, error } = await supabase
          .from('teacher_availability')
          .delete()
          .eq('id', id)
          .select()
        if (error) throw error
        return deletedData
      },
      `delete-${tableName}`,
      { itemId: id },
    )
  }
  return { deleteDataById, deletePending }
}

export default useGenericDelete
