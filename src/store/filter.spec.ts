import { renderHook, act } from '@testing-library/react'

import { Technology } from '@/constants'

import { useFilterStore } from './filter'

// Mock localStorage to avoid real interactions with it
beforeEach(() => {
  localStorage.clear()
})

describe('useFilterStore', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFilterStore())

    expect(result.current.technology).toBe(Technology.javascript)
    expect(result.current.input).toBe('')
    expect(result.current.page).toBe(1)
    expect(result.current.pageSize).toBe(10)
    expect(result.current.sortBy).toBeUndefined()
    expect(result.current.sortDirection).toBeUndefined()
  })

  it('should update technology and reset page', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setTechnology(Technology.scala)
    })

    expect(result.current.technology).toBe(Technology.scala)
    expect(result.current.page).toBe(1)
  })

  it('should update input and reset page', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setInput('React')
    })

    expect(result.current.input).toBe('React')
    expect(result.current.page).toBe(1)
  })

  it('should update page without resetting other values', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)
  })

  it('should update pageSize and reset page', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setPage(3)
    })

    expect(result.current.page).toBe(3)

    act(() => {
      result.current.setPageSize(20)
    })

    expect(result.current.pageSize).toBe(20)
    expect(result.current.page).toBe(1)
  })

  it('should update sortBy and reset page', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setPage(3)
    })

    expect(result.current.page).toBe(3)

    act(() => {
      result.current.setSortBy('name')
    })

    expect(result.current.sortBy).toBe('name')
    expect(result.current.page).toBe(1)
  })

  it('should update sortDirection asc and reset page', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setPage(3)
    })

    expect(result.current.page).toBe(3)

    act(() => {
      result.current.setSortDirection('asc')
    })

    expect(result.current.sortDirection).toBe('asc')
    expect(result.current.page).toBe(1)
  })

  it('should update sortDirection desc and reset page', () => {
    const { result } = renderHook(() => useFilterStore())

    act(() => {
      result.current.setPage(3)
    })

    expect(result.current.page).toBe(3)

    act(() => {
      result.current.setSortDirection('desc')
    })

    expect(result.current.sortDirection).toBe('desc')
    expect(result.current.page).toBe(1)
  })
})
