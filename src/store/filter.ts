import { Paths } from 'type-fest'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Technology } from '@/constants'
import { GithubRepository, SortDirection } from '@/types'

type FilterState = {
  technology: Technology
  setTechnology: (technology: Technology) => void

  input: string
  setInput: (input: string) => void

  page: number,
  setPage: (page: number) => void

  pageSize: number,
  setPageSize: (pageSize: number) => void

  sortBy?: Paths<GithubRepository>,
  setSortBy: (sortBy?: Paths<GithubRepository>) => void

  sortDirection?: SortDirection
  setSortDirection: (sortDirection?: SortDirection) => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      technology: Technology.javascript,
      setTechnology(technology) {
        set({ technology, page: 1 })
      },

      input: '',
      setInput(input) {
        set({ input, page: 1 })
      },

      page: 1,
      setPage(page) {
        set({ page })
      },

      pageSize: 10,
      setPageSize(pageSize) {
        set({ pageSize, page: 1 })
      },

      sortBy: undefined,
      setSortBy(sortBy) {
        set({ sortBy, page: 1 })
      },

      sortDirection: undefined,
      setSortDirection(sortDirection) {
        set({ sortDirection, page: 1 })
      }
    }),
    {
      name: 'filter-storage'
    },
  ),
)
