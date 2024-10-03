const useNavigation = () => {
  const router = useRouter()
  const routes = router.getRoutes()

  const navBarItems = routes
    .filter((item) => item.meta && item.meta.showInNavBar)
    .sort((a, b) => (a.meta.order ?? 10) - (b.meta.order ?? 10))
  return { navBarItems }
}

export default useNavigation
