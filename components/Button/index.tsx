import React from 'react'
import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  color = 'white',
  children,
  className,
  disabled,
  onClick,
  ...buttonProps
}: ButtonProps) => {
  const classes = clsx(styles.button, styles.clear, className)
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
