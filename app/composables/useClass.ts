import type { ClassInsert, ClassRow } from '~/types'
import { classInsertSchema } from '~/schemas'

const useClass = () => {
  const { isPending, addData: addClass } = useGenericInsert<
    ClassInsert,
    ClassRow
  >('classes', classInsertSchema)

  return { isPending, addClass }
}

export default useClass
