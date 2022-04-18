import React from 'react'
import Header from 'components/Header'

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  title?: string
  headerTextColor?: 'white' | 'black'
  transparentHeader?: boolean
  hasBackButton?: boolean
}

export interface LayoutContextProps {
  title: string
  setTitle: (string: string) => void
}

export const LayoutContext = React.createContext<LayoutContextProps>({
  title: '',
  setTitle: () => {},
})

const Layout = ({
  title: initialTitle = '',
  headerTextColor,
  transparentHeader,
  hasBackButton,
  children,
}: LayoutProps) => {
  const [title, setTitle] = React.useState<string>(initialTitle)
  return (
    <LayoutContext.Provider value={{ title, setTitle }}>
      <Header
        textColor={headerTextColor}
        transparent={transparentHeader}
        hasBackButton={hasBackButton}
      />
      <div className="pt-[60px] h-full">{children}</div>
    </LayoutContext.Provider>
  )
}

export default Layout
