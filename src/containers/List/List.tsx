import { useEffect } from "react"

import { CalendarCheck, GitFork, Hash, Star, TextAlignLeft, User } from "@phosphor-icons/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import * as dateFns from 'date-fns'

import { DataTable, DataTableColumn } from "@/components/DataTable"
import { Tag } from "@/components/Tag"
import { QueryTag } from "@/constants"
import { useFilterStore } from "@/store/filter"
import { GithubErrorResponse, GithubPaginatedResponse, GithubRepository } from "@/types"

import styles from './List.module.css'

const columns: Array<DataTableColumn<GithubRepository>> = [
  {
    field: 'id',
    title: (
      <div className={styles.header_cell}>
        <Hash />
        <span>Repository ID</span>
      </div>
    ),
    render({ id }) {
      return (
        <Tag.Root
          className={styles.id_column}
          size="slim"
          color="dark"
        >
          <Tag.Label>
            {id}
          </Tag.Label>
        </Tag.Root>
      )
    }
  },
  {
    field: 'owner.login',
    title: (
      <div className={styles.header_cell}>
        <User />
        <span>Username</span>
      </div>
    )
  },
  {
    field: 'description',
    title: (
      <div className={styles.header_cell}>
        <TextAlignLeft />
        <span>Repo Description</span>
      </div>
    ),
    cellClassName: styles.description_column
  },
  {
    field: 'stargazers_count',
    title: (
      <div className={styles.header_cell}>
        <Star />
        <span>Stars</span>
      </div>
    ),
    sortable: true,
    render({ stargazers_count }) {
      return stargazers_count.toLocaleString()
    }
  },
  {
    field: 'forks_count',
    title: (
      <div className={styles.header_cell}>
        <GitFork />
        <span>Forks</span>
      </div>
    ),
    sortable: true,
    render({ forks_count }) {
      return forks_count.toLocaleString()
    }
  },
  {
    field: 'pushed_at',
    title: (
      <div className={styles.header_cell}>
        <CalendarCheck />
        <span>Last Update Date</span>
      </div>
    ),
    align: 'right',
    sortable: true,
    cellClassName: styles.date_column,
    render({ pushed_at }) {
      return dateFns.formatDistance(new Date(pushed_at), new Date(), {
        addSuffix: true
      })
    }
  }
]

export function List() {
  const {
    input,
    technology,
    queryParams,
    setQueryParams
  } = useFilterStore()

  const queryClient = useQueryClient()

  const { refetch, data, isLoading, error } = useQuery<GithubPaginatedResponse<GithubRepository[]>, GithubErrorResponse>({
    queryKey: [
      QueryTag.repositories,
      queryParams.page,
      queryParams.pageSize,
      queryParams.sortBy,
      queryParams.sortDirection,
      technology,
      input
    ],
    queryFn: async ({ signal }) => {
      function getSortColumnName() {
        const sortColumn = columns.find(({ field }) => field === queryParams.sortBy)
        if (!sortColumn) {
          return undefined
        }

        switch (sortColumn.field) {
          case 'stargazers_count': return 'stars'
          case 'forks_count': return 'forks'
          case 'pushed_at': return 'updated'
          default: return sortColumn.field
        }
      }

      const paginationParams = Object.entries({
        page: queryParams.page,
        'per_page': queryParams.pageSize,
        sort: getSortColumnName(),
        order: queryParams.sortDirection
      })
        .filter(([, value]) => !!value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')

      const q = [
        encodeURIComponent(input.trim()),
        `language:${encodeURIComponent(technology)}`
      ]
        .filter(param => !!param)
        .join('+')

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${q}&${paginationParams}`,
        {
          signal,
          headers: {
            'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
        }
      )
      const data = await response.json()
      if (!response.ok) {
        throw data
      }
      return data
    }
  })

  useEffect(
    () => {
      refetch()
    },
    [input, technology, queryParams, refetch, queryClient]
  )

  return (
    <DataTable
      data={data?.items}
      columns={columns}
      queryParams={queryParams}
      totalCount={data?.total_count}
      isLoading={isLoading}
      onQueryChange={setQueryParams}
      keyExtractor={ ({ id }) => id.toString() }
      emptyState={error?.message}
      onRowClick={({ html_url }) => window.open(html_url, '_blank')}
    />
  )
}
