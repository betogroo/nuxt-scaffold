import { z } from 'zod'

import type { Database } from '~/types/supabase'
import type { DocumentDemandInsert, DocumentDemandRow } from '~/types'
import { documentDemandInsertSchema, documentDemandRowSchema } from '~/types'

const demands = ref<DocumentDemandRow[]>([])
const documentsDemandRowSchema = z.array(documentDemandRowSchema)
const useDocumentDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const { delay, isDevelopment } = useHelpers()
  const { isPending, setPendingState } = usePending()

  const fetchDocumentDemands = async () => {
    return setPendingState(async () => {
      if (isDevelopment()) {
        await delay(2000, 'Testing addDocumentDemand')
        //throw new Error('Erro simulado no cadastro')
      }
      const { data, error } = await supabase.from('document_demand').select('*')

      if (error) throw error
      if (data) {
        const parsedData = documentsDemandRowSchema.parse(data)
        demands.value = parsedData
      }
    })
  }

  const addDocumentDemand = async (data: DocumentDemandInsert) => {
    return setPendingState(async () => {
      if (isDevelopment()) {
        await delay(2000, 'Testing addDocumentDemand')
        //throw new Error('Erro simulado no cadastro')
      }
      const parsedData = documentDemandInsertSchema.parse(data)
      const { data: newDocumentDemand, error } = await supabase
        .from('document_demand')
        .insert(parsedData)
        .select()
        .returns<DocumentDemandRow[]>()
        .single()
      if (error) throw error
      console.log(newDocumentDemand)
      if (newDocumentDemand) return newDocumentDemand
    })
  }

  return { addDocumentDemand, fetchDocumentDemands, isPending, demands }
}

export default useDocumentDemand
