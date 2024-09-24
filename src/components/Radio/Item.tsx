import { PropsWithChildren } from 'react'

import { Check } from '@phosphor-icons/react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { cx } from 'class-variance-authority'

import styles from './Item.module.css'

export function Item({
  children,
  value,
  className
}: PropsWithChildren<{
  value: string
  label?: string
  className?: string
}>) {
  return (
    <RadioGroup.Item
      value={value}
      className={ cx(styles.container, className) }
      data-testid={value}
    >
      <div className={ styles.indicator_container }>
        <RadioGroup.Indicator asChild>
          <div className={ styles.indicator }>
            <Check weight="bold" size={12} />
          </div>
        </RadioGroup.Indicator>
      </div>

      {children}
    </RadioGroup.Item>
  )
}

Item.displayName = 'Radio.Item'
