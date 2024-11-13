<script setup lang="ts">
  import type { NavbarItem } from '~/types'

  interface Props {
    items: NavbarItem[]
  }
  defineProps<Props>()
</script>

<template>
  <div
    v-for="item in items"
    :key="item.path"
    class="flex space-x-1"
  >
    <ULink
      active-class="font-semibold"
      class="hover:underline"
      :to="item.path"
      >{{ item.title || 'Sem Título' }}</ULink
    >

    <div>|</div>
  </div>
</template>
