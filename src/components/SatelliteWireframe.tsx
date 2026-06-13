import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './SatelliteWireframe.css'

type Props = {
  compact?: boolean
  interactive?: boolean
}

export function SatelliteWireframe({ compact = false, interactive = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 })
  const sy = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const size = compact ? 120 : 360

  return (
    <div
      ref={ref}
      className={`satellite ${compact ? 'satellite--compact' : ''} ${interactive ? 'satellite--interactive' : ''}`}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <motion.div className="satellite__orbit-ring satellite__orbit-ring--outer" style={{ rotateX: sy, rotateY: sx }} />
      <motion.div className="satellite__orbit-ring satellite__orbit-ring--inner" style={{ rotateX: sy, rotateY: sx }} />

      <motion.svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="satellite__svg"
        style={{ rotateX: sy, rotateY: sx }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="satMesh" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 L0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" strokeDasharray="3 9" />
        </motion.g>

        <rect x="60" y="60" width="280" height="280" fill="url(#satMesh)" opacity="0.4" />

        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <rect x="148" y="172" width="104" height="56" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.25" rx="2" />
          <line x1="148" y1="192" x2="252" y2="192" stroke="rgba(255,255,255,0.2)" />
          <line x1="148" y1="208" x2="252" y2="208" stroke="rgba(255,255,255,0.2)" />
          <circle cx="200" cy="200" r="7" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="0.75" />
        </motion.g>

        <motion.g
          animate={{ rotate: [0, 6, 0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '148px 200px' }}
        >
          <rect x="36" y="188" width="100" height="24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={44 + i * 12} y1="188" x2={44 + i * 12} y2="212" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          ))}
        </motion.g>

        <motion.g
          animate={{ rotate: [0, -6, 0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '252px 200px' }}
        >
          <rect x="264" y="188" width="100" height="24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={272 + i * 12} y1="188" x2={272 + i * 12} y2="212" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          ))}
        </motion.g>

        <motion.line
          x1="200"
          y1="172"
          x2="200"
          y2="132"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.75"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <circle cx="200" cy="124" r="5" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="0.75" />

        {!compact && (
          <>
            <text x="200" y="368" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">
              ORBIT · TELEMETRY LIVE
            </text>
          </>
        )}
      </motion.svg>
    </div>
  )
}
