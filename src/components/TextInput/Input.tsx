import { forwardRef, InputHTMLAttributes } from "react"

import { cx } from "class-variance-authority"

import styles from './Input.module.css'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={cx(styles.container, className)}
    />
  )
)

Input.displayName = 'TextInput.Input'
