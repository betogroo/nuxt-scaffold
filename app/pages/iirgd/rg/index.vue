<script setup lang="ts">
  import { useDocumentDemand } from '#imports'
  import type { DocumentDemandInsert, SelectOptionsDemandSite } from '~/types'
  const { handleError, showToast, getOptionName } = useHelpers()
  const { demands, fetchDocumentDemands, isPending, addDocumentDemand } =
    useDocumentDemand()
  const newRgModal = ref(false)
  const openModal = () => {
    newRgModal.value = true
  }
  const closeModal = () => {
    newRgModal.value = false
  }

  const demandSites: SelectOptionsDemandSite[] = [
    {
      name: 'Morro Agudo',
      value: '1062-9',
    },
    {
      name: 'São Joaquim da Barra',
      value: '1342-5',
    },
  ]

  onMounted(async () => {
    await fetchDocumentDemands()
  })
  const submitDocumentDemand = async (documentDemand: DocumentDemandInsert) => {
    try {
      const newDocumentDemand = await addDocumentDemand(documentDemand)
      if (!newDocumentDemand) throw new Error('aqui deu erro')
      showToast(
        'success',
        `Documento ${newDocumentDemand?.document_number} cadastrado com sucesso`,
      )
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
      <h1 class="text-4xl">RGs</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
      >
        <AppCard title="Novos">1</AppCard>
        <AppCard title="Consultados">2</AppCard>
        <AppCard title="Liberados">3</AppCard>
        <AppCard title="Emitidos">4</AppCard>
        <AppCard title="Erro">5</AppCard>
      </div>
    </section>
    <AppModal
      v-model="newRgModal"
      title="Cadastrar Documento"
    >
      <FormDocumentDemand
        :is-pending="
          isPending.isLoading && isPending.action === 'addDocumentDemand'
        "
        @on-submit="submitDocumentDemand"
      />
    </AppModal>
    <UButton
      icon="mdi-plus"
      @click="openModal"
    />

    <div>
      <ul>
        <li
          v-if="
            isPending.isLoading && isPending.action === 'fetchDocumentDemands'
          "
        >
          <USkeleton class="h-8 w-72 my-1" />
          <USkeleton class="h-8 w-96 my-1" />
          <USkeleton class="h-8 w-48 my-1" />
        </li>
        <template v-else>
          <li
            v-for="demand in demands"
            :key="demand.id"
          >
            {{
              `${demand.document_number} - ${demand.name} - ${
                demand.status
              } ${getOptionName(demand.site, demandSites)}`
            }}
          </li>
        </template>
      </ul>
    </div>
  </UContainer>
</template>
