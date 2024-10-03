<script setup lang="ts">
  const { delay } = useHelpers()

  await delay(3000)
  useUserStatus('/')
</script>

<template>
  <div>
    <h1>Entrando no Sistema</h1>
    <h2>Aguarde um momento enquanto conferimos a autenticação.</h2>
  </div>
</template>
