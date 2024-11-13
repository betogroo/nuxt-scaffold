<script setup lang="ts">
  const { navbar } = useNavbar()
</script>

<template>
  <nav
    class="fixed w-full flex flex-col justify-center bg-cyan-600 shadow-md z-50 h-8"
  >
    <div class="flex justify-end items-center space-x-2 px-3">
      <slot
        :items="navbar.menu"
        name="menu"
      >
        <AppNavbarMenu :items="navbar.menu" />
      </slot>

      <slot
        :items="navbar.dropdown"
        name="user"
        :user="navbar.user"
      >
        <ULink
          v-if="!navbar.user"
          class="hover:underline"
          to="/login"
          >Login</ULink
        >
        <UDropdown
          v-else
          :items="navbar.dropdown"
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
