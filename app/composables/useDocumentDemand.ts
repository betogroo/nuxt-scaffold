import { z } from 'zod'

import type { Database } from '~/types/supabase'
import type { DocumentDemandInsert, DocumentDemandRow } from '~/types'
import { documentDemandInsertSchema, documentDemandRowSchema } from '~/types'

const demands = ref<DocumentDemandRow[]>([])
const documentsDemandRowSchema = z.array(documentDemandRowSchema)
const isPending = ref(false)
const useDocumentDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const { delay, isDevelopment } = useHelpers()
  const fetchDocumentDemands = async () => {
    isPending.value = true
    try {
      const { data, error } = await supabase.from('document_demand').select('*')

      if (error) throw error
      if (data) {
        const parsedData = documentsDemandRowSchema.parse(data)
        demands.value = parsedData
      }
    } catch (err) {
      const e = err as Error

      console.log(e)
    } finally {
      isPending.value = false
    }
  }

  const addDocumentDemand = async (data: DocumentDemandInsert) => {
    isPending.value = true
    if (isDevelopment()) {
      await delay(2000, 'Testing addDocumentDemand')
      //throw new Error('Erro simulado no cadastro')
    }
    try {
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
    } catch (err) {
      const e = err as Error
      throw e
    } finally {
      isPending.value = false
    }
  }

  return { addDocumentDemand, fetchDocumentDemands, isPending, demands }
}

export default useDocumentDemand
