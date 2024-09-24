import {
  isValidElement,
  startTransition,
  useCallback
} from 'react'

import { SortAscending } from '@phosphor-icons/react'
import { cva, cx } from 'class-variance-authority'
import { get, isEmpty } from 'lodash'
import type { Paths } from 'type-fest'

import { Skeleton } from '@/components/Skeleton'
import { SortDirection } from '@/types'

import type { DataTableData, DataTableProps } from './DataTable.types'
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
    pageSize,
    sortBy,
    sortDirection,
    isLoading,
    emptyState,
    onSortByChange,
    onSortDirectionChange,
    keyExtractor,
    onRowClick
  }: {
    data?: DataTableProps<Data>['data']
    columns: DataTableProps<Data>['columns']
    pageSize: DataTableProps<Data>['pageSize']
    sortBy?: DataTableProps<Data>['sortBy']
    sortDirection?: DataTableProps<Data>['sortDirection']
    isLoading: DataTableProps<Data>['isLoading']
    emptyState?: DataTableProps<Data>['emptyState']
    onSortByChange: DataTableProps<Data>['onSortByChange']
    onSortDirectionChange: DataTableProps<Data>['onSortDirectionChange']
    keyExtractor: DataTableProps<Data>['keyExtractor']
    onRowClick?: DataTableProps<Data>['onRowClick']
  }
) {
  const handleSort = useCallback(
    (field: Paths<Data>) => {
      let newSortBy: Paths<Data> | undefined = field
      let newSortDirection: SortDirection | undefined = 'desc'

      if (sortBy === field) {
        if (sortDirection === 'asc') {
          newSortDirection = undefined
          newSortBy = undefined
        } else {
          newSortDirection = 'asc'
        }
      }

      startTransition(() => {
        if (sortBy !== newSortBy) {
          onSortByChange(newSortBy)
        }
        if (sortDirection !== newSortDirection) {
          onSortDirectionChange(newSortDirection)
        }
      })
    },
    [onSortByChange, onSortDirectionChange, sortBy, sortDirection]
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
                        { [styles.sort_icon_desc]: sortDirection === 'desc' },
                        sortBy === field ? styles.sort_icon_enabled : styles.sort_icon_disabled
                      ) }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading && Array.from({ length: pageSize }).map((_, index) => (
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
