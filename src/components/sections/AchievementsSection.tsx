import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  achievements,
  entrepreneurAward,
  solarDecathlonAchievement,
} from '../../data/resume'
import { staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './AchievementsSection.css'

export function AchievementsSection() {
  const solarRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: solarRef,
    offset: ['start end', 'end start'],
  })
  const galleryX = useTransform(scrollYProgress, [0, 1], ['8%', '-12%'])
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <SectionShell
      id="achievements"
      index="05"
      title="Recognition"
      subtitle="National wins, patents, and founder felicitation"
      variant="editorial"
    >
      <div className="recognition">
        <motion.article
          className="recognition__spotlight"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.div className="recognition__spotlight-copy" variants={staggerItem}>
            <span className="recognition__badge">MAHE · 2025</span>
            <h3 className="recognition__headline">Startup Founder&apos;s Felicitation</h3>
            <p className="recognition__statement">{entrepreneurAward.statement}</p>
          </motion.div>

          <motion.div className="recognition__spotlight-visual" variants={staggerItem}>
            <motion.figure
              className="recognition__photo recognition__photo--primary"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <img
                src={entrepreneurAward.photos[0].src}
                alt={entrepreneurAward.photos[0].alt}
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
            <motion.figure
              className="recognition__photo recognition__photo--secondary"
              whileHover={{ scale: 1.03, rotate: 0 }}
              initial={{ rotate: -3 }}
              animate={{ rotate: -3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <img
                src={entrepreneurAward.photos[1].src}
                alt={entrepreneurAward.photos[1].alt}
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          </motion.div>
        </motion.article>

        <div className="recognition__solar" ref={solarRef}>
          <div className="recognition__solar-header">
            <motion.span
              className="recognition__solar-tag"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Solar Decathlon India
            </motion.span>
            <motion.h3
              className="recognition__solar-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              National Winner
              <em>2024–25</em>
            </motion.h3>
            <motion.p
              className="recognition__solar-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {solarDecathlonAchievement.text}
            </motion.p>
          </div>

          <motion.div className="recognition__solar-rail" style={{ x: galleryX }} data-lenis-prevent>
            {solarDecathlonAchievement.photos.map((ph, i) => (
              <motion.figure
                key={ph.src}
                className="recognition__solar-slide"
                style={{ y: i === 1 ? photoY : 0 }}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ delay: i * 0.12, duration: 0.65 }}
                whileHover={{ y: -8 }}
              >
                <img src={ph.src} alt={ph.alt} loading="lazy" decoding="async" />
                <figcaption>{ph.alt.split('—')[0]?.trim() ?? `Frame ${i + 1}`}</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="recognition__metrics"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((item, i) => (
            <motion.article key={item} className="recognition__metric" variants={staggerItem}>
              <span className="recognition__metric-num">{String(i + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}
