const useUserStatus = (url: string | null = null) => {
  const user = useSupabaseUser()
  if (url) {
    watch(
      user,
      (user) => {
        if (user) {
          return navigateTo(url)
        }
      },
      { immediate: true },
    )
  }

  return { user }
}

export default useUserStatus
