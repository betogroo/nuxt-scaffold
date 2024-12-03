<script setup lang="ts">
  const { user } = useUserStatus()
  const { profile, getProfile } = useProfile()

  onMounted(async () => {
    await getProfile()
  })
</script>

<template>
  <div>
    <div>Profile</div>
    <div v-if="user">{{ user.email }}</div>
    <div>{{ profile }}</div>
  </div>
</template>
