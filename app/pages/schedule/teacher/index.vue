<script setup lang="ts">
  import type { TeacherInsert } from '~/types'
  const { addTeacher, isPending, fetch, data: teachers } = useTeacher()

  const { showToast, handleError } = useHelpers()

  const handleSubmit = async (teacher: TeacherInsert) => {
    try {
      const newTeacher = await addTeacher(teacher)
      if (!newTeacher) throw new Error('Erro ao Adicionar Professor')
      showToast(
        'success',
        `Professor ${newTeacher.name} cadastrado com sucesso`,
      )
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      showToast('error', error.message)
      console.error(error)
    }
  }
  onMounted(async () => {
    await fetch()
  })
</script>

<template>
  <div>
    <div>Professores</div>
    <FormTeacher
      :is-pending="isPending.isLoading && isPending.action === 'add-teachers'"
      @on-submit="handleSubmit"
    />
    <AppList
      v-for="teacher in teachers"
      :key="teacher.id"
      :item="{ name: teacher.name, email: 'email não cadastrado' }"
    />
  </div>
</template>
