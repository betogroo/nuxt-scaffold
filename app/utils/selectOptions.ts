import type {
  SelectOption,
  DemandSite,
  DemandStatus,
  DemandType,
} from '~/types'

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

export const demandTypes: SelectOption<DemandType>[] = [
  {
    name: 'Primeira Via CIN',
    value: '1cin',
  },
  {
    name: 'Segunda Via CIN',
    value: '2cin',
  },
  {
    name: 'Primeira Via',
    value: '1v',
  },
  {
    name: 'Segunda Via',
    value: '2v',
  },
  {
    name: 'Segunda Via Taxa',
    value: '2t',
  },
  {
    name: 'Primeira Via Entintada',
    value: '1ve',
  },
  {
    name: 'Segunda Via Entintada',
    value: '2ve',
  },
]
