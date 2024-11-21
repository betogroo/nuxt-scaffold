<script setup lang="ts">
  import type { TeacherInsert } from '~/types'
  const { insertTeacher, insertPending, fetch, teachers } = useTeacher()

  const { showToast, handleError } = useHelpers()

  const handleSubmit = async (teacher: TeacherInsert) => {
    try {
      const newTeacher = await insertTeacher(teacher)
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
      :is-pending="
        insertPending.isLoading && insertPending.action === 'add-teachers'
      "
      @on-submit="handleSubmit"
    />
    <ul>
      <li
        v-for="teacher in teachers"
        :key="teacher.id"
      >
        <ULink :to="{ name: 'schedule-teacher-id', params: { id: teacher.id } }"
          >{{ teacher.name }}
        </ULink>
      </li>
    </ul>
  </div>
</template>
