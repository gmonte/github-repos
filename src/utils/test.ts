import { queryHelpers } from "@testing-library/react"

export type WithTestID<T extends object = object> = T & {
  'data-testid'?: string
}

export const queryByAttr = (attr: string) => queryHelpers.queryByAttribute.bind(
  null,
  attr,
)

export const queryAllByAttr = (attr: string) => queryHelpers.queryAllByAttribute.bind(
  null,
  attr,
)


