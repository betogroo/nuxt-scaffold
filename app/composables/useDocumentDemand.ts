import { z } from 'zod'

import type { Database } from '~/types/supabase'
import type { DocumentDemandInsert, DocumentDemandRow } from '~/types'
import { documentDemandInsertSchema, documentDemandRowSchema } from '~/schemas'
const demands = ref<DocumentDemandRow[]>([])
const documentsDemandRowSchema = z.array(documentDemandRowSchema)
const useDocumentDemand = () => {
  const supabase = useSupabaseClient<Database>()
  const { isPending, setPendingState } = useHelpers()

  const tableDemandView = computed(() => {
    const mappedDemands = demands.value.map((item) => {
      return {
        ...item,
        class: (() => {
          switch (item.status) {
            case 'error':
              return 'bg-red-500/50 dark:bg-red-400/50'
            case 'consulted':
              return 'bg-yellow-500/50 dark:bg-yellow-400/50'
            case 'issued':
              return 'bg-green-500/50 dark:bg-green-400/50'
            case 'released':
              return 'bg-blue-500/50 dark:bg-blue-400/50'
            case 'new':
              return 'bg-gray-500/25 dark:bg-gray-400'
            default:
              return ''
          }
        })(),
      }
    })
    return mappedDemands
  })

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
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'document_demand' },
      (event) => {
        const { new: updatedDocumentDemand } = event
        const index = demands.value.findIndex(
          (demand) => demand.id === updatedDocumentDemand.id,
        )
        if (index !== -1) {
          demands.value[index] = updatedDocumentDemand as DocumentDemandRow
        }
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'document_demand' },
      (event) => {
        console.log('vai deletar', event.new)
        const { old: deletedDocumentDemand } = event
        demands.value = demands.value.filter(
          (demand) => demand.id !== deletedDocumentDemand.id,
        )
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
    tableDemandView,
  }
}

export default useDocumentDemand
