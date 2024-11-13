<script setup lang="ts">
  import type { DropdownItem } from '~/types'
  const { user } = useUserStatus()
  const { handleLogout } = useAuth()
  const { navbar } = useNavbar()

  const items: DropdownItem[][] = [
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
      },
    ],
  ]
</script>

<template>
  <nav
    class="fixed w-full flex flex-col justify-center bg-cyan-600 shadow-md z-50 h-8"
  >
    <div class="flex justify-end items-center space-x-2 px-3">
      <slot
        :items="navbar.items"
        name="menu"
      >
        <AppNavbarMenu :items="navbar.items" />
      </slot>

      <slot
        :items="items"
        name="user"
        :user="user"
      >
        <ULink
          v-if="!user"
          class="hover:underline"
          to="/login"
          >Login</ULink
        >
        <UDropdown
          v-else
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }"
        >
          <UAvatar
            alt="Avatar"
            size="xs"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
          />
        </UDropdown>
      </slot>
    </div>
  </nav>
</template>
