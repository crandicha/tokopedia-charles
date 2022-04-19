import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Button from 'components/Button'
import { LayoutContext } from 'components/Layout'
import useScrollFromTop from 'utils/hooks/scroll'

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  hasBackButton?: boolean
  backButtonLink?: string
}

const Header = ({
  hasBackButton = false,
  backButtonLink = '/',
  className,
}: HeaderProps) => {
  const atTop = useScrollFromTop()
  const { title, headerTextColor, headerColor } =
    React.useContext(LayoutContext)
  return (
    <div
      className={clsx(
        `h-[60px] flex flex-row items-center fixed top-0 w-full z-10`,
        headerTextColor === 'black' ? '!text-black' : '!text-white',
        !atTop && 'shadow-lg',
        className
      )}
      style={{
        backgroundColor: headerColor,
      }}
    >
      {hasBackButton && (
        <Link href={backButtonLink} passHref>
          <a>
            <Button className="ml-4">
              <ArrowBackIosIcon
                className={
                  headerTextColor === 'white' ? '!text-white' : '!text-black'
                }
              />
            </Button>
          </a>
        </Link>
      )}
      <div className="ml-4 font-semibold text-3xl flex-1">{title}</div>
    </div>
  )
}

export default Header
