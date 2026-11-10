/* Hand-drawn SVG flags (emoji flags don't render on Windows and look out of place). */

function UsFlag() {
  const stars = []
  for (let r = 0; r < 9; r++) {
    const n = r % 2 === 0 ? 6 : 5
    for (let c = 0; c < n; c++) {
      const x = (r % 2 === 0 ? 0.063 : 0.126) + c * 0.126
      stars.push(<circle key={`${r}-${c}`} cx={x * 76} cy={(0.054 + r * 0.054) * 40} r="0.85" fill="#fff" />)
    }
  }
  return (
    <svg viewBox="0 0 76 40" role="img" aria-label="Flag of the United States">
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} y={(i * 40) / 13} width="76" height={40 / 13 + 0.05} fill={i % 2 === 0 ? '#B22234' : '#fff'} />
      ))}
      <rect width="30.4" height={(40 * 7) / 13} fill="#3C3B6E" />
      {stars}
    </svg>
  )
}

function star(cx: number, cy: number, R: number) {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? R : R * 0.382
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

function TexasFlag() {
  return (
    <svg viewBox="0 0 60 40" role="img" aria-label="Flag of Texas">
      <rect width="60" height="20" fill="#fff" />
      <rect y="20" width="60" height="20" fill="#BF0A30" />
      <rect width="20" height="40" fill="#002868" />
      <polygon points={star(10, 20.6, 6.4)} fill="#fff" />
    </svg>
  )
}

function IndiaFlag() {
  const spokes = Array.from({ length: 24 }).map((_, i) => (
    <line key={i} x1="30" y1="20" x2="30" y2="15.6" stroke="#000080" strokeWidth="0.35" transform={`rotate(${i * 15} 30 20)`} />
  ))
  return (
    <svg viewBox="0 0 60 40" role="img" aria-label="Flag of India">
      <rect width="60" height="13.34" fill="#FF9933" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.66" width="60" height="13.34" fill="#138808" />
      <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="0.7" />
      <circle cx="30" cy="20" r="0.9" fill="#000080" />
      {spokes}
    </svg>
  )
}

export function Flags() {
  return (
    <ul className="flags">
      <li>
        <TexasFlag />
        <span>Texas</span>
      </li>
      <li>
        <UsFlag />
        <span>United States</span>
      </li>
      <li>
        <IndiaFlag />
        <span>India</span>
      </li>
    </ul>
  )
}
