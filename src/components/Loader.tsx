import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from './motion'

/* ───────── geometry helpers ───────── */

type Pt = { x: number; y: number }

/** 45° (octilinear) PCB-style route: diagonal first, then straight. */
function route(a: Pt, b: Pt): string {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const d = Math.min(Math.abs(dx), Math.abs(dy))
  const m = { x: a.x + Math.sign(dx) * d, y: a.y + Math.sign(dy) * d }
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} L${m.x.toFixed(1)},${m.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`
}

/** Spur-gear outline centred on the origin. */
function gearPath(teeth: number, pitchR: number, addendum: number): string {
  const p = (Math.PI * 2) / teeth
  const pts: string[] = []
  for (let k = 0; k < teeth; k++) {
    const t = k * p
    const seq: [number, number][] = [
      [pitchR - addendum, t],
      [pitchR - addendum, t + 0.22 * p],
      [pitchR + addendum, t + 0.36 * p],
      [pitchR + addendum, t + 0.64 * p],
      [pitchR - addendum, t + 0.78 * p],
    ]
    for (const [r, ang] of seq) pts.push(`${(r * Math.cos(ang)).toFixed(2)},${(r * Math.sin(ang)).toFixed(2)}`)
  }
  return `M${pts.join(' L')} Z`
}

type Gear = { teeth: number; r: number; cx: number; cy: number; rot0: number; dur: number; dir: 1 | -1 }

function Gears({ x, y, scale }: { x: number; y: number; scale: number }) {
  // module 6 → pitch radius = 3·N. Ratios are physically consistent: ω ∝ 1/N.
  const gears = useMemo<Gear[]>(() => {
    const m = 3
    const A = { teeth: 18, r: m * 18 }
    const B = { teeth: 10, r: m * 10 }
    const C = { teeth: 26, r: m * 26 }
    const phiB = (-35 * Math.PI) / 180
    const phiC = (160 * Math.PI) / 180
    const dAB = A.r + B.r
    const dAC = A.r + C.r
    const deg = (rad: number) => (rad * 180) / Math.PI
    const base = 9 // seconds per rev for A
    return [
      { ...A, cx: 0, cy: 0, rot0: deg(phiB) - 180 / A.teeth - (0.5 * 360) / A.teeth, dur: base, dir: 1 },
      { ...B, cx: dAB * Math.cos(phiB), cy: dAB * Math.sin(phiB), rot0: deg(phiB) + 180 - (0.5 * 360) / B.teeth + 180 / B.teeth, dur: (base * B.teeth) / A.teeth, dir: -1 },
      { ...C, cx: dAC * Math.cos(phiC), cy: dAC * Math.sin(phiC), rot0: deg(phiC) + 180 - (0.5 * 360) / C.teeth + 180 / C.teeth, dur: (base * C.teeth) / A.teeth, dir: -1 },
    ]
  }, [])

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="ld-gears">
      {gears.map((g, i) => (
        <g key={i} transform={`translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`}>
          <g className="ld-gear" style={{ animationDuration: `${g.dur}s`, animationDirection: g.dir === 1 ? 'normal' : 'reverse' }}>
            <g transform={`rotate(${g.rot0})`}>
              <path d={gearPath(g.teeth, g.r, 3)} className="ld-gear__body" />
              <circle r={g.r * 0.62} className="ld-gear__web" />
              {Array.from({ length: g.teeth > 12 ? 5 : 3 }).map((_, s, arr) => (
                <line key={s} x1="0" y1="0" x2={(g.r * 0.62).toFixed(1)} y2="0" transform={`rotate(${(360 / arr.length) * s})`} className="ld-gear__spoke" />
              ))}
              <circle r={g.r * 0.18} className="ld-gear__hub" />
              <rect x={-1.5} y={-g.r * 0.18 - 2} width="3" height="4" className="ld-gear__key" />
            </g>
          </g>
          <circle r="2.2" className="ld-gear__axle" />
        </g>
      ))}
      <text x={-40} y={130} className="ld-label">
        z18 · z10 · z26 · m3 · i = 1.80
      </text>
    </g>
  )
}

type Chip = { x: number; y: number; w: number; h: number; label: string; sub: string; pins: number }

function ChipEl({ c }: { c: Chip }) {
  const pitch = c.h / (c.pins + 1)
  return (
    <g className="ld-chip">
      {Array.from({ length: c.pins }).map((_, i) => (
        <g key={i}>
          <rect x={c.x - c.w / 2 - 7} y={c.y - c.h / 2 + pitch * (i + 1) - 2} width="7" height="4" className="ld-pin" />
          <rect x={c.x + c.w / 2} y={c.y - c.h / 2 + pitch * (i + 1) - 2} width="7" height="4" className="ld-pin" />
        </g>
      ))}
      <rect x={c.x - c.w / 2} y={c.y - c.h / 2} width={c.w} height={c.h} rx="3" className="ld-chip__body" />
      <circle cx={c.x - c.w / 2 + 7} cy={c.y - c.h / 2 + 7} r="2.2" className="ld-chip__dot" />
      <text x={c.x} y={c.y - 2} textAnchor="middle" className="ld-chip__label">
        {c.label}
      </text>
      <text x={c.x} y={c.y + 11} textAnchor="middle" className="ld-chip__sub">
        {c.sub}
      </text>
    </g>
  )
}

/* ───────── board layout (depends on viewport aspect) ───────── */

function useBoard() {
  return useMemo(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    const k = (Math.min(w, h) < 520 ? 600 : 820) / Math.min(w, h)
    const W = Math.round(w * k)
    const H = Math.round(h * k)
    const portrait = H > W
    const c = { x: W / 2, y: portrait ? H * 0.4 : H * 0.44 }
    const R = 150 // ring around the planet (planet radius ≈ 140)

    const chips: Chip[] = portrait
      ? [
          { x: W * 0.22, y: c.y - 330, w: 92, h: 64, label: 'STM32', sub: 'MCU', pins: 5 },
          { x: W * 0.78, y: c.y - 330, w: 78, h: 54, label: 'IMU', sub: '6-DOF', pins: 4 },
          { x: W * 0.2, y: c.y + 420, w: 96, h: 60, label: 'SIM7600', sub: '4G LTE', pins: 5 },
          { x: W * 0.8, y: c.y + 420, w: 84, h: 60, label: 'RPi CM4', sub: 'EDGE AI', pins: 5 },
        ]
      : [
          { x: c.x - 430, y: c.y - 200, w: 104, h: 72, label: 'STM32', sub: 'MCU', pins: 6 },
          { x: c.x + 430, y: c.y - 210, w: 86, h: 58, label: 'IMU', sub: '6-DOF', pins: 4 },
          { x: c.x - 450, y: c.y + 150, w: 104, h: 64, label: 'SIM7600', sub: '4G LTE', pins: 5 },
          { x: c.x + 330, y: c.y + 40, w: 96, h: 66, label: 'RPi CM4', sub: 'EDGE AI', pins: 5 },
        ]

    const traces: { d: string; end: Pt; pad: 'via' | 'none' }[] = []
    chips.forEach((chip) => {
      const pitch = chip.h / (chip.pins + 1)
      const facingRight = chip.x < c.x
      for (let i = 0; i < chip.pins; i++) {
        const pin = {
          x: facingRight ? chip.x + chip.w / 2 + 7 : chip.x - chip.w / 2 - 7,
          y: chip.y - chip.h / 2 + pitch * (i + 1),
        }
        const ang = Math.atan2(pin.y - c.y, pin.x - c.x) + (i - (chip.pins - 1) / 2) * 0.06
        const start = { x: c.x + Math.cos(ang) * R, y: c.y + Math.sin(ang) * R }
        const stub = { x: c.x + Math.cos(ang) * (R + 26 + i * 4), y: c.y + Math.sin(ang) * (R + 26 + i * 4) }
        const lead = { x: pin.x + (facingRight ? 26 + i * 6 : -26 - i * 6), y: pin.y }
        traces.push({
          d: `M${start.x.toFixed(1)},${start.y.toFixed(1)} L${stub.x.toFixed(1)},${stub.y.toFixed(1)} ${route(stub, lead).replace(/^M[^L]+/, '')} L${pin.x.toFixed(1)},${pin.y.toFixed(1)}`,
          end: pin,
          pad: 'none',
        })
      }
    })
    // bus traces running off the board edge, ending in vias
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2 + 0.11
      const start = { x: c.x + Math.cos(ang) * R, y: c.y + Math.sin(ang) * R }
      const stub = { x: c.x + Math.cos(ang) * (R + 40), y: c.y + Math.sin(ang) * (R + 40) }
      const far = 220 + (i % 4) * 70
      const end = {
        x: Math.round((stub.x + Math.sign(Math.cos(ang)) * far) / 10) * 10,
        y: Math.round((stub.y + Math.sign(Math.sin(ang)) * far * 0.45) / 10) * 10,
      }
      traces.push({ d: `M${start.x.toFixed(1)},${start.y.toFixed(1)} L${stub.x.toFixed(1)},${stub.y.toFixed(1)} ${route(stub, end).replace(/^M[^L]+/, '')}`, end, pad: 'via' })
    }

    const gears = portrait ? { x: W - 150, y: H - 150, s: 0.75 } : { x: c.x + 420, y: c.y + 250, s: 1 }
    return { W, H, c, R, chips, traces, gears }
  }, [])
}

const BOOT = [
  { t: '$ boot --mission ryanbantu', c: 'cmd' },
  { t: '[ ok ] mech   cfd solver converged', c: 'ok' },
  { t: '[ ok ] mech   gear train  i = 1.80', c: 'ok' },
  { t: '[ ok ] elec   4-layer pcb · drc passed', c: 'ok' },
  { t: '[ ok ] edge   yolo + re-id on rpi', c: 'ok' },
  { t: '[ ok ] ml     mos bias correction', c: 'ok' },
  { t: '[ ok ] link   sim7600 4g uplink', c: 'ok' },
  { t: '> all systems nominal', c: 'go' },
]

const LOADER_MS = 2600

export function Loader({ show }: { show: boolean }) {
  const board = useBoard()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!show) return
    const t0 = performance.now()
    let raf = 0
    const tick = () => {
      setElapsed(performance.now() - t0)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [show])

  const pct = Math.min(1, elapsed / (LOADER_MS - 300))
  const tMinus = Math.max(0, 3 - Math.floor(pct * 3.999))
  const lines = Math.min(BOOT.length, Math.floor(pct * (BOOT.length + 0.5)) + 1)
  const { W, H, c, R, chips, traces, gears } = board

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="loader"
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease }}
          aria-label="Loading"
          role="status"
        >
          <svg className="ld-board" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <pattern id="ldGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" className="ld-grid" />
              </pattern>
              <radialGradient id="ldAtmo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.86" stopColor="#ff7a3c" stopOpacity="0" />
                <stop offset="0.93" stopColor="#ff7a3c" stopOpacity="0.25" />
                <stop offset="1" stopColor="#ff7a3c" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ldVignette" cx="0.5" cy="0.45" r="0.75">
                <stop offset="0.4" stopColor="#030206" stopOpacity="0" />
                <stop offset="1" stopColor="#030206" stopOpacity="0.95" />
              </radialGradient>
            </defs>

            <rect width={W} height={H} fill="url(#ldGrid)" />

            {/* copper traces */}
            {traces.map((tr, i) => (
              <g key={i}>
                <motion.path
                  d={tr.d}
                  className="ld-trace"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.1 + (i % 12) * 0.05, ease }}
                />
                {tr.pad === 'via' ? (
                  <motion.circle cx={tr.end.x} cy={tr.end.y} r="4.5" className="ld-via" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + (i % 12) * 0.05 }} />
                ) : null}
                {i % 3 === 0 ? (
                  <circle r="2.4" className="ld-pulse">
                    <animateMotion dur={`${1.6 + (i % 5) * 0.3}s`} repeatCount="indefinite" begin={`${0.8 + (i % 7) * 0.2}s`} path={tr.d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
                  </circle>
                ) : null}
              </g>
            ))}

            {chips.map((ch) => (
              <motion.g key={ch.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
                <ChipEl c={ch} />
              </motion.g>
            ))}

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <Gears x={gears.x} y={gears.y} scale={gears.s} />
            </motion.g>

            {/* ring of pads where traces leave the planet */}
            <circle cx={c.x} cy={c.y} r={R} className="ld-ring" />
            <circle cx={c.x} cy={c.y} r={R + 14} className="ld-ring ld-ring--dash" />

            {/* the planet: a real frame from the Mars rotation footage */}
            <motion.g initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }} style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
              <clipPath id="ldMarsClip">
                <circle cx={c.x} cy={c.y} r={R - 9} />
              </clipPath>
              <circle cx={c.x} cy={c.y} r={R - 9} fill="#000" />
              {/* planet in the frame: centre (220,220), radius 200 → scale to R-9 */}
              <image
                href="/images/mars-disc.jpg"
                x={c.x - (220 * (R - 9)) / 200}
                y={c.y - (220 * (R - 9)) / 200}
                width={(440 * (R - 9)) / 200}
                height={(440 * (R - 9)) / 200}
                clipPath="url(#ldMarsClip)"
                className="ld-mars"
              />
              <circle cx={c.x} cy={c.y} r={R + 6} fill="url(#ldAtmo)" />
            </motion.g>

            <g className="ld-orbit" style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
              <ellipse cx={c.x} cy={c.y} rx={R + 60} ry={(R + 60) * 0.32} className="ld-orbit__path" transform={`rotate(-18 ${c.x} ${c.y})`} />
            </g>

            <rect width={W} height={H} fill="url(#ldVignette)" />
          </svg>

          <div className="ld-hud" style={{ top: `${((c.y + R + 36) / H) * 100}%` }}>
            <p className="ld-hud__label">T-minus</p>
            <p className="ld-hud__count">{pct >= 1 ? 'LIFTOFF' : `00:0${tMinus}`}</p>
            <div className="ld-hud__bar">
              <span style={{ transform: `scaleX(${pct})` }} />
            </div>
            <p className="ld-hud__pct">{Math.round(pct * 100).toString().padStart(3, '0')}% · systems check</p>
          </div>

          <pre className="ld-term" aria-hidden="true">
            {BOOT.slice(0, lines).map((l) => (
              <span key={l.t} className={`ld-term__${l.c}`}>
                {l.t}
                {'\n'}
              </span>
            ))}
            <span className="ld-term__caret">▌</span>
          </pre>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
