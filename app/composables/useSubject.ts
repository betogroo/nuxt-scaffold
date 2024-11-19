import { subjectInsertSchema } from '~/schemas'
import type { SubjectInsert, SubjectRow } from '~/types'
const useSubject = () => {
  const { insertPending, insertData: insertSubject } = useGenericInsert<
    SubjectInsert,
    SubjectRow
  >('subjects', subjectInsertSchema)
  return { insertPending, insertSubject }
}

export default useSubject
