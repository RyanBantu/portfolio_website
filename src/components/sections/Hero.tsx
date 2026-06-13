import { motion } from 'framer-motion'
import { profile } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import './Hero.css'

const MARS_VIDEO = '/images/Mars_Rotation_Web_HB_d96299f9de.mp4'

type HeroProps = { ready: boolean }

export function Hero({ ready }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <video
          className="hero__video"
          src={MARS_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__foreground">
        <motion.div
          className="hero__content"
          variants={staggerContainer}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
        >
          <motion.h1 className="hero__title" variants={staggerItem}>
            <span className="hero__title-line">{profile.name.split(' ')[0]}</span>
            <span className="hero__title-line hero__title-line--dim">
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.p className="hero__headline" variants={staggerItem}>
            {profile.headline}
          </motion.p>

          <motion.div className="hero__actions" variants={staggerItem}>
            <a className="hero__btn hero__btn--solid" href="#systems">
              Enter systems
            </a>
            <a className="hero__btn hero__btn--outline" href="#experience">
              View trajectory
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          className="hero__scroll"
          href="#systems"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease: easeOut }}
          aria-label="Scroll to systems"
        >
          <span>Scroll</span>
          <motion.span
            className="hero__scroll-line"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.a>
      </div>
    </section>
  )
}
