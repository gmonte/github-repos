import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DataTableQueryParams } from '@/components/DataTable'
import { Technology } from '@/constants'
import { GithubRepository } from '@/types'

type FilterState = {
  technology: Technology
  setTechnology: (technology: Technology) => void
  input: string
  setInput: (value: string) => void
  queryParams: DataTableQueryParams<GithubRepository>
  setQueryParams: (queryParams: DataTableQueryParams<GithubRepository>) => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      technology: Technology.javascript,
      setTechnology(technology) {
        set({ technology })
      },

      input: '',
      setInput(value) {
        set({ input: value })
      },

      queryParams: {
        page: 1,
        pageSize: 10
      },
      setQueryParams(queryParams) {
        set({ queryParams })
      }
    }),
    {
      name: 'filter-storage'
    },
  ),
)
