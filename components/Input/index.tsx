import React from 'react'
import clsx from 'clsx'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...otherProps }, ref) => (
    <input
      {...otherProps}
      ref={ref}
      className={clsx(
        'h-[30px] rounded-md border border-gray-300 px-4',
        className
      )}
    />
  )
)
Input.displayName = 'Input'
export default Input
