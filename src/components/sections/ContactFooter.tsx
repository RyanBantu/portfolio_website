import { motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { profile } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import './ContactFooter.css'

const channels = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    primary: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'web',
    label: 'Website',
    value: profile.website.replace(/^https?:\/\//, ''),
    href: profile.website,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Professional profile',
    href: profile.linkedin,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Code & experiments',
    href: profile.github,
    external: true,
  },
]

export function ContactFooter() {
  const lenis = useLenis()

  const scrollTop = () => {
    if (lenis) lenis.scrollTo('#top', { duration: 1.4 })
    else document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="contact">
      <motion.div
        className="contact__shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <div className="contact__grid">
          <div className="contact__intro">
            <div className="contact__index-wrap">
              <span className="contact__index">10</span>
              <span className="contact__rule" aria-hidden="true" />
            </div>

            <p className="contact__eyebrow">Open channel</p>
            <h2 className="contact__title">
              Let&apos;s build
              <span> autonomous systems.</span>
            </h2>
            <p className="contact__lede">
              Robotics, embedded intelligence, and production AI — available for founder-led builds,
              research collaboration, and hard engineering problems.
            </p>

            <div className="contact__status" aria-label="Availability">
              <span className="contact__pulse" aria-hidden="true" />
              <span>Available for collaboration</span>
            </div>

            <motion.a
              className="contact__cta"
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="contact__cta-label">Send email</span>
              <span className="contact__cta-value">{profile.email}</span>
            </motion.a>
          </div>

          <motion.div
            className="contact__channels"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {channels.map((ch) => (
              <motion.a
                key={ch.id}
                className={`contact__channel ${ch.primary ? 'contact__channel--primary' : ''}`}
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noreferrer' : undefined}
                variants={staggerItem}
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <span className="contact__channel-label">{ch.label}</span>
                <span className="contact__channel-value">{ch.value}</span>
                <span className="contact__channel-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="contact__channel-corner" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="contact__bar">
          <div className="contact__bar-left">
            <strong>{profile.name}</strong>
            <span>{profile.roles.join(' · ')}</span>
          </div>
          <p className="contact__copy">© {new Date().getFullYear()} {profile.fullName}</p>
          <button type="button" className="contact__top" onClick={scrollTop}>
            Back to top ↑
          </button>
        </div>
      </motion.div>
    </footer>
  )
}
