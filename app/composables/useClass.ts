import type { ClassInsert, ClassRow } from '~/types'
import { classInsertSchema } from '~/schemas'

const useClass = () => {
  const { insertPending, insertData: insertClass } = useGenericInsert<
    ClassInsert,
    ClassRow
  >('classes', classInsertSchema)

  return { insertPending, insertClass }
}

export default useClass
