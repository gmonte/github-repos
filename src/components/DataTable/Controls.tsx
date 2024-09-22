import { useMemo } from 'react'

import { uniq } from 'lodash'

import { Select } from '@/components/Select'
import { Tag } from '@/components/Tag'

import styles from './Controls.module.css'
import type { DataTableData, DataTableQueryParams } from './DataTable.types'

export function Controls<Data extends DataTableData>(
  {
    queryParams,
    pageSizeOptions: _pageSizeOptions = [10, 20, 50, 100],
    totalCount,
    onQueryChange
  }: {
    queryParams: DataTableQueryParams<Data>
    pageSizeOptions?: number[]
    totalCount: number
    onQueryChange: (params: DataTableQueryParams<Data>) => void
  }
) {
  const pageSizeOptions = useMemo(
    () => {
      return uniq([..._pageSizeOptions, queryParams.pageSize])
        .sort((a, b) => a - b)
    },
    [_pageSizeOptions, queryParams.pageSize]
  )

  return (
    <div className={styles.container}>
      <Tag.Root>
        <Tag.Label>
          Repositor{totalCount === 1 ? 'y' : 'ies'} found
        </Tag.Label>
        <Tag.Value>
          {totalCount.toLocaleString()}
        </Tag.Value>
      </Tag.Root>

      <div>
        <Tag.Root>
          <Select.Root
            value={queryParams.pageSize.toString()}
            placeholder='atess'
            onValueChange={(value) => {
              onQueryChange({
                page: 1,
                pageSize: Number(value),
                sortBy: queryParams.sortBy,
                sortDirection: queryParams.sortDirection
              })
            }}
            Label={({ children }) => (
              <>
                <Tag.Label>
                  Results per page
                </Tag.Label>
                <Tag.Value>
                  {children}
                </Tag.Value>
              </>
            )}
          >
            {pageSizeOptions.map(option => (
              <Select.Option key={option} value={option.toString()}>
                {option}
              </Select.Option>
            ))}
          </Select.Root>
        </Tag.Root>
      </div>
    </div>
  )
}

Controls.displayName = 'DataTable.Controls'
