<script setup lang="ts">
  const router = useRouter()
  const routes = router.getRoutes()

  const navBarItems = routes
    .filter((item) => item.meta && item.meta.showInNavBar)
    .sort((a, b) => (a.meta.order ?? 10) - (b.meta.order ?? 10))

  const user = useSupabaseUser()

  watch(
    user,
    (user) => {
      if (user) {
        console.log('Logged In')
      }
    },
    { immediate: true },
  )
</script>

<template>
  <nav
    class="fixed w-full flex flex-col justify-center bg-cyan-600 shadow-md z-50 h-8"
  >
    <div class="flex justify-end items-center space-x-2 px-3">
      <template
        v-for="(item, i) in navBarItems"
        :key="item.path"
      >
        <ULink
          active-class="font-semibold"
          class="hover:underline"
          :to="item.path"
          >{{ item.meta.title || 'Sem Título' }}</ULink
        >

        <div v-if="i < navBarItems.length - 1">|</div>
      </template>
      <div v-if="user">
        |
        <ULink>Sair</ULink>
      </div>
    </div>
  </nav>
</template>
