import {
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'

import { Button } from '@/components/Button'

import type { DataTableData, DataTableQueryParams } from './DataTable.types'
import styles from './Pagination.module.css'

export function Pagination<Data extends DataTableData>(
  {
    queryParams,
    totalCount = 0,
    onQueryChange
  }: {
    queryParams: DataTableQueryParams<Data>
    totalCount?: number
    onQueryChange: (params: DataTableQueryParams<Data>) => void
  }
) {
  const numberOfPages = Math.ceil(totalCount / queryParams.pageSize)
  const paginationSize = Math.min(4, numberOfPages)

  return (
    <>
      {!!numberOfPages && (
        <div className={styles.container}>
          <Button
            active={queryParams.page === 1}
            disabled={queryParams.page === 1}
            variant="link"
            onClick={() => {
              onQueryChange({
                page: queryParams.page - 1,
                pageSize: queryParams.pageSize,
                sortBy: queryParams.sortBy,
                sortDirection: queryParams.sortDirection,
              })
            }}
          >
            <CaretLeft />
            {' '}Previous
          </Button>

          {Array.from({ length: paginationSize }).map((_, index) => {
            let pageNumber = queryParams.page + index
            if (queryParams.page < 2) {
              pageNumber = index + 1
            } else if (queryParams.page === numberOfPages - 2) {
              pageNumber = queryParams.page + index
            } else if (queryParams.page === numberOfPages - 1) {
              pageNumber = queryParams.page + index - 1
            } else if (queryParams.page === numberOfPages) {
              pageNumber = queryParams.page + index - paginationSize
            }
            return (
              <Button
                key={pageNumber.toString()}
                active={pageNumber === queryParams.page}
                disabled={pageNumber === queryParams.page}
                onClick={() => {
                  onQueryChange({
                    page: pageNumber,
                    pageSize: queryParams.pageSize,
                    sortBy: queryParams.sortBy,
                    sortDirection: queryParams.sortDirection,
                  })
                }}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
            active={queryParams.page === numberOfPages}
            disabled={queryParams.page === numberOfPages}
            variant="link"
            onClick={() => {
              onQueryChange({
                page: queryParams.page + 1,
                pageSize: queryParams.pageSize,
                sortBy: queryParams.sortBy,
                sortDirection: queryParams.sortDirection,
              })
            }}
          >
            Next{' '}
            <CaretRight />
          </Button>
        </div>
      )}
    </>
  )
}

Pagination.displayName = 'DataTable.Pagination'
