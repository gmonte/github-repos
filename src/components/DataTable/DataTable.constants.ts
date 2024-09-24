import { Key } from "react"

import { Paths } from "type-fest"

export const testIds = {
  controls: {
    counter: {
      label: `controls-counter-label`,
      value: `controls-counter-value`
    },
    pageSize: {
      value: `controls-page-size-value`
    }
  },
  table: {
    head: <T>(field: Paths<T>) => `table-head-${field}`,
    row: (key: Key) => `table-row-${ key }`,
    column: (key: Key) => `table-column-${ key }`,
    cell: <T>(field: Paths<T>, key: Key) => `table-cell-${key}-${field}`
  },
  pagination: {
    container: 'pagination-container',
    previous: 'pagination-previous',
    next: 'pagination-next',
    page: (page: number) => `pagination-page-${ page }`,
  },
}
