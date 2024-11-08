<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Horários',
    order: 3,
  })
  const { push } = useRouter()
</script>

<template>
  <UContainer>
    <section>
      <h1 class="text-4xl mb-4">Dashboard</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
      >
        <AppCard
          title="Professores"
          @click="push('./schedule/teacher')"
        />
        <AppCard
          title="Matérias"
          @click="push('./schedule/subject')"
        />
        <AppCard
          title="Turmas"
          @click="push('./schedule/class')"
        />
        <AppCard
          title="Horários"
          @click="push('./schedule/schedule')"
        />
      </div>
    </section>
  </UContainer>
</template>
