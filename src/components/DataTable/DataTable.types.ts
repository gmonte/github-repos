import { ReactNode } from "react"

import { Paths } from 'type-fest'

import { SortDirection } from "@/types"

export type DataTableData = Record<string, unknown>

export type DataTableColumn<Data extends DataTableData, T extends Paths<Data> = Paths<Data>> = {
  field: T;
  title?: ReactNode;
  align?: 'left' | 'center' | 'right';
  headerClassName?: string;
  cellClassName?: string;
  render?: (data: Data) => ReactNode;
  sortable?: boolean;
}

export type DataTableQueryParams<Data extends DataTableData> = {
  page: number,
  pageSize: number,
  sortBy?: Paths<Data>,
  sortDirection?: SortDirection
}

export type DataTableProps<Data extends DataTableData> = {
  data?: Data[]
  columns: Array<DataTableColumn<Data>>
  page: number
  pageSize: number
  pageSizeOptions?: number[]
  totalCount?: number
  paginationSize?: number
  sortBy?: Paths<Data>
  sortDirection?: SortDirection
  isLoading: boolean
  emptyState?: ReactNode
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSortByChange: (sortBy?: Paths<Data>) => void
  onSortDirectionChange: (sortDirection?: SortDirection) => void
  keyExtractor: (item: Data) => string
  onRowClick?: (row: Data) => void
}
