import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUpProps } from '../../motion'
import './SectionShell.css'

type SectionShellProps = {
  id: string
  index: string
  title: string
  subtitle: string
  children: ReactNode
  variant?: 'default' | 'wide' | 'full' | 'editorial'
}

export function SectionShell({
  id,
  index,
  title,
  subtitle,
  children,
  variant = 'default',
}: SectionShellProps) {
  return (
    <motion.section
      id={id}
      className={`section ${variant !== 'default' ? `section--${variant}` : ''}`}
      {...fadeUpProps}
    >
      <div className="section__grid">
        <header className="section__aside">
          <motion.div
            className="section__index-wrap"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section__index">{index}</span>
            <span className="section__rule" aria-hidden="true" />
          </motion.div>
          <h2 className="section__title">{title}</h2>
          <p className="section__subtitle">{subtitle}</p>
        </header>
        <div className="section__body">{children}</div>
      </div>
    </motion.section>
  )
}
