import { PropsWithChildren } from "react"

import { cx } from "class-variance-authority"

import { WithTestID } from "@/utils/test"

import styles from './Label.module.css'

export function Label({
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

Label.displayName = 'Tag.Label'
