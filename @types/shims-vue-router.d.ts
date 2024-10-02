import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    showInNavBar?: boolean
    hideNavBar?: boolean
    icon?: string
    requiresAuth?: boolean
    order?: number
  }
}
