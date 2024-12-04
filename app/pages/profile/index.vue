<script setup lang="ts">
  const { user } = useUserStatus()
  const { handleError } = useHelpers()
  const { profile, getProfile } = useProfile()
  const error = ref('')
  const editMode = ref(false)

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
  <div
    v-else
    class="container mx-auto p-10"
  >
    <div v-if="!editMode">
      <div class="text-center">
        <UAvatar
          alt="Avatar"
          size="3xl"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          :ui="{
            size: {
              '3xl': 'h-44 w-44 text-3xl',
            },
          }"
        />
      </div>
      <div class="text-center text-2xl">
        {{ profile.name || 'Inserir Nome' }}
      </div>
      <div class="text-center font-light">{{ profile.email }}</div>
    </div>
    <div
      v-else
      class="text-center"
    >
      Fomrmulario
    </div>

    <div class="text-center">
      <UButton @click="editMode = !editMode">Editar Perfil</UButton>
    </div>
  </div>
</template>
