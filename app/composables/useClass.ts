import type { ClassInsert, ClassRow } from '~/types'
import { classInsertSchema } from '~/schemas'

const useClass = () => {
  const { isPending, addInsert: addClass } = useInsert<ClassInsert, ClassRow>(
    'classes',
    classInsertSchema,
  )

  return { isPending, addClass }
}

export default useClass
