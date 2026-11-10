import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ease } from './motion'

/* ───────── Navbar ───────── */

const links = [
  { id: 'thesis', label: 'Thesis' },
  { id: 'research', label: 'Research' },
  { id: 'vayu', label: 'VAYU' },
  { id: 'deployments', label: 'Deployments' },
  { id: 'experience', label: 'Experience' },
  { id: 'letters', label: 'Letters' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const lenis = useLenis()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    const target = id === 'top' ? 0 : `#${id}`
    if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.4 })
    else if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <motion.div className="nav__progress" style={{ scaleX: progress }} />
      <div className="nav__row">
        <a
          href="#top"
          className="nav__brand"
          onClick={(e) => {
            e.preventDefault()
            go('top')
          }}
        >
          <span className="nav__logo" aria-hidden="true" />
          <span>
            Ryan<b>Bantu</b>
          </span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault()
                go(l.id)
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--sm nav__cta" href="/docs/Ryan-Bantu-Resume.pdf" target="_blank" rel="noreferrer">
          Resume ↗
        </a>
        <button className="nav__toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            className="nav__sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.id)
                }}
              >
                <span>0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
