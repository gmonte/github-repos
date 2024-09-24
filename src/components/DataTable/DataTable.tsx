import { Controls } from './Controls'
import styles from './DataTable.module.css'
import type { DataTableData, DataTableProps } from './DataTable.types'
import { Pagination } from './Pagination'
import { Table } from './Table'

export function DataTable<Data extends DataTableData>(
  {
    data,
    columns,
    page,
    pageSize,
    pageSizeOptions,
    totalCount = 0,
    paginationSize,
    sortBy,
    sortDirection,
    isLoading,
    emptyState,
    onPageChange,
    onPageSizeChange,
    onSortByChange,
    onSortDirectionChange,
    keyExtractor,
    onRowClick
  }: DataTableProps<Data>
) {

  return (
    <div className={ styles.container }>
      <Controls
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        totalCount={totalCount}
        pageSizeOptions={pageSizeOptions}
      />

      <Table
        data={data}
        columns={columns}
        pageSize={pageSize}
        sortBy={sortBy}
        sortDirection={sortDirection}
        isLoading={isLoading}
        emptyState={emptyState}
        onSortByChange={onSortByChange}
        onSortDirectionChange={onSortDirectionChange}
        keyExtractor={keyExtractor}
        onRowClick={onRowClick}
      />

      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        paginationSize={paginationSize}
        onPageChange={onPageChange}
      />
    </div>
  )
}

