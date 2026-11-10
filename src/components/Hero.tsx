import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroStats, profile } from '../data/resume'
import { Counter } from './ui'
import { ease, rise, stagger } from './motion'

const MARS_VIDEO = '/images/Mars_Rotation_Web_HB_d96299f9de.mp4'

function useAutoplay(ready: boolean) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    const play = () => void v.play().catch(() => {})
    play()
    const onVis = () => document.visibilityState === 'visible' && play()
    v.addEventListener('canplay', play)
    document.addEventListener('visibilitychange', onVis)
    document.addEventListener('touchstart', play, { passive: true })
    window.addEventListener('pageshow', play)
    return () => {
      v.removeEventListener('canplay', play)
      document.removeEventListener('visibilitychange', onVis)
      document.removeEventListener('touchstart', play)
      window.removeEventListener('pageshow', play)
    }
  }, [])
  useEffect(() => {
    if (ready) void ref.current?.play().catch(() => {})
  }, [ready])
  return ref
}

export function Hero({ ready }: { ready: boolean }) {
  const videoRef = useAutoplay(ready)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={sectionRef} className="hero" id="top">
      <motion.div className="hero__bg" style={{ scale: planetScale }} aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={MARS_VIDEO}
          poster="/images/mars-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        />
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="hero__inner container" style={{ y: contentY, opacity: fade }}>
        <motion.div variants={stagger} initial="hidden" animate={ready ? 'visible' : 'hidden'}>
          <motion.p className="hero__tag" variants={rise}>
            {profile.tagline}
          </motion.p>
          <motion.h1 className="hero__title" variants={rise}>
            {profile.name}
          </motion.h1>
          <motion.p className="hero__headline" variants={rise}>
            {profile.headline}
          </motion.p>
          <motion.p className="hero__sub" variants={rise}>
            {profile.subhead}
          </motion.p>
          <motion.div className="hero__actions" variants={rise}>
            <a className="btn" href="#thesis">
              Read the thesis <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href="#vayu">
              See the evidence
            </a>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
              Resume ↗
            </a>
          </motion.div>
        </motion.div>

        <motion.dl
          className="hero__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.9, ease }}
        >
          {heroStats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
