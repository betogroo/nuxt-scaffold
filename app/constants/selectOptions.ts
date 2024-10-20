import type { SelectOption, DemandSite, DemandStatus } from '~/types'

export const demandSites: SelectOption<DemandSite>[] = [
  {
    name: 'Morro Agudo',
    value: '1062-9',
  },
  {
    name: 'São Joaquim da Barra',
    value: '1342-5',
  },
]

export const demandStatus: SelectOption<DemandStatus>[] = [
  {
    name: 'Novo Documento',
    value: 'new',
  },
  {
    name: 'Consultado',
    value: 'consulted',
  },
  {
    name: 'Emitido',
    value: 'issued',
  },
  {
    name: 'Liberado',
    value: 'released',
  },
  {
    name: 'Erro',
    value: 'error',
  },
]
