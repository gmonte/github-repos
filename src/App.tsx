import { GithubLogo } from "@phosphor-icons/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Filter } from "@/containers/Filter"
import { List } from "@/containers/List"

import styles from './App.module.css'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div className={styles.github_image_bg_container}>
          <GithubLogo className={styles.github_image_bg} />
        </div>
        <div className={styles.content}>
          <Filter />
          <List />
        </div>
      </div>
    </QueryClientProvider>
  )
}
