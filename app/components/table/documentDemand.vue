<script setup lang="ts">
  //<script setup lang="ts">
  import type {
    TableColumn,
    DemandSite,
    DemandType,
    DemandStatus,
    DocumentDemandRow,
  } from '~/types'

  defineProps<Props>()

  const { getOptionName } = useHelpers()
  const { push } = useRouter()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: Array<Record<string, unknown>>
  }
  const handleModal = () => {
    console.log('open modal')
  }

  const goToDemand = (id: number) => {
    push(`rg/${id}`)
  }

  const dropdownItems = (row: DocumentDemandRow) => [
    [
      {
        label: 'Detalhes',
        icon: iconOutline.details,
        click: () => goToDemand(row.id),
      },
    ],
    [
      {
        label: 'Editar',
        icon: iconOutline.edit,
        click: () => console.log('Edit', row.id),
      },
    ],
    [
      {
        label: 'Arquivar',
        icon: iconOutline.archive,
        click: () => console.log('Archive', row.id),
      },
    ],
    [
      {
        label: 'Delete',
        icon: iconOutline.trash,
        click: () => console.log('Delete', row.id),
      },
    ],
  ]
</script>

<template>
  <AppCard :title="title">
    <div class="flex justify-end space-x-2">
      <div class="flex gap-1.5 bg-red-300">aqui vai o dropdown de filtro</div>
      <div class="flex gap-1.5 bg-blue-400">Aqui vai o dropdown do status</div>
    </div>
    <UTable
      :columns="columns"
      :rows="rows"
      :ui="{ td: { padding: 'p-1', color: 'text-gray-800' } }"
    >
      <template #empty-state>
        <UButton
          :icon="iconOutline.plus"
          @click="handleModal"
        />
      </template>
      <template #site-data="{ getRowData }">
        {{ getOptionName(getRowData() as DemandSite, demandSites) }}</template
      >
      <template #type-data="{ getRowData }">{{
        getOptionName(getRowData() as DemandType, demandTypes)
      }}</template>

      <template #status-data="{ getRowData }">{{
        getOptionName(getRowData() as DemandStatus, demandStatus)
      }}</template>

      <template #actions-data="{ row }">
        <UDropdown
          :items="dropdownItems(row)"
          :ui="{ container: 'z-50' }"
        >
          <UButton
            color="gray"
            :icon="iconOutline.ellipsis"
            variant="link"
          />
        </UDropdown>
      </template>
    </UTable>
  </AppCard>
</template>
