import type { NavbarItem, DropdownItem } from '~/types'
import { navbarItemsSchema } from '~/schemas'

const useNavbar = () => {
  const router = useRouter()
  const routes = router.getRoutes()
  const { user } = useUserStatus()
  const { handleLogout } = useAuth()

  const menuItems: NavbarItem[] = routes
    .filter((item) => item.meta && item.meta.showInNavBar)
    .sort((a, b) => (a.meta.order ?? 10) - (b.meta.order ?? 10))
    .map((item) => ({ path: item.path, title: item.meta.title, dois: 2 }))

  let parsedNavbarItems: NavbarItem[]

  try {
    parsedNavbarItems = navbarItemsSchema.parse(menuItems)
  } catch (error) {
    console.log(error)
    parsedNavbarItems = []
  }

  const dropdown: DropdownItem[][] = [
    [
      {
        label: user.value?.email || '',
        avatar: {
          src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        },
        slot: 'account',
        click: () => console.log('Link to profile in the future'),
      },
    ],
    [
      {
        label: 'Settings',
        icon: iconOutline.settings,
        click: () => {
          return navigateTo('/settings')
        },
      },
      {
        label: 'Sign out',
        icon: iconOutline.signOut,
        click: async () => {
          await handleLogout()
          return navigateTo('/login')
        },
        class: 'text-red-500',
        iconClass: 'text-red-500',
      },
    ],
  ]

  const navbar = { menu: parsedNavbarItems, dropdown, user: user.value }

  return { navbar }
}

export default useNavbar
