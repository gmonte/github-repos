/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string

  // readonly VITE_KEYCLOAK_BASE_URL: string
  // readonly VITE_KEYCLOAK_REALM: string
  // readonly VITE_KEYCLOAK_CLIENT_ID: string
  // readonly VITE_KEYCLOAK_CLIENT_SECRET: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
