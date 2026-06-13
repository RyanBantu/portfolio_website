import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import './Hero.css'

const MARS_VIDEO = '/images/Mars_Rotation_Web_HB_d96299f9de.mp4'

type HeroProps = { ready: boolean }

function useBackgroundVideo(active: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const play = () => {
      void video.play().catch(() => {})
    }

    play()
    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    video.addEventListener('ended', play)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') play()
    }

    const unlockOnTouch = () => play()

    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('touchstart', unlockOnTouch, { passive: true })
    window.addEventListener('pageshow', play)

    return () => {
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      video.removeEventListener('ended', play)
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('touchstart', unlockOnTouch)
      window.removeEventListener('pageshow', play)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    videoRef.current?.play().catch(() => {})
  }, [active])

  return videoRef
}

export function Hero({ ready }: HeroProps) {
  const videoRef = useBackgroundVideo(ready)

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={MARS_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
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
