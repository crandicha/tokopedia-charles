import React from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'clear' | 'blue'
}

const Button = ({
  children,
  className,
  disabled,
  onClick,
  color = 'clear',
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
