<script setup lang="ts">
  import type { AddForm } from '~/models/form'
  const { handleError, genFakeUsers } = useHelpers()

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Home',
    order: 0,
  })

  const { addUser, deleteUser, fakeUsers, isPending } = useRegistration()
  const formModal = ref(false)
  const openModal = () => {
    formModal.value = true
  }
  const closeModal = () => {
    formModal.value = false
  }

  onMounted(() => {
    fakeUsers.value = genFakeUsers()
  })

  const addData = async (user: AddForm) => {
    try {
      await addUser(user)
      console.log('Usuário Cadastrado - Index.vue')
      closeModal()
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      console.error(error)
    }
  }
  const deleteData = async (id: string) => {
    try {
      await deleteUser(id)
      console.log('Usuário Excluído - Index.vue')
      closeModal()
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      console.error(error)
    }
  }
</script>

<template>
  <section>
    <AppCard title="Home">
      <p>
        Nesta página serão apresentados alguns componentes e comportamentos,
        sempre utilizando Vue com Nuxt, Typescript, Nuxt UI, Supabase, Pinia,
        etc
      </p>
    </AppCard>
  </section>
  <section>
    <AppCard title="Pinia">
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
    </AppCard>
  </section>
  <section>
    <AppCard title="Modal">
      <p>
        Clicando no botão abaixo um modal será aberto, com um formulário. Ele
        simula um formulário de cadastro, e as funções necessárias para o
        cadastro estarão em <code>/index.vue</code>, ou em um composable desde
        que seja importada. O formulário está com validação, utilizando o
        <code class="text-green-700"> vee-validate + zod </code>, e não permite
        o cadastro enquanto não cumprir todas as regras de validação. A final, o
        modal é fechado.
      </p>
      <p>
        Na página
        <ULink
          class="hover:underline font-semibold"
          to="/about"
          >/about</ULink
        >
        o mesmo modal é chamado, porém, sem a função que simula o formulário,
        apenas para mostrar o comportamento padrão do componente, utilizando o
        composable <code class="text-green-700">useModal()</code>
      </p>
      <AppModal
        v-model="formModal"
        title="Formulário Modal"
      >
        <FormUser
          :is-pending="isPending.addUser"
          @on-submit="addData"
        />
      </AppModal>
      <UButton
        :color="formModal ? 'red' : 'primary'"
        label="Abrir Modal"
        :loading="formModal"
        @click="openModal"
      />
    </AppCard>
  </section>
  <section>
    <AppCard
      v-if="fakeUsers.length"
      subtitle="Lista de usuários geradas apenas para testes"
      title="Usuários"
    >
      <ul>
        <template v-if="isPending.addUser">
          <template
            v-for="user in fakeUsers"
            :key="user.email"
          >
            <li>
              <USkeleton class="bg-red-200 h-4 w-[350px] my-2" />
            </li>
            <li>
              <USkeleton class="bg-red-200 h-4 w-[250px] my-2" />
            </li>
          </template>
        </template>
        <template v-else>
          <AppList
            v-for="user in fakeUsers"
            :key="user.id"
            :is-pending="
              isPending.deleteUser && isPending.pendingItemId === user.id
            "
            :item="user"
            @handle-delete="deleteData(user.id!)"
          />
        </template>
      </ul>
    </AppCard>
  </section>
</template>
