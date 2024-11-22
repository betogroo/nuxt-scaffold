<script setup lang="ts">
  interface Props {
    title?: string
    message?: string
  }
  withDefaults(defineProps<Props>(), {
    title: ' Algo deu errado',
    message: 'Algo eu errado e os dados não foram carregados',
  })
  const imgSrc = new URL('~/assets/img/data-invalid.png', import.meta.url).href
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UAvatar
      size="3xl"
      :src="imgSrc"
    />
    <h1 class="text-4xl font-semibold">{{ title }}</h1>
    <h6 class="text-4xl">{{ message }}</h6>
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
