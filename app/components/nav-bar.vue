<script setup lang="ts">
  const router = useRouter()
  const routes = router.getRoutes()
  const supabase = useSupabaseClient()

  const { user } = useUserStatus()

  const navBarItems = routes
    .filter((item) => item.meta && item.meta.showInNavBar)
    .sort((a, b) => (a.meta.order ?? 10) - (b.meta.order ?? 10))

  const handleLogout = async () => {
    supabase.auth.signOut()
  }
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
      <UAvatar
        v-else
        alt="Avatar"
        size="xs"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
      />
    </div>
  </nav>
</template>
