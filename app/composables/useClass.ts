import type { ClassInsert, ClassRow } from '~/types'
import { classInsertSchema, classRowsSchema } from '~/schemas'

const useClass = () => {
  const { insertPending, insertData: insertClass } = useGenericInsert<
    ClassInsert,
    ClassRow
  >('classes', classInsertSchema)

  const {
    fetchPending,
    fetch,
    data: classes,
  } = useGenericFetch<ClassRow>('classes', classRowsSchema)

  return { insertPending, insertClass, fetchPending, fetch, classes }
}

export default useClass
