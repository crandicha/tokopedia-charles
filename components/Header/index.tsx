import React from 'react'
import clsx from 'clsx'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Button from 'components/Button'
import { LayoutContext } from 'components/Layout'
import useScrollFromTop from 'utils/hooks/scroll'

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  hasBackButton?: boolean
}

const Header = ({ hasBackButton = false, className }: HeaderProps) => {
  const atTop = useScrollFromTop()
  const { title, headerTextColor, headerColor } =
    React.useContext(LayoutContext)
  return (
    <div
      className={clsx(
        `bg-[${headerColor}] h-[60px] flex flex-row items-center fixed top-0 w-full z-10`,
        headerTextColor === 'black' ? '!text-black' : '!text-white',
        !atTop && 'shadow-lg',
        className
      )}
    >
      {hasBackButton && (
        <Button className="ml-4" onClick={() => window.history.back()}>
          <ArrowBackIosIcon
            className={
              headerTextColor === 'white' ? '!text-white' : '!text-black'
            }
          />
        </Button>
      )}
      <div className="ml-4 font-semibold text-3xl flex-1">{title}</div>
    </div>
  )
}

export default Header
