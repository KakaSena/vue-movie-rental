/// <reference types="vite/client" />
/// <reference types="vue-router" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.css' {
  const css: { [key: string]: string }
  export default css
}
