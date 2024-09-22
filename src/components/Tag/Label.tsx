import { PropsWithChildren } from "react"

import { cx } from "class-variance-authority"

import styles from './Label.module.css'

export function Label({
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

Label.displayName = 'Tag.Label'
