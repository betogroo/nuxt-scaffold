<script setup lang="ts">
  const router = useRouter()
  const routes = router.getRoutes()
  console.log(routes)
</script>

<template>
  <nav class="flex justify-end space-x-2 mx-3">
    <ULink
      active-class="font-semibold"
      class="hover:underline"
      to="/"
      >Home</ULink
    >
    <div>|</div>
    <ULink
      class="hover:underline"
      active-class="font-semibold"
      to="/about"
      >About</ULink
    >
  </nav>
</template>
