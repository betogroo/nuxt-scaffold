<script setup lang="ts">
  definePageMeta({
    showInNavBar: false,
    requiresAuth: false,
    title: '404 - Not Found',
    layout: 'no-nav',
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-9xl font-semibold">404</h1>
    <h6 class="text-4xl">Oops! Algo deu errado</h6>
    <UButton
      class="mt-6"
      color="black"
      :leading-icon="iconOutline.return"
      to="/"
      variant="outline"
      >Voltar</UButton
    >
  </div>
</template>
