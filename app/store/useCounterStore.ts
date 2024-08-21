export const useCounterStore = defineStore('useCounterStore', () => {
  const displayNumber = ref<number>(0)

  const increaseValue = () => {
    displayNumber.value++
  }
  const decreaseValue = () => {
    displayNumber.value--
  }

  const $reset = () => {
    displayNumber.value = 0
  }

  const isDisabled = computed(() => (displayNumber.value < 1 ? true : false))

  return { displayNumber, increaseValue, decreaseValue, $reset, isDisabled }
})
