import { goperch, press, ruggedlynx } from '../data/resume'
import { Counter, Reveal, SectionHead, Zoomable } from './ui'

export function Deployments() {
  const felicitationPress = press.filter((p) => p.topic === 'goperch')
  return (
    <section className="section" id="deployments">
      <div className="container">
        <SectionHead
          index="04"
          kicker="Evidence · AI at the edge"
          title={<>Deployed in the field, not just on a slide.</>}
          lede="Through GoPerch Innovations, my company since 2021, I put intelligence where the problem is (in a forest, on a warehouse floor, at a time clock) and keep compute and bandwidth to a minimum."
        />

        <Reveal className="rl card">
          <div className="rl__copy">
            <p className="eyebrow">Featured · Edge AI hardware</p>
            <h3>
              {ruggedlynx.name}
              <a className="link rl__url" href={ruggedlynx.url} target="_blank" rel="noreferrer">
                ruggedlynx.com ↗
              </a>
            </h3>
            <p className="rl__line">{ruggedlynx.line}</p>
            <p className="rl__body">{ruggedlynx.body}</p>
            <div className="chips chips--sm">
              {['YOLO', 'Re-ID', 'Raspberry Pi', 'SIM7600 4G', 'Low-power MCU'].map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="rl__specs">
            <dl>
              {ruggedlynx.specs.map((s) => (
                <div key={s.k}>
                  <dt>{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="rl__note">Hardware specifications are preliminary.</p>
          </div>
        </Reveal>

        <div className="gp">
          <Reveal className="card gp__main">
            <p className="eyebrow">GoPerch Innovations · Founder & CEO · {goperch.period}</p>
            <h3 className="gp__tagline">{goperch.tagline}</h3>
            <p className="gp__pitch">{goperch.pitch}</p>
            <ul className="gp__modules">
              {goperch.modules.map((m) => (
                <li key={m.n}>
                  <span>{m.n}</span>
                  <b>{m.name}</b>
                  <em>{m.desc}</em>
                </li>
              ))}
            </ul>
            <a className="btn btn--sm btn--ghost" href={goperch.url} target="_blank" rel="noreferrer">
              goperch.in ↗
            </a>
          </Reveal>

          <div className="gp__side">
            <dl className="statgrid">
              {goperch.stats.map((s) => (
                <Reveal key={s.label} className="statgrid__cell">
                  <dd>
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt>{s.label}</dt>
                </Reveal>
              ))}
            </dl>
            <Reveal className="card">
              <ul className="bullets">
                {goperch.bullets.slice(0, 1).concat(goperch.bullets.slice(2)).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="award card">
          <div className="award__photos">
            {goperch.award.photos.map((p) => (
              <Zoomable key={p.src} src={p.src} alt={p.alt} />
            ))}
          </div>
          <div className="award__copy">
            <p className="eyebrow">Recognition · MAHE 33rd Convocation</p>
            <h3>Start-Up Founder’s Felicitation 2025</h3>
            <p>{goperch.award.text}</p>
            <div className="award__links">
              {felicitationPress.map((p) => (
                <a key={p.url} className="link" href={p.url} target="_blank" rel="noreferrer">
                  {p.outlet} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
