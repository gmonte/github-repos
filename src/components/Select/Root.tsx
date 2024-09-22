import { ComponentProps, ElementType, PropsWithChildren } from 'react'

import { CaretDown, CaretUp } from '@phosphor-icons/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import styles from './Root.module.css'

export function Root({
  placeholder,
  children,
  Label = ({ children }) => children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Root> & {
  Label?: ElementType<PropsWithChildren>
  placeholder?: string
}) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger className={styles.trigger}>
        <Label>
          <SelectPrimitive.Value placeholder={placeholder} />
        </Label>
        <SelectPrimitive.Icon className={styles.icon}>
          <CaretDown weight="fill" size={12} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={styles.content}>
          <SelectPrimitive.ScrollUpButton className={styles.arrow_navigation}>
            <CaretUp weight="fill" size={12} />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className={styles.options_container}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className={styles.arrow_navigation}>
            <CaretDown weight="fill" size={12} />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

Root.displayName = 'Select.Root'
