<script setup lang="ts">
  import type { ViewForm } from '~/models/form'

  interface Props {
    item: ViewForm
  }
  const props = defineProps<Props>()

  const handleDelete = () => {
    console.log(props.item.id)
  }
</script>

<template>
  <li>
    <div class="grid grid-cols-4 grid-rows-2 gap-4">
      <!-- Primeira Coluna (maior, duas linhas) -->
      <div class="col-span-3 row-span-2">
        <div class="text-xl font-semibold">{{ item.name }}</div>
        <div class="italic">{{ item.email }}</div>
      </div>

      <!-- Segunda Coluna (estreita, ocupa duas linhas) -->
      <div class="col-span-1 row-span-2 flex items-center justify-end">
        <div>
          <UButton
            color="red"
            icon="mdi-delete"
            variant="link"
            @click="handleDelete"
          />
        </div>
      </div>
    </div>
  </li>
</template>
