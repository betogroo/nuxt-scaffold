// types/meta.d.ts
import type { _PageMeta } from 'nuxt/app'

declare module 'nuxt/app' {
  type PageMeta = RouteMeta
}
