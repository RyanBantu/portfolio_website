import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { experience, goperch } from '../../data/resume'
import { SectionShell } from '../layout/SectionShell'
import './ExperienceSection.css'

type Row = {
  key: number | 'founder'
  company: string
  role: string
  period: string
  bullets: string[]
  founder?: boolean
}

const rows: Row[] = [
  ...experience.map((job, i) => ({
    key: i as number,
    company: job.location ? `${job.company} · ${job.location}` : job.company,
    role: job.role,
    period: job.period,
    bullets: job.bullets,
  })),
  {
    key: 'founder',
    company: goperch.title,
    role: 'Founder & CEO',
    period: goperch.period,
    bullets: goperch.bullets,
    founder: true,
  },
]

export function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.2', 'end 0.85'],
  })
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 28,
  })

  return (
    <SectionShell
      id="experience"
      index="06"
      title="Experience"
      subtitle="From DRDO composites to clinical AI at scale"
      variant="editorial"
    >
      <div className="trajectory" ref={trackRef}>
        <div className="trajectory__layout">
          <aside className="trajectory__rail" aria-hidden="true">
            <div className="trajectory__line">
              <motion.div className="trajectory__line-fill" style={{ scaleY: lineScale }} />
            </div>
            <span className="trajectory__rail-label">Trajectory</span>
          </aside>

          <div className="trajectory__stack">
            {rows.map((row, idx) => (
              <motion.article
                key={row.key}
                className={`trajectory__card ${row.founder ? 'trajectory__card--founder' : ''}`}
                initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-12%', amount: 0.35 }}
                transition={{ duration: 0.75, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="trajectory__card-top">
                  <span className="trajectory__index">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="trajectory__period">{row.period}</span>
                  <span className="trajectory__role">{row.role}</span>
                </div>

                <h3 className="trajectory__company">{row.company}</h3>

                <ul className="trajectory__bullets">
                  {row.bullets.map((b) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                    >
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <span className="trajectory__corner trajectory__corner--tl" aria-hidden="true" />
                <span className="trajectory__corner trajectory__corner--br" aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
