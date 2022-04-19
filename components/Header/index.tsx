import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { LayoutContext } from 'components/Layout'
import useScrollFromTop from 'utils/hooks/scroll'
import Button from 'components/Button'
import BagIcon from 'public/images/bag.png'

import type { ButtonColors } from 'components/Button'

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  hasBackButton?: boolean
  buttonColor: ButtonColors
  backButtonLink?: string
  showBag?: boolean
}

const Header = ({
  hasBackButton = false,
  backButtonLink = '/',
  buttonColor,
  showBag = false,
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
            <Button className="ml-4" color={buttonColor}>
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
      {showBag && (
        <div className="mr-4">
          <Link href="/my-pokemons">
            <a>
              <Button color={buttonColor}>
                <Image
                  src={BagIcon}
                  width="20"
                  height="20"
                  alt="My Pokemon List"
                ></Image>
              </Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
