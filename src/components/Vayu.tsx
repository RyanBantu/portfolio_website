import { patent, press, vayu } from '../data/resume'
import { Counter, Reveal, SectionHead, Zoomable } from './ui'

export function Vayu() {
  const sdiPress = press.filter((p) => p.topic === 'sdi')

  return (
    <section className="section" id="vayu">
      <div className="container">
        <SectionHead
          index="03"
          kicker="Evidence · Hardware + climate"
          title={
            <>
              VAYU: <em>Versatile Air Yielding Unit</em>
            </>
          }
          lede={
            <>
              Refrigerant-free cooling that clips onto a ceiling fan, for households that can’t afford an AC. It’s
              the same problem as cooling a chip: move heat efficiently within a tight power budget. National winner,
              Solar Decathlon India 2024–25. Sold as{' '}
              <a className="link" href={vayu.url} target="_blank" rel="noreferrer">
                CBEC ↗
              </a>
              .
            </>
          }
        />

        <div className="vayu-top">
          <Reveal className="vayu__role card">
            <img src="/images/ryan-sdi-trophy.png" alt="Ryan Bantu holding the Solar Decathlon India winner trophy" className="vayu__portrait" />
            <div>
              <p className="eyebrow">My role</p>
              <p className="vayu__roletext">{vayu.role}</p>
              <div className="chips chips--sm">
                {['ANSYS Fluent CFD', 'Altair OptiStruct', 'Peltier (TEC)', 'Desiccant + PCM', 'MCU control'].map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="patent card" delay={0.08}>
            <div className="patent__head">
              <span className="badge badge--live">Published · {patent.journal}</span>
              <p className="eyebrow">Indian patent application</p>
              <p className="patent__no">
                No. <b>{patent.applicationNo}</b>
              </p>
              <p className="patent__inventor">
                <span>Inventor</span> Ryan Bantu
              </p>
            </div>
            <h3 className="patent__title">{patent.title}</h3>
            <dl className="patent__meta">
              <div>
                <dt>Publication</dt>
                <dd>{patent.publicationNo}</dd>
              </div>
              <div>
                <dt>Filed</dt>
                <dd>{patent.filed}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>{patent.published}</dd>
              </div>
              <div>
                <dt>Applicant</dt>
                <dd>{patent.applicant}</dd>
              </div>
              <div className="wide">
                <dt>IPC</dt>
                <dd className="mono">{patent.ipc}</dd>
              </div>
            </dl>
            <p className="patent__abstract">{patent.abstract}</p>
            <div className="patent__actions">
              <a className="btn btn--sm" href={patent.pdf} target="_blank" rel="noreferrer">
                Patent journal entry (PDF) ↗
              </a>
              <a className="btn btn--sm btn--ghost" href={patent.searchUrl} target="_blank" rel="noreferrer">
                Verify on IP India ↗
              </a>
            </div>
            <p className="patent__hint">
              On IP India Public Search, choose “Application Number” and enter <span className="mono">{patent.applicationNo}</span>.
            </p>
          </Reveal>
        </div>

        <ol className="chapters">
          {vayu.chapters.map((c, i) => (
            <Reveal as="li" key={c.tag} delay={(i % 3) * 0.06} className="chapter">
              <span className="chapter__tag">
                {String(i + 1).padStart(2, '0')} · {c.tag}
              </span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </ol>

        <dl className="statbar">
          {vayu.stats.map((s) => (
            <div key={s.label}>
              <dd>
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="gallery gallery--4">
          {vayu.photos.map((p) => (
            <Reveal key={p.src}>
              <Zoomable src={p.src} alt={p.alt} />
            </Reveal>
          ))}
        </div>

        <div className="press">
          <p className="eyebrow">Coverage</p>
          <ul className="press__list">
            {sdiPress.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noreferrer">
                  <b>{p.outlet}</b>
                  <span>{p.title}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
