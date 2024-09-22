import { PropsWithChildren } from "react"

import { cva, cx, VariantProps } from "class-variance-authority"

import styles from './Root.module.css'

const style = cva(styles.container, {
  variants: {
    color: {
      light: styles.color_light,
      dark: styles.color_dark
    },
    size: {
      slim: styles.size_slim,
      normal: styles.size_normal
    }
  },
  defaultVariants: {
    color: 'light',
    size: 'normal'
  }
})


export function Root({
  className,
  color,
  size,
  children
}: VariantProps<typeof style> & PropsWithChildren<{
  className?: string
}>) {
  return (
    <div
      className={cx(
        style({ color, size }),
        className
      )}
    >
      {children}
    </div>
  )
}

Root.displayName = 'Tag.Root'
