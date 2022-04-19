import React from 'react'

import Header from 'components/Header'

import type { ButtonColors } from 'components/Button'

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  title?: string
  headerTextColor?: 'white' | 'black'
  buttonColor?: ButtonColors
  hasBackButton?: boolean
}

export interface LayoutContextProps {
  title: string
  setTitle: (string: string) => void
  headerColor: string
  setHeaderColor: (string: string) => void
  headerTextColor: 'white' | 'black'
  setHeaderTextColor: (string: 'white' | 'black') => void
}

export const LayoutContext = React.createContext<LayoutContextProps>({
  title: '',
  setTitle: () => {},
  headerColor: '',
  setHeaderColor: () => {},
  headerTextColor: 'black',
  setHeaderTextColor: () => {},
})

const Layout = ({
  title: initialTitle = '',
  hasBackButton,
  buttonColor = 'white',
  children,
}: LayoutProps) => {
  const [title, setTitle] = React.useState<string>(initialTitle)
  const [headerColor, setHeaderColor] = React.useState<string>('#ffffff')
  const [headerTextColor, setHeaderTextColor] = React.useState<
    'white' | 'black'
  >('black')
  return (
    <LayoutContext.Provider
      value={{
        title,
        setTitle,
        headerColor,
        setHeaderColor,
        headerTextColor,
        setHeaderTextColor,
      }}
    >
      <Header hasBackButton={hasBackButton} buttonColor={buttonColor} />
      <div className="pt-[60px] h-screen">{children}</div>
    </LayoutContext.Provider>
  )
}

export default Layout
