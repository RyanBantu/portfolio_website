import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { ease, rise, stagger } from './motion'
import { LightboxCtx, useLightbox, type LightboxItem } from './lightbox'

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article'
}) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </M>
  )
}

export function SectionHead({
  index,
  kicker,
  title,
  lede,
}: {
  index: string
  kicker: string
  title: ReactNode
  lede?: ReactNode
}) {
  return (
    <motion.header
      className="shead"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p className="shead__kicker" variants={rise}>
        <span className="shead__index">{index}</span>
        <span className="shead__bar" />
        {kicker}
      </motion.p>
      <motion.h2 className="shead__title" variants={rise}>
        {title}
      </motion.h2>
      {lede ? (
        <motion.p className="shead__lede" variants={rise}>
          {lede}
        </motion.p>
      ) : null}
    </motion.header>
  )
}

export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState((0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return (
    <span ref={ref} className="counter">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ───────── Lightbox ───────── */

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null)

  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setItem(null)
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('no-scroll')
    }
  }, [item])

  return (
    <LightboxCtx.Provider value={setItem}>
      {children}
      <AnimatePresence>
        {item ? (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={item.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setItem(null)}
            data-lenis-prevent
          >
            <motion.figure
              className="lightbox__figure"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={item.src} alt={item.alt} />
              <figcaption>
                <span>{item.alt}</span>
                <span className="lightbox__actions">
                  {item.pdf ? (
                    <a className="btn btn--sm btn--ghost" href={item.pdf} target="_blank" rel="noreferrer">
                      Open PDF ↗
                    </a>
                  ) : null}
                  <button className="btn btn--sm" onClick={() => setItem(null)}>
                    Close ✕
                  </button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LightboxCtx.Provider>
  )
}

export function Zoomable({
  src,
  alt,
  pdf,
  className,
  children,
}: LightboxItem & { className?: string; children?: ReactNode }) {
  const open = useLightbox()
  return (
    <button type="button" className={`zoomable ${className ?? ''}`} onClick={() => open({ src, alt, pdf })} aria-label={`Enlarge: ${alt}`}>
      <img src={src} alt={alt} loading="lazy" />
      {children}
      <span className="zoomable__hint" aria-hidden="true">
        ⤢
      </span>
    </button>
  )
}
