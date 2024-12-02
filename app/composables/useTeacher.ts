import {
  teacherInsertSchema,
  teacherRowsSchema,
  teacherRowSchema,
} from '~/schemas'
import type { TeacherInsert, TeacherRow } from '~/types'

const useTeacher = () => {
  const { insertPending, insert: insertTeacher } = useGenericInsert<
    TeacherInsert,
    TeacherRow
  >('teachers', teacherInsertSchema)

  const {
    fetchPending,
    fetch,
    data: teachers,
  } = useGenericFetch<TeacherRow>('teachers', teacherRowsSchema)

  const {
    getById,
    getDataPending,
    data: teacher,
  } = useGenericGet<TeacherRow>('teachers', teacherRowSchema)

  return {
    insertPending,
    insertTeacher,
    fetchPending,
    fetch,
    teachers,
    getById,
    teacher,
    getDataPending,
  }
}

export default useTeacher
