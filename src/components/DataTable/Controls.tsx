import { Select } from '@/components/Select'
import { Tag } from '@/components/Tag'

import styles from './Controls.module.css'
import { DataTableData, DataTableProps } from './DataTable.types'

export function Controls<Data extends DataTableData>(
  {
    pageSize,
    pageSizeOptions,
    totalCount,
    onPageSizeChange
  }: {
    pageSize: DataTableProps<Data>['pageSize']
    pageSizeOptions: NonNullable<DataTableProps<Data>['pageSizeOptions']>
    totalCount: NonNullable<DataTableProps<Data>['totalCount']>
    onPageSizeChange: DataTableProps<Data>['onPageSizeChange']
  }
) {

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
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
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
