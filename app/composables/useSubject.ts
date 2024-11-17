import type { Database } from '~/types/supabase'
import type { SubjectInsert, SubjectRow } from '~/types'
import { subjectInsertSchema } from '~/schemas'

const useSubject = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()

  const addSubject = async (data: SubjectInsert) => {
    return setPendingState(async () => {
      const parsedData = subjectInsertSchema.parse(data)
      console.log(parsedData)
      const { data: newSubject, error } = await supabase
        .from('subjects')
        .insert(parsedData)
        .select()
        .returns<SubjectRow[]>()
        .single()
      if (error) throw error
      return newSubject
    }, 'addSubject')
  }
  return { isPending, addSubject }
}

export default useSubject
