import { useEffect, useState } from 'react'

export default function useScrollFromTop(): boolean {
  const [atTopPage, setAtTopPage] = useState<boolean>(true)

  function handleScroll() {
    if (window.pageYOffset > 0) {
      setAtTopPage(false)
    } else {
      setAtTopPage(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return atTopPage
}
