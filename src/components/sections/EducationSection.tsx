import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { education } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './EducationSection.css'

type EduEntry = (typeof education)[number] & {
  start: number
  end: number
  span: number
  level: string
  blurb: string
}

const levelMeta: Record<string, { level: string; blurb: string }> = {
  'Manipal Institute of Technology': {
    level: 'Undergraduate',
    blurb:
      'B.Tech in Mechanical Engineering — systems thinking, CFD, hardware design, and the foundation for robotics and embedded work.',
  },
  'FIITJEE Junior College': {
    level: 'Pre-University',
    blurb:
      'Intermediate MPC — intensive physics and mathematics track preparing for national engineering entrance pathways.',
  },
  'Kendriya Vidyalaya': {
    level: 'Secondary',
    blurb:
      'Ten years of Kendriya Vidyalaya education — analytical grounding and discipline before specialized engineering prep.',
  },
}

function parseYears(years: string) {
  const [startRaw, endRaw] = years.split('–').map((s) => s.trim())
  const start = Number.parseInt(startRaw, 10)
  const end = Number.parseInt(endRaw, 10)
  return { start, end, span: end - start }
}

const entries: EduEntry[] = education.map((e) => {
  const { start, end, span } = parseYears(e.years)
  const meta = levelMeta[e.school] ?? { level: 'Education', blurb: e.detail }
  return { ...e, start, end, span, ...meta }
})

const rangeStart = Math.min(...entries.map((e) => e.start))
const rangeEnd = Math.max(...entries.map((e) => e.end))
const totalSpan = rangeEnd - rangeStart

export function EducationSection() {
  const [active, setActive] = useState(0)
  const current = entries[active]

  const stats = useMemo(
    () => ({
      years: totalSpan,
      institutions: entries.length,
      focus: 'Mechanical Engineering',
    }),
    [],
  )

  return (
    <SectionShell
      id="education"
      index="03"
      title="Education"
      subtitle="Fourteen years of building toward systems engineering"
      variant="editorial"
    >
      <div className="academics">
        <div className="academics__stats">
          <div className="academics__stat">
            <strong>{stats.years}+</strong>
            <span>Years</span>
          </div>
          <div className="academics__stat">
            <strong>{stats.institutions}</strong>
            <span>Institutions</span>
          </div>
          <div className="academics__stat">
            <strong>{stats.focus}</strong>
            <span>Focus</span>
          </div>
        </div>

        <div className="academics__timeline" aria-label="Academic timeline">
          <div className="academics__timeline-labels">
            <span>{rangeStart}</span>
            <span>{rangeEnd}</span>
          </div>
          <div className="academics__track">
            {entries.map((e, i) => (
              <button
                key={e.school}
                type="button"
                className={`academics__segment ${active === i ? 'academics__segment--active' : ''}`}
                style={{ flex: e.span }}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={`${e.school}, ${e.years}`}
              >
                {active === i && (
                  <motion.span
                    className="academics__segment-fill"
                    layoutId="edu-segment-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="academics__cards"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
        >
          {entries.map((e, i) => (
            <motion.button
              key={e.school}
              type="button"
              className={`academics__card ${active === i ? 'academics__card--active' : ''}`}
              variants={staggerItem}
              onClick={() => setActive(i)}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <span className="academics__card-level">{e.level}</span>
              <span className="academics__card-years">{e.years}</span>
              <h3 className="academics__card-school">{e.school}</h3>
              <p className="academics__card-detail">{e.detail}</p>
              <span className="academics__card-index">{String(i + 1).padStart(2, '0')}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.school}
            className="academics__spotlight"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <div className="academics__spotlight-meta">
              <span className="academics__spotlight-badge">{current.level}</span>
              <time className="academics__spotlight-time">{current.years}</time>
            </div>
            <h3 className="academics__spotlight-title">{current.school}</h3>
            <p className="academics__spotlight-degree">{current.detail}</p>
            <p className="academics__spotlight-blurb">{current.blurb}</p>
            <div className="academics__spotlight-bar" aria-hidden="true">
              <motion.div
                className="academics__spotlight-bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: current.span / totalSpan }}
                transition={{ duration: 0.65, ease: easeOut }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}
