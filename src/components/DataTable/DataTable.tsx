import { ReactNode } from 'react'

import { Controls } from './Controls'
import styles from './DataTable.module.css'
import type { DataTableColumn, DataTableData, DataTableQueryParams } from './DataTable.types'
import { Pagination } from './Pagination'
import { Table } from './Table'

export function DataTable<Data extends DataTableData>(
  {
    data,
    columns,
    queryParams,
    pageSizeOptions,
    totalCount = 0,
    isLoading,
    emptyState,
    keyExtractor,
    onQueryChange,
    onRowClick
  }: {
    data?: Data[]
    columns: Array<DataTableColumn<Data>>
    queryParams: DataTableQueryParams<Data>
    pageSizeOptions?: number[]
    totalCount?: number
    isLoading: boolean
    emptyState?: ReactNode
    keyExtractor: (item: Data) => string
    onQueryChange: (params: DataTableQueryParams<Data>) => void
    onRowClick?: (row: Data) => void
  }
) {

  return (
    <div className={ styles.container }>
      <Controls
        queryParams={queryParams}
        onQueryChange={onQueryChange}
        totalCount={totalCount}
        pageSizeOptions={pageSizeOptions}
      />

      <Table
        data={data}
        columns={columns}
        isLoading={isLoading}
        queryParams={queryParams}
        emptyState={emptyState}
        onQueryChange={onQueryChange}
        keyExtractor={keyExtractor}
        onRowClick={onRowClick}
      />

      <Pagination
        queryParams={queryParams}
        onQueryChange={onQueryChange}
        totalCount={totalCount}
      />
    </div>
  )
}

