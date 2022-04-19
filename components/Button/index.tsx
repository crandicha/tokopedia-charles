import React from 'react'
import clsx from 'clsx'

import styles from './Button.module.css'

export type ButtonColors = 'clear' | 'blue' | 'red' | 'white'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors
}

const Button = ({
  children,
  className,
  disabled,
  onClick,
  color = 'white',
  ...buttonProps
}: ButtonProps) => {
  const classes = clsx(styles.button, styles[color], className)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }
    onClick?.(event)
  }
  return (
    <button
      className={classes}
      aria-disabled={disabled}
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button
