<script setup lang="ts">
  import type { ClassInsert } from '~/types'
  const { addClass, isPending } = useClass()
  const { showToast, handleError } = useHelpers()

  const handleSubmit = async (data: ClassInsert) => {
    try {
      const newClass = await addClass(data)
      if (!newClass) throw new Error('Erro ao Adicionar Turma')
      showToast('success', `Turma ${newClass.name} cadastrada com sucesso`)
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
    <FormClass
      :is-pending="isPending.isLoading && isPending.action === 'addClass'"
      @on-submit="handleSubmit"
    />
  </div>
</template>
