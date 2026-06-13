import { useEffect, useState, type ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

type Props = { children: ReactNode }

export function SmoothScrollProvider({ children }: Props) {
  const [smooth, setSmooth] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSmooth(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!smooth) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.35,
        smoothWheel: true,
        touchMultiplier: 1.4,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
