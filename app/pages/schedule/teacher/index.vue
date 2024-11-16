<script setup lang="ts">
  import type { TeacherInsert } from '~/types'

  const handleSubmit = (values: TeacherInsert) => {
    console.log(values)
  }
</script>

<template>
  <div>
    <div>Professores</div>
    <FormTeacher @on-submit="handleSubmit" />
  </div>
</template>
