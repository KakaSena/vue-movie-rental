interface ImportMetaEnv {
  readonly VITE_OMDB_API_KEY: string
  readonly VITE_OMDB_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
