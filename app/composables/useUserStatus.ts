const useUserStatus = (url: string | null = null) => {
  const cookieName = useRuntimeConfig().public.supabase.cookieName
  const redirectPath = useCookie(`${cookieName}-redirect-path`).value

  const user = useSupabaseUser()

  if (url) {
    watch(
      user,
      (user) => {
        if (user) {
          useCookie(`${cookieName}-redirect-path`).value = null
          return navigateTo(redirectPath || '/profile')
        }
      },
      { immediate: true },
    )
  }

  return { user }
}

export default useUserStatus
