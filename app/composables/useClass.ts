import type { Database } from '~/types/supabase'
import type { ClassInsert, ClassRow } from '~/types'
import { classInsertSchema } from '~/schemas'

const useClass = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()

  const addClass = async (data: ClassInsert) => {
    return setPendingState(async () => {
      const parsedData = classInsertSchema.parse(data)
      console.log(parsedData)
      const { data: newClass, error } = await supabase
        .from('classes')
        .insert(parsedData)
        .select()
        .returns<ClassRow[]>()
        .single()
      if (error) throw error
      return newClass
    }, 'addClass')
  }
  return { isPending, addClass }
}

export default useClass
