import { render, fireEvent, waitFor } from '@testing-library/react'

import { Technology } from '@/constants'
import { FilterState } from '@/store/filter'

import { Filter } from './Filter'
import { inputDebounceTime, testIds } from './Filter.constants'

// Mocking the store to use in the tests
const setInputMock = vi.fn()
const setTechnologyMock = vi.fn()

vi.mock('@/store/filter', () => ({
  useFilterStore: () => ({
    technology: Technology.javascript,
    setTechnology: setTechnologyMock,
    input: '',
    setInput: setInputMock,
    page: 1,
    setPage: vi.fn(),
    pageSize: 10,
    setPageSize: vi.fn(),
    sortBy: undefined,
    setSortBy: vi.fn(),
    sortDirection: undefined,
    setSortDirection: vi.fn(),
  }) as FilterState,
}))

describe('Filter', () => {
  beforeEach(() => {
    // Reset mocks before each test
    setInputMock.mockClear()
    setTechnologyMock.mockClear()
  })

  it('should start with empty input', async () => {
    const { getByTestId } = render(<Filter />)
    expect((getByTestId(testIds.input) as HTMLInputElement).value).toBe('')
  })

  it('should start with javascript pre-selected', async () => {
    const { getByTestId } = render(<Filter />)
    const javascriptRadioButton = getByTestId(Technology.javascript)
    expect(javascriptRadioButton).toBeChecked()
  })

  it('should call setInput with the correct value when input changes', async () => {
    const { getByTestId } = render(<Filter />)

    const value = 'React'
    const input = getByTestId(testIds.input)

    fireEvent.change(input, { target: { value } })

    expect(setInputMock).not.toBeCalled()

    await waitFor(() => {
      expect(setInputMock).toHaveBeenCalledWith(value)
    }, { timeout: inputDebounceTime + 100 })
  })

  it('should call setTechnology when changing radio values', () => {
    const { getByTestId } = render(<Filter />)
    const radioButton = getByTestId(Technology.python)
    fireEvent.click(radioButton)
    expect(setTechnologyMock).toHaveBeenCalledWith(Technology.python)
  })
})
