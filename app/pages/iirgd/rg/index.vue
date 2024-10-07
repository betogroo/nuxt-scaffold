<script setup lang="ts">
  const newRgModal = ref(false)
  const openModal = () => {
    newRgModal.value = true
  }
  /* const closeModal = () => {
    newRgModal.value = false
  } */
</script>

<template>
  <UContainer>
    <section>
      <h1 class="text-4xl">RGs</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
      >
        <AppCard title="Novos">1</AppCard>
        <AppCard title="Consultados">2</AppCard>
        <AppCard title="Liberados">3</AppCard>
        <AppCard title="Emitidos">4</AppCard>
        <AppCard title="Erro">5</AppCard>
      </div>
    </section>
    <AppModal v-model="newRgModal" />
    <UButton
      icon="mdi-plus"
      @click="openModal"
    />
  </UContainer>
</template>
