<script setup lang="ts">
  import { Modal } from '#components'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Home',
    order: 0,
  })

  const modal = useModal()

  const openModal = () => {
    modal.open(Modal, {
      title: 'Modal a partir de Index',
    })
  }
</script>

<template>
  <section>
    <h1 class="page-title">Home</h1>
    <p class="text-justify">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quibusdam
      reprehenderit fugit eaque nemo, tempore ea, porro recusandae neque tenetur
      velit natus molestiae fuga voluptatibus eveniet sint ex at necessitatibus.
    </p>
  </section>
  <section>
    <h1 class="page-title">Modal</h1>
    <UButton
      label="Abrir Modal"
      @click="openModal"
    />
  </section>
</template>
