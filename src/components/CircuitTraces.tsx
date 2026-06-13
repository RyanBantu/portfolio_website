import { motion } from 'framer-motion'
import './CircuitTraces.css'

const paths = [
  { d: 'M0 120 H180 L240 60 H420 L480 180 H720', delay: 0 },
  { d: 'M1440 780 H1260 L1200 840 H1020 L960 720 H720', delay: 0.8 },
  { d: 'M60 0 V320 L200 320 L260 420 V900', delay: 1.6 },
  { d: 'M1380 0 V260 L1240 260 L1180 360 V900', delay: 2.4 },
  { d: 'M720 0 V180 M720 720 V900 M0 450 H1440', delay: 3.2 },
]

export function CircuitTraces() {
  return (
    <svg className="traces" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
      {paths.map(({ d, delay }) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
              times: [0, 0.35, 0.65, 1],
            }}
          />
        </g>
      ))}
    </svg>
  )
}
