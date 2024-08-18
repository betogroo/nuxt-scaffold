<script setup lang="ts">
  const router = useRouter()
  const routes = router.getRoutes()

  const navBarItems = routes.filter(
    (item) => item.meta && item.meta.showInNavBar,
  )
  console.log(navBarItems)
</script>

<template>
  <nav class="flex justify-end space-x-2 mx-3">
    <template
      v-for="item in navBarItems"
      :key="item.path"
    >
      <ULink
        active-class="font-semibold"
        class="hover:underline"
        :to="item.path"
        >{{ item.meta.title }}</ULink
      >
      <div>|</div>
    </template>
  </nav>
</template>
