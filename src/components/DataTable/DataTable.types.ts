import { ReactNode } from "react"

import { Paths } from 'type-fest'

export type SortDirection = 'asc' | 'desc'

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
