import { useCallback, useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

const NAV_OFFSET = 100

function sectionTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY
}

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState('')

  const resolve = useCallback(() => {
    const scroll = window.scrollY + NAV_OFFSET
    const first = document.getElementById(sectionIds[0] ?? '')

    if (first && scroll < sectionTop(first) - 32) {
      setActiveId('')
      return
    }

    let active = ''
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && sectionTop(el) <= scroll) active = id
    }
    setActiveId(active)
  }, [sectionIds])

  useLenis(resolve, [resolve])

  useEffect(() => {
    const handle = () => resolve()
    const frame = requestAnimationFrame(handle)
    window.addEventListener('scroll', handle, { passive: true })
    window.addEventListener('resize', handle)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handle)
      window.removeEventListener('resize', handle)
    }
  }, [resolve])

  return activeId
}
