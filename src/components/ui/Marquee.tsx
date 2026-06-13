import './Marquee.css'

type MarqueeProps = {
  items: string[]
  speed?: number
}

export function Marquee({ items, speed = 35 }: MarqueeProps) {
  const track = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            <span className="marquee__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
