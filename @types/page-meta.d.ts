// types/meta.d.ts
import type { _PageMeta } from 'nuxt/app'

declare module 'nuxt/app' {
  interface PageMeta {
    title: string
    showInNavBar?: boolean
    hideNavBar?: boolean
    icon?: string
    requiresAuth?: boolean
    order?: number
  }
}
