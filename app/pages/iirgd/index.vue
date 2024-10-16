<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'IIRGD',
    order: 5,
  })
  const $router = useRouter()
</script>

<template>
  <UContainer>
    <section>
      <h1 class="text-4xl">Dashboard</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
      >
        <AppCard
          title="RGs"
          @click="$router.push('/iirgd/rg')"
          >Aqui</AppCard
        >
        <AppCard title="Antecedentes">Aqui</AppCard>
      </div>
    </section>
  </UContainer>
</template>
