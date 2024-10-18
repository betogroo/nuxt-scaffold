import { ref } from 'vue'

const usePending = () => {
  const isPending = ref(false)
  const error = ref()
  const setPendingState = async <T>(fn: () => Promise<T>): Promise<T> => {
    isPending.value = true
    try {
      return await fn() // Executa a função passada como argumento (a operação principal)
    } catch (err) {
      error.value = err
      console.log(err)
      throw err // Propaga o erro, se houver
    } finally {
      isPending.value = false // Garante que o estado isPending seja atualizado
    }
  }

  return { isPending, error, setPendingState }
}

export default usePending
