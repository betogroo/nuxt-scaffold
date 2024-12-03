<script setup lang="ts">
  const { user } = useUserStatus()
  const { handleError } = useHelpers()
  const { profile, getProfile } = useProfile()
  const error = ref('')

  try {
    await getProfile()
  } catch (err) {
    error.value = handleError(err).message
    console.log(error.value)
  }
</script>

<template>
  <div v-if="!profile || !user">
    <ErrorDataInvalid :message="error" />
  </div>
  <div v-else>
    <div>Profile</div>
    <div v-if="user">{{ user.email }}</div>
    <div>{{ profile }}</div>
  </div>
</template>
