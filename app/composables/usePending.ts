import type { PendingState } from '~/types'

const usePending = () => {
  const isPending = ref<PendingState>({
    action: null,
    itemId: null,
    isLoading: false,
  })
  const error = ref()
  const setPendingState = async <T>(
    fn: () => Promise<T>,
    action: string,
    itemId: number | string | null = null,
  ): Promise<T> => {
    isPending.value = { action, itemId, isLoading: true }
    try {
      return await fn() // Executa a função passada como argumento (a operação principal)
    } catch (err) {
      error.value = err
      console.log(err)
      throw err // Propaga o erro, se houver
    } finally {
      isPending.value = { action: null, itemId: null, isLoading: false }
    }
  }

  return { isPending, error, setPendingState }
}

export default usePending
