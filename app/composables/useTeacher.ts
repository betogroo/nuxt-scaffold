import { teacherInsertSchema, teacherRowsSchema } from '~/schemas'
import type { TeacherInsert, TeacherRow } from '~/types'

const useTeacher = () => {
  const { insertPending, insertData: insertTeacher } = useGenericInsert<
    TeacherInsert,
    TeacherRow
  >('teachers', teacherInsertSchema)

  const {
    fetchPending,
    fetch,
    data: teachers,
  } = useGenericFetch<TeacherRow>('teachers', teacherRowsSchema)

  return { insertPending, insertTeacher, fetchPending, fetch, teachers }
}

export default useTeacher
