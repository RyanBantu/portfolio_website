import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillGroups } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './SkillsSection.css'

const domainMeta: Record<string, { code: string; blurb: string }> = {
  'AI & Machine Learning': {
    code: 'ML/CV',
    blurb: 'Vision pipelines, LLM orchestration, and evaluation frameworks — from edge Re-ID to Bedrock production stacks.',
  },
  'Cloud & Backend': {
    code: 'CLOUD',
    blurb: 'APIs, databases, and orchestration layers that keep clinical and enterprise workflows reliable at scale.',
  },
  'IoT & Robotics': {
    code: 'EDGE',
    blurb: 'Firmware-adjacent systems — sensors, RFID, cellular modules, and real-time tracking in the field.',
  },
  'Languages & Frameworks': {
    code: 'STACK',
    blurb: 'Polyglot execution across Python, C++, TypeScript, and Flutter for full-stack and embedded delivery.',
  },
  'Core Engineering': {
    code: 'MECH',
    blurb: 'CAD, CFD, FEA, and PCB workflows — mechanical rigor behind hardware-first products.',
  },
}

const groups = skillGroups.map((g) => ({
  ...g,
  skills: g.items.split(',').map((s) => s.trim()),
  meta: domainMeta[g.title] ?? { code: 'SYS', blurb: g.items },
}))

const totalSkills = groups.reduce((n, g) => n + g.skills.length, 0)

export function SkillsSection() {
  const [active, setActive] = useState(0)
  const current = groups[active]

  return (
    <SectionShell
      id="skills"
      index="04"
      title="Capabilities"
      subtitle="Silicon, firmware, vision, and cloud — one integrated stack"
      variant="editorial"
    >
      <div className="capabilities">
        <div className="capabilities__stats" aria-hidden="true">
          <div className="capabilities__stat">
            <strong>{groups.length}</strong>
            <span>Domains</span>
          </div>
          <div className="capabilities__stat">
            <strong>{totalSkills}</strong>
            <span>Tools</span>
          </div>
          <div className="capabilities__stat">
            <strong>Edge → Cloud</strong>
            <span>Range</span>
          </div>
        </div>

        <div className="capabilities__shell">
          <nav className="capabilities__nav" aria-label="Capability domains" data-lenis-prevent>
            {groups.map((g, i) => (
              <button
                key={g.title}
                type="button"
                className={`capabilities__tab ${active === i ? 'capabilities__tab--active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                {active === i && (
                  <motion.span
                    className="capabilities__tab-glow"
                    layoutId="cap-tab-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="capabilities__tab-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="capabilities__tab-code">{g.meta.code}</span>
                <span className="capabilities__tab-title">{g.title}</span>
                <span className="capabilities__tab-count">{g.skills.length} tools</span>
              </button>
            ))}
          </nav>

          <div className="capabilities__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                className="capabilities__panel"
                initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <div className="capabilities__panel-head">
                  <span className="capabilities__panel-code">{current.meta.code}</span>
                  <h3 className="capabilities__panel-title">{current.title}</h3>
                  <p className="capabilities__panel-blurb">{current.meta.blurb}</p>
                </div>

                <motion.div
                  className="capabilities__chips"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {current.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="capabilities__chip"
                      variants={staggerItem}
                      whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.35)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                <div className="capabilities__meter" aria-hidden="true">
                  <span className="capabilities__meter-label">Stack depth</span>
                  <div className="capabilities__meter-track">
                    <motion.div
                      className="capabilities__meter-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: current.skills.length / Math.max(...groups.map((g) => g.skills.length)) }}
                      transition={{ duration: 0.6, ease: easeOut }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="capabilities__matrix" aria-hidden="true">
              {groups.map((g, i) => (
                <motion.button
                  key={g.title}
                  type="button"
                  className={`capabilities__matrix-cell ${active === i ? 'capabilities__matrix-cell--active' : ''}`}
                  style={{ flex: g.skills.length }}
                  onClick={() => setActive(i)}
                  whileHover={{ opacity: 1 }}
                  aria-label={g.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
