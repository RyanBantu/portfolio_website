import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { researchItems } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './PublicationsSection.css'

export function PublicationsSection() {
  const [active, setActive] = useState(0)
  const paper = researchItems[active]

  return (
    <SectionShell
      id="publications"
      index="07"
      title="Publications"
      subtitle="Manuscripts under peer review — edge intelligence and clinical systems"
      variant="editorial"
    >
      <div className="manuscript">
        <motion.div
          className="manuscript__stats"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="manuscript__stat" variants={staggerItem}>
            <strong>{researchItems.length}</strong>
            <span>Active manuscripts</span>
          </motion.div>
          <motion.div className="manuscript__stat" variants={staggerItem}>
            <strong>Review</strong>
            <span>Current stage</span>
          </motion.div>
          <motion.div className="manuscript__stat" variants={staggerItem}>
            <strong>EEG · Edge</strong>
            <span>Domains</span>
          </motion.div>
        </motion.div>

        <div className="manuscript__layout">
          <motion.nav
            className="manuscript__spine"
            aria-label="Manuscript list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {researchItems.map((item, i) => (
              <motion.button
                key={item.code}
                type="button"
                className={`manuscript__spine-item ${active === i ? 'manuscript__spine-item--active' : ''}`}
                variants={staggerItem}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="manuscript__spine-code">{item.code}</span>
                <span className="manuscript__spine-title">{item.title}</span>
                <span className="manuscript__spine-status">{item.status}</span>
              </motion.button>
            ))}
          </motion.nav>

          <AnimatePresence mode="wait">
            <motion.article
              key={paper.code}
              className="manuscript__reader"
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <div className="manuscript__reader-head">
                <div className="manuscript__reader-meta">
                  <span className="manuscript__code">{paper.code}</span>
                  <span className="manuscript__domain">{paper.domain}</span>
                  <span className="manuscript__status">
                    <span className="manuscript__status-dot" aria-hidden="true" />
                    {paper.status}
                  </span>
                </div>
                <span className="manuscript__index">{String(active + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="manuscript__title">{paper.title}</h3>

              <div className="manuscript__tags">
                {paper.tags.map((tag) => (
                  <span key={tag} className="manuscript__tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="manuscript__abstract">
                <span className="manuscript__abstract-label">Abstract</span>
                <p>{paper.body}</p>
              </div>

              <div className="manuscript__footer">
                <span className="manuscript__footer-note">Full citation pending acceptance</span>
                <span className="manuscript__footer-id">MS-{paper.code}-2025</span>
              </div>

              <span className="manuscript__corner manuscript__corner--tl" aria-hidden="true" />
              <span className="manuscript__corner manuscript__corner--br" aria-hidden="true" />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  )
}
