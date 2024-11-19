import { subjectInsertSchema } from '~/schemas'
import type { SubjectInsert, SubjectRow } from '~/types'
const useSubject = () => {
  const { isPending, addData: addSubject } = useGenericInsert<
    SubjectInsert,
    SubjectRow
  >('subjects', subjectInsertSchema)
  return { isPending, addSubject }
}

export default useSubject
