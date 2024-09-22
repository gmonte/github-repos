import {
  isValidElement,
  ReactNode,
  useCallback
} from 'react'

import { SortAscending } from '@phosphor-icons/react'
import { cva, cx } from 'class-variance-authority'
import { get, isEmpty } from 'lodash'
import type { Paths } from 'type-fest'

import { Skeleton } from '@/components/Skeleton'

import type { DataTableColumn, DataTableData, DataTableQueryParams, SortDirection } from './DataTable.types'
import styles from './Table.module.css'

const isRenderable = (val: unknown) => typeof val === 'string' || typeof val === 'number' || isValidElement(val)

const alignStyle = cva(styles.table_cell, {
  variants: {
    align: {
      left: styles.align_left,
      center: styles.align_center,
      right: styles.align_right
    }
  },
  defaultVariants: { align: 'left' }
})

export function Table<Data extends DataTableData>(
  {
    data,
    columns,
    queryParams,
    isLoading,
    emptyState,
    keyExtractor,
    onQueryChange,
    onRowClick
  }: {
    data?: Data[]
    columns: Array<DataTableColumn<Data>>
    queryParams: DataTableQueryParams<Data>
    isLoading: boolean
    emptyState?: ReactNode
    keyExtractor: (item: Data) => string
    onQueryChange: (params: DataTableQueryParams<Data>) => void
    onRowClick?: (row: Data) => void
  }
) {
  const handleSort = useCallback(
    (field: Paths<Data>) => {
      let newSortBy: Paths<Data> | undefined = field
      let newSortDirection: SortDirection | undefined = 'desc'

      if (queryParams.sortBy === field) {
        if (queryParams.sortDirection === 'asc') {
          newSortDirection = undefined
          newSortBy = undefined
        } else {
          newSortDirection = 'asc'
        }
      }

      onQueryChange({
        page: 1,
        pageSize: queryParams.pageSize,
        sortBy: newSortBy,
        sortDirection: newSortDirection
      })
    },
    [onQueryChange, queryParams]
  )

  return (
    <div className={ styles.container }>
      <table className={ styles.table }>
        <thead className={ styles.table_head }>
          <tr className={ styles.table_head_tr }>
            {columns.map(({
              title,
              headerClassName,
              align,
              field,
              sortable
            }) => (
              <th
                key={field}
                onClick={ () => sortable && handleSort(field, ) }
              >
                <div
                  className={ cx(
                    styles.table_head_cell,
                    alignStyle({ align }),
                    { [styles.sortable]: sortable },
                    headerClassName,
                  ) }
                >
                  {title}

                  {sortable && (
                    <SortAscending
                      weight="bold"
                      size={ 18 }
                      className={ cx(
                        styles.sort_icon,
                        { [styles.sort_icon_asc]: queryParams.sortDirection === 'asc' },
                        queryParams.sortBy === field ? styles.sort_icon_enabled : styles.sort_icon_disabled
                      ) }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading && Array.from({ length: queryParams.pageSize }).map((_, index) => (
            <tr key={index} className={styles.table_body_tr}>
              {columns.map(({ field, cellClassName }) => (
                <td key={`${index}.${field}`} className={cx(styles.table_cell, cellClassName)}>
                  <Skeleton className={styles.skeleton} />
                </td>
              ))}
            </tr>
          ))}

          {!isLoading && isEmpty(data) && (
            <tr className={styles.table_body_tr}>
              <td colSpan={columns.length} className={cx(styles.table_cell, styles.empty_state)}>
                {emptyState ?? 'We could not find any results for this filter'}
              </td>
            </tr>
          )}

          {data?.map?.((item) => {
            const itemKey = keyExtractor(item)
            return (
              <tr
                key={ itemKey }
                className={ cx(
                  styles.table_body_tr,
                  { [styles.table_body_tr_clickable]: !!onRowClick }
                ) }
                onClick={() => onRowClick?.(item)}
              >
                {columns.map(({
                  field,
                  align,
                  render,
                  cellClassName
                }) => {
                  let content = render?.(item)
                  if (!content) {
                    const value = get(item, field)
                    if (isRenderable(value)) {
                      content = value
                    }
                  }

                  return (
                    <td key={ `${itemKey}.${field}` }>
                      <div className={ cx(
                        alignStyle({ align }),
                        cellClassName
                      ) }>
                        {content ?? '-'}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = 'DataTable.Table'
