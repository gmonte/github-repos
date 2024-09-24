import { useMemo } from 'react'

import { uniq } from 'lodash'

import { Select } from '@/components/Select'
import { Tag } from '@/components/Tag'

import styles from './Controls.module.css'
import { testIds } from './DataTable.constants'
import { DataTableData, DataTableProps } from './DataTable.types'

export function Controls<Data extends DataTableData>(
  {
    pageSize,
    pageSizeOptions: _pageSizeOptions = [10, 20, 50, 100],
    totalCount,
    onPageSizeChange
  }: {
    pageSize: DataTableProps<Data>['pageSize']
    pageSizeOptions?: NonNullable<DataTableProps<Data>['pageSizeOptions']>
    totalCount: NonNullable<DataTableProps<Data>['totalCount']>
    onPageSizeChange?: DataTableProps<Data>['onPageSizeChange']
  }
) {

  const pageSizeOptions = useMemo(
    () => {
      return uniq([..._pageSizeOptions, pageSize])
        .sort((a, b) => a - b)
    },
    [_pageSizeOptions, pageSize]
  )

  return (
    <div className={styles.container}>
      <Tag.Root>
        <Tag.Label data-testid={testIds.controls.counter.label}>
          Repositor{totalCount === 1 ? 'y' : 'ies'} found
        </Tag.Label>
        <Tag.Value data-testid={testIds.controls.counter.value}>
          {totalCount.toLocaleString()}
        </Tag.Value>
      </Tag.Root>

      <div>
        <Tag.Root>
          <Select.Root
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange?.(Number(value))}
            Label={({ children }) => (
              <>
                <Tag.Label>
                  Results per page
                </Tag.Label>
                <Tag.Value data-testid={testIds.controls.pageSize.value}>
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
