import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { eegPaper, iotPaper, windPaper } from '../data/resume'
import { Reveal, SectionHead, Zoomable } from './ui'
import { ease } from './motion'

/* ───────── IoT ───────── */

function Pipeline() {
  return (
    <div className="pipeline" aria-label="Data path: vitals sensors to edge node to 4G uplink to cloud broker to ER dashboard">
      {iotPaper.pipeline.map((step, i) => (
        <div key={step} className="pipeline__node" style={{ ['--i' as string]: i }}>
          <span className="pipeline__dot" />
          <span className="pipeline__label">{step}</span>
        </div>
      ))}
      <div className="pipeline__track" aria-hidden="true">
        <span className="pipeline__packet" />
        <span className="pipeline__packet" style={{ animationDelay: '-1.1s' }} />
        <span className="pipeline__packet" style={{ animationDelay: '-2.2s' }} />
      </div>
    </div>
  )
}

function IotPaper() {
  return (
    <Reveal as="article" className="paper paper--iot card">
      <div className="paper__body">
        <div className="paper__meta">
          <span className="badge badge--live">
            <i className="dot" /> {iotPaper.status}
          </span>
          <span className="badge">IEEE · SCPGCON 2026</span>
        </div>
        <h3 className="paper__title">{iotPaper.title}</h3>
        <p className="paper__venue">
          {iotPaper.venue}
          <br />
          <span>{iotPaper.where}</span>
        </p>
        <p className="paper__text">{iotPaper.abstract}</p>
        <Pipeline />
        <p className="paper__authors">
          <span>Authors</span> {iotPaper.authors.split('Ryan Bantu')[0]}
          <b>Ryan Bantu</b>
          {iotPaper.authors.split('Ryan Bantu')[1]}
        </p>
      </div>
      <div className="paper__cert">
        <Zoomable src={iotPaper.certificate} alt="SCPGCON 2026 Certificate of Presentation, IoT Framework for Real-Time Patient Monitoring in Emergency Transfers" pdf={iotPaper.certificatePdf} className="cert" />
        <a className="link" href={iotPaper.certificatePdf} target="_blank" rel="noreferrer">
          Certificate of Presentation (PDF) ↗
        </a>
      </div>
    </Reveal>
  )
}

/* ───────── Wind ───────── */

const X0 = 2
const X1 = 15
const Y1 = 22
const W = 560
const H = 280
const PAD = { l: 44, r: 16, t: 16, b: 36 }
const sx = (x: number) => PAD.l + ((x - X0) / (X1 - X0)) * (W - PAD.l - PAD.r)
const sy = (y: number) => H - PAD.b - (y / Y1) * (H - PAD.t - PAD.b)

function interp(ws: number) {
  const c = windPaper.curve
  if (ws <= c[0].ws) return 0
  for (let i = 1; i < c.length; i++) {
    if (ws <= c[i].ws) {
      const a = c[i - 1]
      const b = c[i]
      return a.p + ((ws - a.ws) / (b.ws - a.ws)) * (b.p - a.p)
    }
  }
  return c[c.length - 1].p
}

function PowerCurve() {
  const [hover, setHover] = useState<number | null>(null)
  const path = useMemo(() => {
    const pts = [{ ws: X0, p: 0 }, ...windPaper.curve]
    return pts.map((pt, i) => `${i ? 'L' : 'M'}${sx(pt.ws).toFixed(1)},${sy(pt.p).toFixed(1)}`).join(' ')
  }, [])
  const area = `${path} L${sx(15)},${sy(0)} L${sx(X0)},${sy(0)} Z`

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * W
    const ws = X0 + ((x - PAD.l) / (W - PAD.l - PAD.r)) * (X1 - X0)
    setHover(Math.min(X1, Math.max(X0, ws)))
  }

  return (
    <figure className="curve">
      <figcaption>
        <span className="eyebrow">Empirical power curve · 20 Hz SCADA, state “Running”</span>
        <span className="curve__readout">
          {hover !== null ? (
            <>
              <b>{hover.toFixed(2)}</b> m/s → <b>{interp(hover).toFixed(2)}</b> kW
            </>
          ) : (
            'Hover to probe the curve'
          )}
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label="Power curve: cut-in at 3 metres per second, rising to a plateau of about 20 kilowatts above 13.75 metres per second"
      >
        <defs>
          <linearGradient id="curveFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curveStroke" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        {[0, 5, 10, 15, 20].map((y) => (
          <g key={y}>
            <line x1={PAD.l} x2={W - PAD.r} y1={sy(y)} y2={sy(y)} className="grid" />
            <text x={PAD.l - 8} y={sy(y) + 4} textAnchor="end" className="axis">
              {y}
            </text>
          </g>
        ))}
        {[3, 5, 7, 9, 11, 13, 15].map((x) => (
          <text key={x} x={sx(x)} y={H - PAD.b + 18} textAnchor="middle" className="axis">
            {x}
          </text>
        ))}
        <text x={W - PAD.r} y={H - 4} textAnchor="end" className="axis axis--title">wind speed (m/s)</text>
        <text x={PAD.l} y={PAD.t - 4} className="axis axis--title">kW</text>

        <line x1={sx(3)} x2={sx(3)} y1={sy(0)} y2={sy(21)} className="marker" />
        <text x={sx(3) + 6} y={sy(20.5)} className="axis axis--mark">cut-in 3.0</text>
        <line x1={PAD.l} x2={W - PAD.r} y1={sy(19.99)} y2={sy(19.99)} className="marker" />
        <text x={W - PAD.r - 4} y={sy(19.99) - 6} textAnchor="end" className="axis axis--mark">plateau 19.99 kW</text>

        <motion.path d={area} fill="url(#curveFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1 }} />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#curveStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease }}
        />
        {windPaper.curve.slice(1, -2).map((pt) => (
          <circle key={pt.ws} cx={sx(pt.ws)} cy={sy(pt.p)} r="4" className="pt" />
        ))}
        {hover !== null ? (
          <g>
            <line x1={sx(hover)} x2={sx(hover)} y1={sy(0)} y2={sy(Y1)} className="cross" />
            <circle cx={sx(hover)} cy={sy(interp(hover))} r="6" className="probe" />
          </g>
        ) : null}
      </svg>
    </figure>
  )
}

