import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useActiveSection } from '../hooks/useActiveSection'
import { easeOut } from '../motion'
import './Navbar.css'

const links = [
  { href: '#systems', label: 'Systems', id: 'systems' },
  { href: '#about', label: 'Research', id: 'about' },
  { href: '#experience', label: 'Work', id: 'experience' },
  { href: '#projects', label: 'Builds', id: 'projects' },
  { href: '#contact', label: 'Contact', id: 'contact' },
] as const

const sectionIds = links.map((l) => l.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const activeId = useActiveSection(sectionIds)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const onNavClick = (href: string) => {
    setOpen(false)
    if (href.startsWith('#') && lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.35 })
    } else if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (id: string) => activeId === id

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
        <div className="nav__shell">
          <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />

          <div className="nav__row">
            <a
              className="nav__brand"
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                onNavClick('#top')
              }}
            >
              <span className="nav__monogram" aria-hidden="true">
                RB
              </span>
              <span className="nav__brand-copy">
                <strong>Ryan Bantu</strong>
                <em>Founder · Engineer</em>
              </span>
            </a>

            <nav className="nav__links nav__links--desktop" aria-label="Primary">
              {links.slice(0, -1).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={isActive(l.id) ? 'nav__link nav__link--active' : 'nav__link'}
                  aria-current={isActive(l.id) ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavClick(l.href)
                  }}
                >
                  {isActive(l.id) && (
                    <motion.span
                      className="nav__link-glow"
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="nav__actions">
              <a
                className={`nav__cta nav__cta--desktop ${isActive('contact') ? 'nav__cta--active' : ''}`}
                href="#contact"
                aria-current={isActive('contact') ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  onNavClick('#contact')
                }}
              >
                Contact
              </a>

              <button
                type="button"
                className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((o) => !o)}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="nav__overlay"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.nav
              id="mobile-nav"
              className="nav__drawer"
              aria-label="Mobile primary"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              <div className="nav__drawer-head">
                <span className="nav__drawer-label">Navigation</span>
                <span className="nav__drawer-status">SYS · ONLINE</span>
              </div>

              <ul className="nav__drawer-list">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: easeOut }}
                  >
                    <a
                      href={l.href}
                      className={isActive(l.id) ? 'nav__drawer-link nav__drawer-link--active' : 'nav__drawer-link'}
                      aria-current={isActive(l.id) ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        onNavClick(l.href)
                      }}
                    >
                      <span className="nav__drawer-index">{String(i + 1).padStart(2, '0')}</span>
                      <span>{l.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                className="nav__drawer-cta"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  onNavClick('#contact')
                }}
              >
                Initialize contact
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
