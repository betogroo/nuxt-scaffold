<script setup lang="ts">
  import type { TeacherInsert } from '~/types'
  const { addTeacher, isPending } = useTeacher()
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
</script>

<template>
  <div>
    <div>Professores</div>
    <FormTeacher
      :is-pending="isPending.isLoading && isPending.action === 'addTeacher'"
      @on-submit="handleSubmit"
    />
  </div>
</template>
