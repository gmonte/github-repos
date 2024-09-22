import { ComponentProps } from 'react'

import { Check } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cx } from 'class-variance-authority'

import styles from './Option.module.css'

export function Option({ children, className, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item className={cx(styles.container, className)} {...props}>
      <SelectPrimitive.ItemText asChild>
        <div className={styles.text}>
          {children}
        </div>
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles.indicator}>
        <Check />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

Option.displayName = 'Select.Option'
