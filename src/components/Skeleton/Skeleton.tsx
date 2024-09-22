import { cx } from 'class-variance-authority'

import styles from './Skeleton.module.css'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={ cx(styles.container, className) } />
  )
}