function Results() {
  const [mode, setMode] = useState<'raw' | 'lodo'>('lodo')
  return (
    <div className="results">
      <div className="results__head">
        <p className="eyebrow">Results · 44-day leave-one-day-out</p>
        <div className="seg" role="tablist" aria-label="Forecast variant">
          <button role="tab" aria-selected={mode === 'raw'} className={mode === 'raw' ? 'on' : ''} onClick={() => setMode('raw')}>
            Raw NWP
          </button>
          <button role="tab" aria-selected={mode === 'lodo'} className={mode === 'lodo' ? 'on' : ''} onClick={() => setMode('lodo')}>
            MOS-corrected
          </button>
        </div>
      </div>
      <dl className="results__grid">
        {windPaper.results.map((r) => (
          <div key={r.metric} className={mode === 'lodo' ? 'is-good' : ''}>
            <dt>{r.metric}</dt>
            <motion.dd key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              {mode === 'raw' ? r.raw : r.lodo}
            </motion.dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function WindPaper() {
  return (
    <Reveal as="article" className="paper paper--wind card">
      <div className="paper__meta">
        <span className="badge badge--violet">Machine learning · Energy</span>
        <span className="badge">{windPaper.status}</span>
        <span className="badge">{windPaper.supervisor}</span>
      </div>
      <h3 className="paper__title">{windPaper.title}</h3>
      <p className="paper__venue">{windPaper.subtitle}</p>
      <blockquote className="paper__question">{windPaper.question}</blockquote>

      <div className="wind">
        <ol className="wind__steps">
          {windPaper.steps.map((s, i) => (
            <Reveal as="li" key={s.k} delay={i * 0.08}>
              <span className="wind__k">{s.k}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="wind__viz">
          <PowerCurve />
          <Results />
          <p className="wind__insight">
            <span className="eyebrow">Key finding</span>
            {windPaper.insight}
          </p>
          <a className="btn btn--ghost btn--sm" href={windPaper.url} target="_blank" rel="noreferrer">
            Read the paper & interactive site ↗
          </a>
        </div>
      </div>
    </Reveal>
  )
}

/* ───────── EEG ───────── */

function EegPaper() {
  const lines = [0, 1, 2, 3]
  return (
    <Reveal as="article" className="paper paper--eeg card">
      <div className="eeg" aria-hidden="true">
        {lines.map((l) => (
          <svg key={l} viewBox="0 0 400 40" preserveAspectRatio="none" style={{ animationDelay: `${-l * 0.7}s` }}>
            <path d="M0 20 Q 10 4 20 20 T 40 20 T 60 20 Q 70 36 80 20 T 100 20 L 110 6 L 116 34 L 122 20 T 160 20 Q 170 8 180 20 T 200 20 T 220 20 Q 230 30 240 20 T 260 20 L 270 4 L 276 36 L 282 20 T 320 20 Q 330 10 340 20 T 360 20 T 380 20 T 400 20" />
          </svg>
        ))}
      </div>
      <div>
        <div className="paper__meta">
          <span className="badge badge--amber">{eegPaper.status}</span>
          <span className="badge">Multimodal learning</span>
        </div>
        <h3 className="paper__title">{eegPaper.title}</h3>
        <p className="paper__text">{eegPaper.body}</p>
        <div className="chips">
          {eegPaper.tags.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export function Research() {
  return (
    <section className="section" id="research">
      <div className="container">
        <SectionHead
          index="02"
          kicker="Evidence · Efficient algorithms & edge"
          title={<>Small models, honest data, <em>less compute</em>.</>}
          lede="Each of these asks the same question: what is the least computation that still gives a trustworthy answer, on the hardware that is actually available?"
        />
        <div className="papers">
          <IotPaper />
          <WindPaper />
          <EegPaper />
        </div>
      </div>
    </section>
  )
}
