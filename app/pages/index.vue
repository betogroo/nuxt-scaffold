<script setup lang="ts">
  import type { AddUser } from '~/types'
  const { handleError, genFakeUsers, showToast } = useHelpers()

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Home',
    order: 0,
  })

  const { addUser, deleteUser, fakeUsers, isPending } = useRegistration()
  const { profile, testProfile } = useAuth()
  const formModal = ref(false)
  const openModal = () => {
    formModal.value = true
  }
  const closeModal = () => {
    formModal.value = false
  }

  onMounted(async () => {
    fakeUsers.value = genFakeUsers(5)
    await testProfile()
  })

  const toast = useToast()

  const addData = async (user: AddUser) => {
    try {
      await addUser(user)
      showToast('success', 'Cadastrado com sucesso')
      console.log('Usuário Cadastrado - Index.vue')
      closeModal()
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      showToast('error', error.message)
      console.error(error)
    }
  }
  const deleteData = async (id: string) => {
    try {
      await deleteUser(id)
      showToast('success', 'Excluído com sucesso')
      console.log('Usuário Excluído - Index.vue')
      closeModal()
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      showToast('error', error.message)
      console.error(error)
    }
  }
</script>

<template>
  <UContainer>
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
            to="/modules/counter"
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
          <code class="text-green-700"> vee-validate + zod </code>, e não
          permite o cadastro enquanto não cumprir todas as regras de validação.
          A final, o modal é fechado.
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
            :is-pending="isPending.isLoading && isPending.action === 'addUser'"
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
          <template
            v-if="isPending.isLoading && isPending.action === 'addUser'"
          >
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
            <TransitionGroup
              name="fade-red"
              tag="div"
            >
              <AppList
                v-for="user in fakeUsers"
                :key="user.id"
                :is-pending="
                  isPending.isLoading &&
                  isPending.action === 'deleteUser' &&
                  isPending.itemId === user.id
                "
                :item="user"
                @handle-delete="deleteData(user.id!)"
              />
            </TransitionGroup>
          </template>
        </ul>
      </AppCard>
    </section>
    <section>
      <AppCard title="Notification">
        <p>
          Clique no Botão abaixo para simular uma notificação utilizando o
          componente
          <code class="text-green-700">UNotifications</code> juntamente com o
          composable <code class="text-green-700">useToast()</code>
        </p>
        <UButton
          :color="formModal ? 'red' : 'primary'"
          label="Testar Toast"
          @click="toast.add({ title: 'Testando UNotification' })"
        />
      </AppCard>
    </section>
    <section>
      <AppCard title="Profiles">
        {{ profile }}
      </AppCard>
    </section>
  </UContainer>
</template>
<style type="css" scoped>
  /* Defina as classes de transição */
  .fade-red-enter-active,
  .fade-red-leave-active {
    transition: background-color 1s ease, opacity 1s ease;
  }

  .fade-red-enter-from,
  .fade-red-leave-to {
    opacity: 0;
    background-color: red;
  }

  .fade-red-enter-to,
  .fade-red-leave-from {
    opacity: 1;
    background-color: transparent;
  }
</style>
