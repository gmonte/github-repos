import { ComponentProps } from "react"

import * as RadioGroup from '@radix-ui/react-radio-group'
import { cx } from "class-variance-authority"

import styles from './Group.module.css'

export function Group({ className, ...props }: ComponentProps<typeof RadioGroup.Root>) {
  return (
    <RadioGroup.Root {...props} className={ cx(styles.container, className) } />
  )
}

Group.displayName = 'Radio.Group'
