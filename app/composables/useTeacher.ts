import { teacherInsertSchema, teacherRowsSchema } from '~/schemas'
import type { TeacherInsert, TeacherRow } from '~/types'
import useGenericFetch from './useGenericFetch'

const useTeacher = () => {
  const { isPending, addData: addTeacher } = useGenericInsert<
    TeacherInsert,
    TeacherRow
  >('teachers', teacherInsertSchema)

  const {
    isPending: dataPending,
    fetch,
    data,
  } = useGenericFetch<TeacherRow>('teachers', teacherRowsSchema)
  return { isPending, addTeacher, dataPending, fetch, data }
}

export default useTeacher
