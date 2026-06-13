import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, researchItems } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './ResearchSection.css'

const domainMeta: Record<string, { code: string; blurb: string; signals: string[] }> = {
  'Edge AI': {
    code: 'EDGE',
    blurb: 'Inference on constrained hardware — vision, tracking, and real-time decision loops at the edge.',
    signals: ['YOLO', 'Re-ID', 'Raspberry Pi', 'Latency'],
  },
  'Embedded ML Systems': {
    code: 'EMBED',
    blurb: 'Firmware-aware ML — sensors, microcontrollers, and co-designed software for field deployment.',
    signals: ['Arduino', 'RFID', 'RTOS', 'Sensors'],
  },
  'Real-Time Inference': {
    code: 'RTINF',
    blurb: 'Sub-second pipelines where model output must keep pace with physical systems and clinical workflows.',
    signals: ['FastAPI', 'Streaming', 'Pipelines', 'SLA'],
  },
  'Multimodal Learning': {
    code: 'MULTI',
    blurb: 'Cross-signal models — EEG, vision, and language fused into interpretable representations.',
    signals: ['EEG', 'Vision', 'LLM', 'Fusion'],
  },
  'Distributed Intelligent Systems': {
    code: 'DIST',
    blurb: 'Orchestration across edge nodes and cloud — Bedrock, evaluation, and production-grade rollout.',
    signals: ['AWS', 'Bedrock', 'Eval', 'Scale'],
  },
}

const domains = profile.researchInterests.map((title) => ({
  title,
  meta: domainMeta[title] ?? {
    code: 'R&D',
    blurb: title,
    signals: ['Research'],
  },
}))

export function ResearchSection() {
  const [active, setActive] = useState(0)
  const current = domains[active]

  return (
    <SectionShell
      id="about"
      index="02"
      title="Research"
      subtitle="Investigation threads across edge intelligence and multimodal systems"
      variant="editorial"
    >
      <div className="inquiry">
        <div className="inquiry__stats">
          <div className="inquiry__stat">
            <strong>{domains.length}</strong>
            <span>Focus threads</span>
          </div>
          <div className="inquiry__stat">
            <strong>{researchItems.length}</strong>
            <span>Papers in review</span>
          </div>
          <div className="inquiry__stat">
            <strong>Edge → Cloud</strong>
            <span>Scope</span>
          </div>
        </div>

        <div className="inquiry__layout">
          <div className="inquiry__orbit" aria-hidden="true">
            <svg viewBox="0 0 320 320" className="inquiry__svg">
              <circle cx="160" cy="160" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" strokeDasharray="4 8" />
              <circle cx="160" cy="160" r="78" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
              {domains.map((d, i) => {
                const angle = (i / domains.length) * Math.PI * 2 - Math.PI / 2
                const x = 160 + Math.cos(angle) * 120
                const y = 160 + Math.sin(angle) * 120
                const lit = active === i
                return (
                  <g key={d.title}>
                    <line
                      x1="160"
                      y1="160"
                      x2={x}
                      y2={y}
                      stroke={lit ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.08)'}
                      strokeWidth={lit ? 0.75 : 0.5}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={lit ? 5 : 3.5}
                      fill={lit ? '#fff' : 'transparent'}
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="0.75"
                    />
                  </g>
                )
              })}
              <circle cx="160" cy="160" r="8" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="0.75" />
            </svg>
          </div>

          <div className="inquiry__panel">
            <motion.div
              className="inquiry__tabs"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-lenis-prevent
            >
              {domains.map((d, i) => (
                <motion.button
                  key={d.title}
                  type="button"
                  className={`inquiry__tab ${active === i ? 'inquiry__tab--active' : ''}`}
                  variants={staggerItem}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <span className="inquiry__tab-code">{d.meta.code}</span>
                  <span className="inquiry__tab-label">{d.title}</span>
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                className="inquiry__readout"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <div className="inquiry__readout-head">
                  <span className="inquiry__readout-code">{current.meta.code}</span>
                  <h3 className="inquiry__readout-title">{current.title}</h3>
                </div>
                <p className="inquiry__readout-blurb">{current.meta.blurb}</p>
                <div className="inquiry__signals">
                  {current.meta.signals.map((signal) => (
                    <span key={signal} className="inquiry__signal">
                      {signal}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="inquiry__papers"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inquiry__papers-head">
            <span className="inquiry__papers-label">Active manuscripts</span>
            <span className="inquiry__papers-count">{researchItems.length} under review</span>
          </div>
          {researchItems.map((paper, i) => (
            <motion.article key={paper.title} className="inquiry__paper" variants={staggerItem}>
              <span className="inquiry__paper-index">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4>{paper.title}</h4>
                <p>{paper.body.length > 120 ? `${paper.body.slice(0, 120)}…` : paper.body}</p>
              </div>
              <span className="inquiry__paper-status">Review</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}
