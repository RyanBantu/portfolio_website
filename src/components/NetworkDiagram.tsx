import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/resume'
import { staggerContainer, staggerItem } from '../motion'
import './NetworkDiagram.css'

const center = {
  id: 'core',
  label: 'Autonomous Stack',
  desc: 'Perception → planning → actuation across edge and cloud.',
  x: 50,
  y: 50,
}

const nodes = profile.focusAreas.map((label, i) => {
  const angle = (i / profile.focusAreas.length) * Math.PI * 2 - Math.PI / 2
  const r = 42
  return {
    id: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    desc: getDesc(label),
    x: 50 + Math.cos(angle) * r,
    y: 50 + Math.sin(angle) * r,
  }
})

function getDesc(label: string) {
  const map: Record<string, string> = {
    Robotics: 'Kinematics, manipulation, and field-deployed platforms.',
    'Embedded Systems': 'Firmware, RTOS, and silicon-aware pipelines.',
    AI: 'LLM orchestration, evaluation, and production inference.',
    'Computer Vision': 'YOLO Re-ID, detection, and edge vision stacks.',
    Automation: 'Industrial workflows, RFID, and closed-loop control.',
    EECS: 'Signal processing, hardware–software co-design.',
  }
  return map[label] ?? ''
}

export function NetworkDiagram() {
  const [active, setActive] = useState<string | null>(null)
  const activeNode = active === center.id ? center : nodes.find((n) => n.id === active)

  return (
    <div className="network">
      <div className="network__canvas">
        <svg viewBox="0 0 100 100" className="network__svg" aria-hidden="true">
          {nodes.map((node) => {
            const lit = !active || active === node.id || active === center.id
            return (
              <motion.line
                key={`l-${node.id}`}
                x1={center.x}
                y1={center.y}
                x2={node.x}
                y2={node.y}
                stroke={active === node.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={active === node.id ? 0.35 : 0.18}
                animate={{ opacity: lit ? 1 : 0.15 }}
              />
            )
          })}

          <motion.circle
            cx="50"
            cy="50"
            r="5.5"
            fill="transparent"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="0.35"
            className="network__node network__node--core"
            onMouseEnter={() => setActive(center.id)}
            onMouseLeave={() => setActive(null)}
            whileHover={{ scale: 1.2 }}
          />

          {nodes.map((node) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r="3"
              fill={active === node.id ? '#fff' : 'transparent'}
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="0.35"
              className="network__node"
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ scale: 1.35 }}
            />
          ))}
        </svg>

        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              className="network__readout"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <span className="network__readout-label">{activeNode.label}</span>
              <p className="network__readout-desc">{activeNode.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="network__tags"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {profile.focusAreas.map((area) => (
          <motion.button
            key={area}
            type="button"
            className={`network__tag ${active === area.toLowerCase().replace(/\s+/g, '-') ? 'network__tag--active' : ''}`}
            variants={staggerItem}
            onMouseEnter={() => setActive(area.toLowerCase().replace(/\s+/g, '-'))}
            onMouseLeave={() => setActive(null)}
          >
            <span className="network__tag-dot" />
            {area}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
