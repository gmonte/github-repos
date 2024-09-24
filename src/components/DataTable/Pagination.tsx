import { useMemo } from 'react'

import {
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'

import { Button } from '@/components/Button'

import { DataTableData, DataTableProps } from './DataTable.types'
import styles from './Pagination.module.css'

export function Pagination<Data extends DataTableData>(
  {
    page,
    pageSize,
    totalCount = 0,
    paginationSize: _paginationSize = 5,
    onPageChange
  }: {
    page: DataTableProps<Data>['page']
    pageSize: DataTableProps<Data>['pageSize']
    totalCount?: DataTableProps<Data>['totalCount']
    paginationSize?: DataTableProps<Data>['paginationSize']
    onPageChange: DataTableProps<Data>['onPageChange']
  }
) {
  const numberOfPages = Math.ceil(totalCount / pageSize)
  const paginationSize = Math.min(_paginationSize, numberOfPages)

  const paginationOptions = useMemo(() => {
    const half = Math.floor(paginationSize / 2)
    let startPage = Math.max(page - half, 1)
    const endPage = Math.min(startPage + paginationSize - 1, numberOfPages)

    if (endPage - startPage + 1 < paginationSize) {
      startPage = Math.max(endPage - paginationSize + 1, 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
  }, [page, paginationSize, numberOfPages])

  return (
    <>
      {!!numberOfPages && (
        <div className={styles.container}>
          <Button
            active={page === 1}
            disabled={page === 1}
            variant="link"
            onClick={() => onPageChange(page - 1)}
          >
            <CaretLeft />
            {' '}Previous
          </Button>

          {paginationOptions.map((pageNumber) => (
            <Button
              key={pageNumber}
              active={pageNumber === page}
              disabled={pageNumber === page}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            active={page === numberOfPages}
            disabled={page === numberOfPages}
            variant="link"
            onClick={() => onPageChange(page + 1)}
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
