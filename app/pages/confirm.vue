<script setup lang="ts">
  const { delay } = useHelpers()

  await delay(3000)
  useRedirectIfAuthenticated()
</script>

<template>
  <h1>Entrando no Sistema</h1>
  <h2>Aguarde um momento enquanto conferimos a autenticação.</h2>
</template>
