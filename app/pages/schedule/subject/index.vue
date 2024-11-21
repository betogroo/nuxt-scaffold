<script setup lang="ts">
  import type { SubjectInsert } from '~/types'
  const { insertSubject, insertPending, fetch, subjects } = useSubject()

  const { showToast, handleError } = useHelpers()

  const handleSubmit = async (subject: SubjectInsert) => {
    try {
      const newSubject = await insertSubject(subject)
      if (!newSubject) throw new Error('Erro ao Adicionar Matéria')
      showToast('success', `Matéria ${newSubject.name} cadastrada com sucesso`)
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
    <div>Matérias</div>
    <FormSubject
      :is-pending="
        insertPending.isLoading && insertPending.action === 'add-subjects'
      "
      @on-submit="handleSubmit"
    />
    <ul>
      <li
        v-for="item in subjects"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
