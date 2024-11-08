<script setup lang="ts">
  import type { DropdownItem } from '#ui/types'

  const { user } = useUserStatus()
  const { handleLogout } = useAuth()
  const { navBarItems } = useNavigation()

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
      <template
        v-for="item in navBarItems"
        :key="item.path"
      >
        <ULink
          active-class="font-semibold"
          class="hover:underline"
          :to="item.path"
          >{{ item.meta.title || 'Sem Título' }}</ULink
        >

        <div>|</div>
      </template>

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
    </div>
  </nav>
</template>
