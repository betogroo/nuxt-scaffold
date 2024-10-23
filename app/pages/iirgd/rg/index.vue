<script setup lang="ts">
  import type { DocumentDemandInsert, DocumentDemandRow, DemandSite, DemandType, DemandStatus } from '~/types'
  import { demandSites, demandTypes, demandStatus } from '~/constants'
  const { handleError, showToast, getOptionName } = useHelpers()
  const {
    demands,
    fetchDocumentDemands,
    isPending,
    addDocumentDemand,
    tableDemandView,
    
  } = useDocumentDemand()
  const newRgModal = ref(false)
  const openModal = () => {
    newRgModal.value = true
  }
  const closeModal = () => {
    newRgModal.value = false
  }

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

  const columns = [
    {
      key: 'site',
      label: 'Posto',
    },
    {
      key: 'document_number',
      label: 'RG',
    },
    {
      key: 'name',
      label: 'Nome',
    },
    {
      key: 'type',
      label: 'Tipo',
    },
    {
      key: 'status',
      label: 'Situação',
    },
    {
      key: 'actions',
    },
  ]

  const dropdownItems = (row: DocumentDemandRow) => [
    [
      {
        label: 'Editar',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id),
      },
      {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid',
      },
    ],
    [
      {
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid',
      },
      {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
      },
    ],
    [
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
      },
    ],
  ]
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
      <UTable
        :columns="columns"
        :rows="tableDemandView"
      >
        <template #site-data="{ getRowData }"> {{ getOptionName<DemandSite>(getRowData(), demandSites) }}</template>
        <template #type-data="{ getRowData }"> {{ getOptionName<DemandType>(getRowData(), demandTypes) }}</template>
        <template #status-data="{ getRowData }"> {{ getOptionName<DemandStatus>(getRowData(), demandStatus) }}</template>
        <template #actions-data="{ row }">
          <UDropdown :items="dropdownItems(row)">
            <UButton
              color="gray"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
              variant="ghost"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </UContainer>
</template>
