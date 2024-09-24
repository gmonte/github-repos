import { ComponentProps, ReactNode } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cx } from 'class-variance-authority'

import styles from './Tooltip.module.css'

export function Tooltip({
  children,
  title,
  side,
  className,
  ...props
}: TooltipPrimitive.TooltipProps & {
  title?: ReactNode
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side']
  className?: string
}) {
  if (!title) {
    return children
  }

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root { ...props }>
        <TooltipPrimitive.Trigger asChild>
          <div className={cx(styles.children, className)}>
            {children}
          </div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            style={{ zIndex: 20 }}
            side={side}
            className={styles.content}
            sideOffset={0}
          >
            <span className={styles.title_container}>
              {title}
            </span>
            <TooltipPrimitive.Arrow className={styles.arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
