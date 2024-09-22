import { ButtonHTMLAttributes } from 'react'

import {
  cx,
  cva,
  VariantProps
} from 'class-variance-authority'

import styles from './Button.module.css'

const variantStyle = cva(styles.container, {
  compoundVariants: [
    {
      variant: 'normal',
      disabled: false,
      active: false,
      className: styles.variant_normal_disabled_false_active_false
    },
    {
      variant: 'normal',
      disabled: true,
      active: true,
      className: styles.variant_normal_disabled_true_active_true
    },
    {
      variant: 'link',
      disabled: false,
      className: styles.variant_link_disabled_false
    }
  ],
  variants: {
    disabled: {
      true: styles.disabled_true,
      false: styles.disabled_false
    },
    variant: {
      normal: '',
      link: ''
    },
    active: {
      true: '',
      false: ''
    }
  },
  defaultVariants: {
    active: false,
    variant: 'normal',
    disabled: false
  }
})

export function Button ({
  children,
  className,
  variant,
  disabled,
  active,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof variantStyle>) {
  return (
    <button
      disabled={ disabled }
      className={cx(variantStyle({ variant, disabled, active }), className) }
      { ...props }
    >
      {children}
    </button>
  )
}
