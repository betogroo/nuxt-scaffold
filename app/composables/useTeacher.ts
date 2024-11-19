import { teacherInsertSchema, teacherRowsSchema } from '~/schemas'
import type { TeacherInsert, TeacherRow } from '~/types'
import useGenericFetch from './useGenericFetch'

const useTeacher = () => {
  const { isPending, addInsert: addTeacher } = useInsert<
    TeacherInsert,
    TeacherRow
  >('teachers', teacherInsertSchema)

  const {
    isPending: dataPending,
    fetch,
    fetchedData,
  } = useGenericFetch<TeacherRow>('teachers', teacherRowsSchema)
  return { isPending, addTeacher, dataPending, fetch, fetchedData }
}

export default useTeacher
