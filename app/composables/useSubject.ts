import { subjectInsertSchema, subjectRowsSchema } from '~/schemas'
import type { SubjectInsert, SubjectRow } from '~/types'
const useSubject = () => {
  const { insertPending, insert: insertSubject } = useGenericInsert<
    SubjectInsert,
    SubjectRow
  >('subjects', subjectInsertSchema)

  const {
    fetchPending,
    fetch,
    data: subjects,
  } = useGenericFetch<SubjectRow>('subjects', subjectRowsSchema)

  return { insertPending, insertSubject, fetchPending, fetch, subjects }
}

export default useSubject
