import React from 'react'
import clsx from 'clsx'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Button from 'components/Button'
import { LayoutContext } from 'components/Layout'

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  textColor?: 'black' | 'white'
  transparent?: boolean
  hasBackButton?: boolean
}

const Header = ({
  textColor = 'black',
  transparent = false,
  hasBackButton = false,
  className,
}: HeaderProps) => {
  const { title } = React.useContext(LayoutContext)
  return (
    <div
      className={clsx(
        'bg-transparent h-[60px] flex flex-row items-center fixed top-0 w-full',
        transparent ? `bg-transparent` : `bg-blue-400`,
        textColor === 'black' ? '!text-black' : '!text-white',
        className
      )}
    >
      {hasBackButton && (
        <Button className="ml-4" onClick={() => window.history.back()}>
          <ArrowBackIosIcon
            className={textColor === 'white' ? '!text-white' : '!text-black'}
          />
        </Button>
      )}
      <div className="ml-4 font-semibold text-3xl flex-1">{title}</div>
    </div>
  )
}

export default Header
