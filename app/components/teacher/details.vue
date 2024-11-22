<script setup lang="ts">
  import type { TeacherRow } from '~/types'

  interface Props {
    teacher: TeacherRow | null
    isPending: boolean
  }
  defineProps<Props>()
</script>

<template>
  <UContainer>
    <h1>{{ teacher?.name }}</h1>
  </UContainer>
</template>
