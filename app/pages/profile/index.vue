<script setup lang="ts">
  import type { ProfileUpdate } from '~/types'

  const { user } = useUserStatus()
  const { handleError } = useHelpers()
  const {
    profile,
    getProfile,
    updateProfile,
    updateEmailPending,
    updateProfilePending,
  } = useProfile()
  const error = ref('')
  const editMode = ref(true)

  const toggleEditMode = () => {
    editMode.value = !editMode.value
  }

  const handleUpdate = async (data: ProfileUpdate) => {
    await updateProfile(data)
  }

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
  <UContainer
    v-else
    class="container mx-auto p-10 w-80 justify-center"
  >
    <div class="text-center">
      <UAvatar
        alt="Avatar"
        size="3xl"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        :ui="{
          size: {
            '3xl': 'h-64 w-64 text-3xl',
          },
        }"
      />
    </div>
    <div v-if="!editMode">
      <div class="text-center text-2xl">
        {{ profile.name || 'Inserir Nome' }}
      </div>
      <div class="text-center font-light">{{ profile.username }}</div>
      <div class="text-center font-light">{{ profile.email }}</div>
      <div class="text-center">
        <UButton @click="toggleEditMode">Editar Perfil</UButton>
      </div>
    </div>
    <div
      v-else
      class="text-center"
    >
      <FormProfile
        :initial-values="profile"
        :is-pending="
          updateEmailPending.isLoading || updateProfilePending.isLoading
        "
        @on-cancel="toggleEditMode"
        @on-submit="handleUpdate"
      />
    </div>
  </UContainer>
</template>
