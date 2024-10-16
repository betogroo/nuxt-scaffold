<script setup lang="ts">
  const colorMode = useColorMode()
  const toggleDark = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
</script>

<template>
  <div>
    <UButton @click="toggleDark">Modo</UButton>
  </div>
</template>
