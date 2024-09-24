import { PropsWithChildren } from "react"

import { cx } from "class-variance-authority"

import { WithTestID } from "@/utils/test"

import styles from './Value.module.css'

export function Value({
  className,
  children,
  ...rest
}: WithTestID<
  PropsWithChildren<{
    className?: string;
  }>
>) {
  return (
    <div className={cx(styles.container, className)} {...rest}>
      {children}
    </div>
  )
}

Value.displayName = 'Tag.Value'
