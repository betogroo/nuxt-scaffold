import { teacherInsertSchema } from '~/schemas'
import type { TeacherInsert, TeacherRow } from '~/types'

const useTeacher = () => {
  const { isPending, addInsert: addTeacher } = useInsert<
    TeacherInsert,
    TeacherRow
  >('teachers', teacherInsertSchema)
  return { isPending, addTeacher }
}

export default useTeacher
