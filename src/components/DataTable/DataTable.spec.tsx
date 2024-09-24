import { fireEvent, render } from '@testing-library/react'

import { queryAllByAttr, queryByAttr } from '@/utils/test'

import { Controls } from './Controls'
import { testIds } from './DataTable.constants'
import { DataTableColumn } from './DataTable.types'
import { Pagination } from './Pagination'
import { Table } from './Table'

const mockedData = [
  {
    id: 1,
    name: 'John',
    age: 30,
    address: {
      city: 'New York'
    }
  },
  {
    id: 2,
    name: 'Mary',
    age: 32,
    address: {
      city: 'San Francisco'
    }
  },
  {
    id: 3,
    name: 'Bob',
    age: 28,
    address: {
      city: 'Los Angeles'
    }
  }
]

const mockedColumns: DataTableColumn<typeof mockedData[0]>[] = [
  {
    field: 'id',
    title: 'ID',
    render: ({ id }) => (
      <div>
        # {id}
      </div>
    )
  },
  {
    field: 'name',
    title: 'Name',
    sortable: true
  },
  {
    field: 'age',
    title: 'Age',
    sortable: true
  },
  {
    field: 'address.city',
    title: 'City',
    sortable: true
  }
]

describe('DataTable', () => {

  describe('Controls', () => {
    describe('total counter', () => {
      it('should render the total counter formatted value', () => {
        const totalCount = 123456
        const { getByTestId } = render(
          <Controls
            pageSize={10}
            totalCount={totalCount}
          />
        )
        expect(getByTestId(testIds.controls.counter.value)).toHaveTextContent(totalCount.toLocaleString())
      })

      it('should render the total counter label as singular when only have 1 register', () => {
        const { getByTestId } = render(
          <Controls
            pageSize={10}
            totalCount={1}
          />
        )
        expect(getByTestId(testIds.controls.counter.label)).toHaveTextContent('Repository found')
      })

      it('should render the total counter label as plural when only have w or more registers', () => {
        const { getByTestId } = render(
          <Controls
            pageSize={10}
            totalCount={2}
          />
        )
        expect(getByTestId(testIds.controls.counter.label)).toHaveTextContent('Repositories found')
      })
    })

    describe('page size', () => {
      it('should accept any integer as pageSize', () => {
        const pageSize = 71
        const { getByTestId } = render(
          <Controls
            pageSize={pageSize}
            totalCount={1}
          />
        )
        expect(getByTestId(testIds.controls.pageSize.value)).toHaveTextContent(pageSize.toString())
      })
    })
  })

  describe('Table', () => {
    it('should only show loading rows when isLoading is true', () => {
      const pageSize = 10
      const { container } = render(
        <Table
          data={[] as typeof mockedData}
          columns={mockedColumns}
          isLoading={true}
          pageSize={pageSize}
          keyExtractor={({ id }) => id }
        />
      )
      expect(queryAllByAttr('data-row-state')(container, 'loading')).toHaveLength(pageSize)
      expect(queryAllByAttr('data-row-state')(container, 'empty')).toHaveLength(0)
      expect(queryAllByAttr('data-row-state')(container, 'loaded')).toHaveLength(0)
    })

    it('should only show empty state when isLoading is false and data is empty', () => {
      const { container } = render(
        <Table
          data={[] as typeof mockedData}
          columns={mockedColumns}
          keyExtractor={({ id }) => id}
        />
      )
      expect(queryAllByAttr('data-row-state')(container, 'loading')).toHaveLength(0)
      expect(queryAllByAttr('data-row-state')(container, 'empty')).toHaveLength(1)
      expect(queryAllByAttr('data-row-state')(container, 'loaded')).toHaveLength(0)
    })

    it('should only show loaded data when isLoading is false and data is not empty', () => {
      const pageSize = 10
      const { container } = render(
        <Table
          data={mockedData}
          columns={mockedColumns}
          pageSize={pageSize}
          keyExtractor={({ id }) => id}
        />
      )
      expect(queryAllByAttr('data-row-state')(container, 'loading')).toHaveLength(0)
      expect(queryAllByAttr('data-row-state')(container, 'empty')).toHaveLength(0)
      expect(queryAllByAttr('data-row-state')(container, 'loaded')).toHaveLength(Math.min(mockedData.length || pageSize))
    })

    it('should be able to click in a row', () => {
      const onRowClick = vi.fn()
      const { getByTestId } = render(
        <Table
          data={mockedData}
          columns={mockedColumns}
          keyExtractor={({ id }) => id}
          onRowClick={onRowClick}
        />
      )
      fireEvent.click(getByTestId(testIds.table.row(2)))
      expect(onRowClick).toBeCalledTimes(1)
      expect(onRowClick).toBeCalledWith(mockedData[1])
    })

    it('should be able to render directly the field value', () => {
      const { getByTestId } = render(
        <Table
          data={mockedData}
          columns={mockedColumns}
          keyExtractor={({ id }) => id}
        />
      )
      expect(
        getByTestId(testIds.table.cell<typeof mockedData[0]>('name', 1))
      ).toHaveTextContent(mockedData[0].name)
    })

    it('should be able to render custom field value', () => {
      const { getByTestId } = render(
        <Table
          data={mockedData}
          columns={mockedColumns}
          keyExtractor={({ id }) => id}
        />
      )
      expect(
        getByTestId(testIds.table.cell<typeof mockedData[0]>('id', 1))
      ).toHaveTextContent(`# ${mockedData[0].id}`)
    })

    describe('when sorting', () => {
      it('should not sort by unsortable column', () => {
        const onSortByChange = vi.fn()
        const onSortDirectionChange = vi.fn()
        const { getByTestId } = render(
          <Table
            data={mockedData}
            columns={mockedColumns}
            keyExtractor={({ id }) => id}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        )
        fireEvent.click(getByTestId(testIds.table.head<typeof mockedData[0]>('id')))
        expect(onSortByChange).not.toBeCalled()
        expect(onSortDirectionChange).not.toBeCalled()
      })

      it('should sort by sortable column - desc', () => {
        const onSortByChange = vi.fn()
        const onSortDirectionChange = vi.fn()
        const { getByTestId } = render(
          <Table
            data={mockedData}
            columns={mockedColumns}
            keyExtractor={({ id }) => id}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        )
        fireEvent.click(getByTestId(testIds.table.head<typeof mockedData[0]>('name')))
        expect(onSortByChange).toBeCalledTimes(1)
        expect(onSortByChange).toBeCalledWith('name')
        expect(onSortDirectionChange).toBeCalledTimes(1)
        expect(onSortDirectionChange).toBeCalledWith('desc')
      })

      it('should sort by already sorted column - asc', () => {
        const onSortByChange = vi.fn()
        const onSortDirectionChange = vi.fn()
        const { getByTestId } = render(
          <Table
            data={mockedData}
            columns={mockedColumns}
            sortBy="address.city"
            sortDirection="desc"
            keyExtractor={({ id }) => id}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        )
        fireEvent.click(getByTestId(testIds.table.head<typeof mockedData[0]>('address.city')))
        expect(onSortByChange).not.toBeCalled()
        expect(onSortDirectionChange).toBeCalledTimes(1)
        expect(onSortDirectionChange).toBeCalledWith('asc')
      })

      it('should remove sort by already desc sorted column', () => {
        const onSortByChange = vi.fn()
        const onSortDirectionChange = vi.fn()
        const { getByTestId } = render(
          <Table
            data={mockedData}
            columns={mockedColumns}
            sortBy="address.city"
            sortDirection="asc"
            keyExtractor={({ id }) => id}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        )
        fireEvent.click(getByTestId(testIds.table.head<typeof mockedData[0]>('address.city')))
        expect(onSortByChange).toBeCalledTimes(1)
        expect(onSortByChange).toBeCalledWith(undefined)
        expect(onSortDirectionChange).toBeCalledTimes(1)
        expect(onSortDirectionChange).toBeCalledWith(undefined)
      })

      it('should change sort column - from asc', () => {
        const onSortByChange = vi.fn()
        const onSortDirectionChange = vi.fn()
        const { getByTestId } = render(
          <Table
            data={mockedData}
            columns={mockedColumns}
            sortBy="address.city"
            sortDirection="asc"
            keyExtractor={({ id }) => id}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        )
        fireEvent.click(getByTestId(testIds.table.head<typeof mockedData[0]>('name')))
        expect(onSortByChange).toBeCalledTimes(1)
        expect(onSortByChange).toBeCalledWith('name')
        expect(onSortDirectionChange).toBeCalledTimes(1)
        expect(onSortDirectionChange).toBeCalledWith('desc')
      })

      it('should change sort column - from desc', () => {
        const onSortByChange = vi.fn()
        const onSortDirectionChange = vi.fn()
        const { getByTestId } = render(
          <Table
            data={mockedData}
            columns={mockedColumns}
            sortBy="address.city"
            sortDirection="desc"
            keyExtractor={({ id }) => id}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        )
        fireEvent.click(getByTestId(testIds.table.head<typeof mockedData[0]>('name')))
        expect(onSortByChange).toBeCalledTimes(1)
        expect(onSortByChange).toBeCalledWith('name')
        expect(onSortDirectionChange).not.toBeCalled()
      })
    })

  })

  describe('Pagination', () => {
    it('should not render when total count is 0', async () => {
      const { queryByTestId } = render(
        <Pagination
          page={1}
          pageSize={10}
          totalCount={0}
        />
      )
      expect(queryByTestId(testIds.pagination.container)).not.toBeInTheDocument()
    })

    describe('when navigating', () => {
      it('should navigate to next page', () => {
        const onPageChange = vi.fn()
        const { getByTestId } = render(
          <Pagination
            page={2}
            pageSize={10}
            totalCount={30}
            onPageChange={onPageChange}
          />
        )
        fireEvent.click(getByTestId(testIds.pagination.next))
        expect(onPageChange).toBeCalledTimes(1)
        expect(onPageChange).toBeCalledWith(3)
      })

      it('should navigate to previous page', () => {
        const onPageChange = vi.fn()
        const { getByTestId } = render(
          <Pagination
            page={2}
            pageSize={10}
            totalCount={30}
            onPageChange={onPageChange}
          />
        )
        fireEvent.click(getByTestId(testIds.pagination.previous))
        expect(onPageChange).toBeCalledTimes(1)
        expect(onPageChange).toBeCalledWith(1)
      })

      it('should navigate to specific page', () => {
        const onPageChange = vi.fn()
        const { getByTestId } = render(
          <Pagination
            page={1}
            pageSize={10}
            totalCount={30}
            onPageChange={onPageChange}
          />
        )
        fireEvent.click(getByTestId(testIds.pagination.page(3)))
        expect(onPageChange).toBeCalledTimes(1)
        expect(onPageChange).toBeCalledWith(3)
      })
    })

    describe('when pagination size is 5 and there is 8 pages', () => {
      const defaultProps = {
        pageSize: 10,
        totalCount: 80,
        paginationSize: 5
      }

      describe('when on page 1', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={1} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(1))
        })

        it('should disable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={1} />)
          expect(getByTestId(testIds.pagination.previous)).toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={1} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={1} />)
          expect(getByTestId(testIds.pagination.page(1))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(6))).not.toBeInTheDocument()
        })
      })

      describe('when on page 2', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={2} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(2))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={2} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={2} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={2} />)
          expect(getByTestId(testIds.pagination.page(1))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(6))).not.toBeInTheDocument()
        })
      })

      describe('when on page 3', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={3} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(3))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={3} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={3} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={3} />)
          expect(getByTestId(testIds.pagination.page(1))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(6))).not.toBeInTheDocument()
        })
      })

      describe('when on page 4', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={4} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(4))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={4} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={4} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={4} />)
          expect(queryByTestId(testIds.pagination.page(1))).not.toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(6))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(7))).not.toBeInTheDocument()
        })
      })

      describe('when on page 5', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={5} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(5))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={5} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={5} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={5} />)
          expect(queryByTestId(testIds.pagination.page(2))).not.toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(6))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(7))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(8))).not.toBeInTheDocument()
        })
      })

      describe('when on page 6', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={6} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(6))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={6} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={6} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={6} />)
          expect(queryByTestId(testIds.pagination.page(3))).not.toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(6))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(7))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(8))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(9))).not.toBeInTheDocument()
        })
      })

      describe('when on page 7', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={7} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(7))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={7} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should enable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={7} />)
          expect(getByTestId(testIds.pagination.next)).not.toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={7} />)
          expect(queryByTestId(testIds.pagination.page(3))).not.toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(6))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(7))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(8))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(9))).not.toBeInTheDocument()
        })
      })

      describe('when on page 8', () => {
        it('should render page as the only active item', () => {
          const { container } = render(<Pagination {...defaultProps} page={8} />)
          expect(
            queryByAttr('data-active')(container, true.toString())?.getAttribute('data-testid')
          ).toBe(testIds.pagination.page(8))
        })

        it('should enable the previous button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={8} />)
          expect(getByTestId(testIds.pagination.previous)).not.toBeDisabled()
        })

        it('should disable the next button', () => {
          const { getByTestId } = render(<Pagination {...defaultProps} page={8} />)
          expect(getByTestId(testIds.pagination.next)).toBeDisabled()
        })

        it('should render until pagination size', () => {
          const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={8} />)
          expect(queryByTestId(testIds.pagination.page(3))).not.toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(4))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(5))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(6))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(7))).toBeInTheDocument()
          expect(getByTestId(testIds.pagination.page(8))).toBeInTheDocument()
          expect(queryByTestId(testIds.pagination.page(9))).not.toBeInTheDocument()
        })
      })
    })

    describe('when pagination size is 4 and there is 3 pages', () => {
      const defaultProps = {
        pageSize: 10,
        totalCount: 30,
        paginationSize: 4
      }

      it('should render correctly when page 1', () => {
        const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={1} />)
        expect(getByTestId(testIds.pagination.page(1))).toBeInTheDocument()
        expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
        expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
        expect(queryByTestId(testIds.pagination.page(4))).not.toBeInTheDocument()
      })

      it('should render correctly when page 2', () => {
        const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={2} />)
        expect(getByTestId(testIds.pagination.page(1))).toBeInTheDocument()
        expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
        expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
        expect(queryByTestId(testIds.pagination.page(4))).not.toBeInTheDocument()
      })

      it('should render correctly when page 3', () => {
        const { getByTestId, queryByTestId } = render(<Pagination {...defaultProps} page={3} />)
        expect(getByTestId(testIds.pagination.page(1))).toBeInTheDocument()
        expect(getByTestId(testIds.pagination.page(2))).toBeInTheDocument()
        expect(getByTestId(testIds.pagination.page(3))).toBeInTheDocument()
        expect(queryByTestId(testIds.pagination.page(4))).not.toBeInTheDocument()
      })
    })
  })

})
