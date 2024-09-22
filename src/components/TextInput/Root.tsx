import { PropsWithChildren } from "react"

import { cx } from "class-variance-authority"

import styles from './Root.module.css'

export function Root({
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

Root.displayName = 'TextInput.Root'
