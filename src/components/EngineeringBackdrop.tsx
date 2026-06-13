import { motion } from 'framer-motion'
import { CircuitTraces } from './CircuitTraces'
import './EngineeringBackdrop.css'

export function EngineeringBackdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid backdrop__grid--primary" />
      <div className="backdrop__grid backdrop__grid--secondary" />
      <div className="backdrop__radial" />
      <CircuitTraces />
      <svg className="backdrop__wireframe" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <motion.rect
          x="120"
          y="140"
          width="220"
          height="160"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="1180"
          cy="620"
          r="110"
          fill="none"
          stroke="rgba(255,255,255,0.035)"
          strokeWidth="0.75"
          strokeDasharray="6 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '1180px 620px' }}
        />
        <path
          d="M0 420 H320 M1120 180 H1440 M960 0 V280 M480 620 V900"
          fill="none"
          stroke="rgba(255,255,255,0.025)"
          strokeWidth="0.75"
        />
      </svg>
      <div className="backdrop__scan" />
      <div className="backdrop__vignette" />
      <div className="backdrop__noise" />
    </div>
  )
}
