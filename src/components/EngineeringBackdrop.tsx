/**
 * Static blueprint layer + slow scan — avoids looping “circuit trace” draws that read as busy.
 */
export function EngineeringBackdrop() {
  return (
    <div className="eng-backdrop" aria-hidden="true">
      <div className="grid-layer" />
      <div className="scan-line" />
      <svg className="circuit-layer circuit-layer--static" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="traceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 120 L200 120 L240 80 L400 80 L440 200 L600 200 L640 100 L900 100 L920 300 L1100 300 L1200 180"
          fill="none"
          stroke="url(#traceGrad)"
          strokeWidth="1"
        />
        <path
          d="M1200 600 L1000 600 L960 520 L720 520 L680 640 L400 640 L360 480 L120 480 L0 620"
          fill="none"
          stroke="url(#traceGrad)"
          strokeWidth="0.75"
          opacity={0.65}
        />
      </svg>
      <div className="noise-overlay" />
    </div>
  )
}
