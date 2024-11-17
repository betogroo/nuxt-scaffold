import type { Database } from '~/types/supabase'
import type { TeacherInsert, TeacherRow } from '~/types'
import { teacherInsertSchema } from '~/schemas'

const useTeacher = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()

  const addTeacher = async (data: TeacherInsert) => {
    return setPendingState(async () => {
      const parsedData = teacherInsertSchema.parse(data)
      console.log(parsedData)
      const { data: newTeacher, error } = await supabase
        .from('teachers')
        .insert(parsedData)
        .select()
        .returns<TeacherRow[]>()
        .single()
      if (error) throw error
      return newTeacher
    }, 'addTeacher')
  }
  return { isPending, addTeacher }
}

export default useTeacher
