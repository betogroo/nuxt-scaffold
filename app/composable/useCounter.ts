const useCounter = () => {
  const displayNumber = ref(0)

  const plus = () => {
    displayNumber.value++
  }
  const minus = () => {
    displayNumber.value--
  }

  const reset = () => {
    displayNumber.value = 0
  }

  const disabled = computed(() => (displayNumber.value === 0 ? true : false))

  return { displayNumber, plus, minus, reset, disabled }
}

export default useCounter
