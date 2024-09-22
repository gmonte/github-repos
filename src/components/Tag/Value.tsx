import { PropsWithChildren } from "react"

import { cx } from "class-variance-authority"

import styles from './Value.module.css'

export function Value({
  className,
  children
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <div className={cx(styles.container, className)}>
      {children}
    </div>
  )
}

Value.displayName = 'Tag.Value'
