import { motion } from 'framer-motion'
import { easeInOut } from '../motion'
import { SatelliteWireframe } from './SatelliteWireframe'
import './LoadingScreen.css'

export function LoadingScreen() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.9, ease: easeInOut }}
      aria-live="polite"
    >
      <div className="loader__frame">
        <motion.div
          className="loader__corner loader__corner--tl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        />
        <motion.div
          className="loader__corner loader__corner--br"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        <motion.p
          className="loader__brand"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 0.8 }}
        >
          RB
        </motion.p>

        <SatelliteWireframe compact />

        <div className="loader__progress">
          <motion.div
            className="loader__progress-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, ease: easeInOut }}
          />
        </div>

        <motion.div className="loader__status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {['BOOT', 'LINK', 'SYNC', 'READY'].map((step, i) => (
            <motion.span
              key={step}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 1] }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
            >
              {step}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
