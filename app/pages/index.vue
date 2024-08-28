<script setup lang="ts">
  import { Modal } from '#components'
  import { addFormSchema, type AddFormSchema } from '~/models/form'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Home',
    order: 0,
  })

  const modal = useModal()

  const openModal = () => {
    modal.open(Modal, {
      title: 'Título',
      onSubmit: (data) => addData(data.value),
      onClose: modal.close,
    })
  }

  const addData = (data: AddFormSchema) => {
    const parsedData = addFormSchema.parse(data)
    console.log(parsedData)
    console.log(data)
  }
</script>

<template>
  <section>
    <h1 class="page-title">Home</h1>
    <p>
      Nesta página serão apresentados alguns componentes e comportamentos,
      sempre utilizando Vue com Nuxt, Typescript, Nuxt UI, Supabase, Pinia, etc
    </p>
  </section>
  <section>
    <h1 class="page-title">Pinia</h1>
    <p>
      Na página
      <ULink
        class="hover:underline font-semibold"
        to="/contador"
        >/contador</ULink
      >
      há um pequeno app para contar, onde clicando no + uma unidade é
      adicionada, e clicando no - uma unidade é subtraída.
    </p>
    <p>
      Este app mostra o funcionamento base do Pinia, que é uma biblioteca de
      gerenciamento de estado do Vue.
    </p>
  </section>
  <section>
    <h1 class="page-title">Modal</h1>
    <p>
      Clicando no botão abaixo um modal será aberto, com um formulário. Ele
      simula um formulário de cadastro, e as funções necessárias para o cadastro
      estarão em <code>/index.vue</code>, ou em qualquer outro local desde que
      seja importada.
    </p>
    <p>
      Na página
      <ULink
        class="hover:underline font-semibold"
        to="/about"
        >/about</ULink
      >
      o mesmo modal é chamado, porém, sem a função que simula o formulário,
      apenas para mostrar o comportamento padrão do componente.
    </p>
    <UButton
      label="Abrir Modal"
      @click="openModal"
    />
  </section>
</template>
