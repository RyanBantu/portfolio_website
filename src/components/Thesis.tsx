import { education, fdeLoop, fieldPhotos, thesis } from '../data/resume'
import { Reveal, SectionHead, Zoomable } from './ui'
import { Flags } from './Flags'

const pillarIndex: Record<string, string> = { silicon: 'A', algorithms: 'B', edge: 'C', climate: 'D' }

export function Thesis() {
  return (
    <section className="section" id="thesis">
      <div className="container">
        <SectionHead
          index="01"
          kicker="The thesis"
          title={
            <>
              Make AI <em>cheaper</em> to run, and the planet better for it.
            </>
          }
          lede={thesis.statement}
        />

        <div className="pillars">
          {thesis.pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06} className={`pillar card pillar--${p.key}`}>
              <span className="pillar__idx">{pillarIndex[p.key]}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul className="pillar__evidence">
                {p.evidence.map((e) => (
                  <li key={e.label}>
                    <a href={e.href}>
                      {e.label} <span aria-hidden="true">↓</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="fde">
          <Reveal className="fde__intro">
            <p className="eyebrow">How I work</p>
            <h3>Forward deployed: I go to the problem.</h3>
            <p>
              My training is mechanical; my job is to solve problems wherever they show up. I’ve delivered software
              and hardware projects across North America, Europe and Asia, sitting with the people who have the problem and
              owning the fix end to end, rather than handing over a spec.
            </p>
            <div className="field">
              {fieldPhotos.map((p) => (
                <figure key={p.src}>
                  <Zoomable src={p.src} alt={p.alt} />
                  <figcaption>{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
          <ol className="fde__steps">
            {fdeLoop.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.06}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{s.step}</h4>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="bg">
          <div className="bg__roots">
            <p className="eyebrow">Where I’m from</p>
            <p className="bg__home">
              Grew up in <b>Dallas, Texas</b>.
            </p>
            <Flags />
          </div>
          <div className="bg__edu">
            <p className="eyebrow">Education</p>
            <ul>
              {education.map((e) => (
                <li key={e.school}>
                  <div>
                    <strong>{e.school}</strong>
                    <span>{e.detail}</span>
                  </div>
                  <em>{e.years}</em>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
