<script setup lang="ts">
  import type { SubjectInsert } from '~/types'
  const { addSubject, isPending } = useSubject()
  const { showToast, handleError } = useHelpers()

  const handleSubmit = async (subject: SubjectInsert) => {
    try {
      const newSubject = await addSubject(subject)
      if (!newSubject) throw new Error('Erro ao Adicionar Matéria')
      showToast('success', `Matéria ${newSubject.name} cadastrada com sucesso`)
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
    <div>Matérias</div>
    <FormSubject
      :is-pending="isPending.isLoading && isPending.action === 'addSubject'"
      @on-submit="handleSubmit"
    />
  </div>
</template>
