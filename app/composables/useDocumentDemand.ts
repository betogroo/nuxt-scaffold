import { z } from 'zod'

import type { Database } from '~/types/supabase'
import type { DocumentDemandInsert, DocumentDemandRow } from '~/types'
import { documentDemandInsertSchema, documentDemandRowSchema } from '~/schemas'

const demands = ref<DocumentDemandRow[]>([])
const documentsDemandRowSchema = z.array(documentDemandRowSchema)
const useDocumentDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()

  const fetchDocumentDemands = async () => {
    return setPendingState(async () => {
      const { data, error } = await supabase
        .from('document_demand')
        .select('*')
        .order('id', { ascending: true })
        .returns<DocumentDemandRow>()
      if (error) throw error
      if (data) {
        const parsedData = documentsDemandRowSchema.parse(data)
        demands.value = parsedData
      }
    }, 'fetchDocumentDemands')
  }

  supabase
    .channel('document_demands_refresh')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'document_demand',
      },
      (event) => {
        console.log(event)
        console.log('Vai mudar a tabela')
        const { new: newDocumentDemands } = event
        try {
          const parsedDemand = documentDemandRowSchema.parse(newDocumentDemands)
          demands.value.push(parsedDemand)
        } catch (error) {
          console.error('Erro ao validar a nova demanda:', error)
        }
      },
    )
    .subscribe()

  const addDocumentDemand = async (data: DocumentDemandInsert) => {
    return setPendingState(async () => {
      const parsedData = documentDemandInsertSchema.parse(data)
      console.log(parsedData)
      const { data: newDocumentDemand, error } = await supabase
        .from('document_demand')
        .insert(parsedData)
        .select()
        .returns<DocumentDemandRow[]>()
        .single()
      if (error) throw error
      if (newDocumentDemand) return newDocumentDemand
    }, 'addDocumentDemand')
  }

  return {
    addDocumentDemand,
    fetchDocumentDemands,
    isPending,
    demands,
  }
}

export default useDocumentDemand
