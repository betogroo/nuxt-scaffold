import type { NavbarItem } from '~/types'
import { navbarItemsSchema } from '~/schemas'

const useNavbar = () => {
  const router = useRouter()
  const routes = router.getRoutes()

  const items: NavbarItem[] = routes
    .filter((item) => item.meta && item.meta.showInNavBar)
    .sort((a, b) => (a.meta.order ?? 10) - (b.meta.order ?? 10))
    .map((item) => ({ path: item.path, title: item.meta.title, dois: 2 }))

  let parsedNavbarItems: NavbarItem[]

  try {
    parsedNavbarItems = navbarItemsSchema.parse(items)
  } catch (error) {
    console.log(error)
    parsedNavbarItems = []
  }

  const navbar = { items: parsedNavbarItems }

  return { navbar }
}

export default useNavbar
