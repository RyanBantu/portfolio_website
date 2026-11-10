import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience, honors, letters, profile, projects, skillGroups, teaching } from '../data/resume'
import { Reveal, SectionHead, Zoomable } from './ui'
import { useLightbox } from './lightbox'

/* ───────── Trajectory (experience timeline) ───────── */

export function Trajectory() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead
          index="05"
          kicker="Experience"
          title={
            <>
              From missile composites to <em>LLM systems</em>.
            </>
          }
          lede="Each role added a layer of the stack I need for efficient AI hardware: structures and thermals, circuits, software, then intelligence."
        />
        <ol className="timeline" ref={ref}>
          <motion.span className="timeline__line" style={{ scaleY: line }} aria-hidden="true" />
          {experience.map((e) => (
            <Reveal as="li" key={e.company} className="timeline__item">
              <span className={`timeline__node kind-${e.kind.toLowerCase().replace(/[^a-z]/g, '')}`} aria-hidden="true" />
              <div className="timeline__card card">
                <header>
                  <div>
                    <h3>{e.company}</h3>
                    <p>{e.role}</p>
                  </div>
                  <div className="timeline__when">
                    <span>{e.period}</span>
                    <em>{e.location}</em>
                  </div>
                </header>
                <ul className="bullets">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <span className={`badge kind-${e.kind.toLowerCase().replace(/[^a-z]/g, '')}`}>{e.kind}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────── Letters of recommendation ───────── */

export function Letters() {
  const open = useLightbox()
  return (
    <section className="section section--letters" id="letters">
      <div className="container">
        <SectionHead
          index="06"
          kicker="Letters of recommendation"
          title={
            <>
              In <em>their</em> words.
            </>
          }
          lede="Excerpts from signed letters. Open any letter to read the full original."
        />
        <div className="letters">
          {letters.map((l, i) => (
            <Reveal as="article" key={l.name} delay={i * 0.1} className="letter card card--glass">
              <span className="letter__mark" aria-hidden="true">
                “
              </span>
              <blockquote className="letter__quote">{l.quote}</blockquote>
              <div className="letter__excerpt">
                {l.excerpt.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <footer className="letter__foot">
                <button
                  type="button"
                  className="letter__thumb"
                  onClick={() => open({ src: l.image, alt: `Letter of recommendation from ${l.name}, ${l.role}`, pdf: l.pdf })}
                  aria-label={`View the original letter from ${l.name}`}
                >
                  <img src={l.image} alt="" loading="lazy" />
                </button>
                <div>
                  <strong>{l.name}</strong>
                  <span>{l.role}</span>
                  <em>
                    {l.org} · {l.date}
                  </em>
                  <div className="letter__actions">
                    <button
                      type="button"
                      className="btn btn--sm"
                      onClick={() => open({ src: l.image, alt: `Letter of recommendation from ${l.name}, ${l.role}`, pdf: l.pdf })}
                    >
                      Read letter
                    </button>
                    <a className="btn btn--sm btn--ghost" href={l.pdf} target="_blank" rel="noreferrer">
                      PDF ↗
                    </a>
                  </div>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── Recognition ───────── */

export function Recognition() {
  return (
    <section className="section" id="recognition">
      <div className="container">
        <SectionHead index="07" kicker="Recognition" title={<>Independent validation.</>} />
        <ul className="honors">
          {honors.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 0.05} className="honor">
              <span className="honor__year">{h.year}</span>
              <div>
                <h3>{h.title}</h3>
                <p>{h.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────── Also: other builds, teaching, toolkit ───────── */

export function Also() {
  return (
    <section className="section section--tight" id="also">
      <div className="container">
        <SectionHead
          index="08"
          kicker="Also"
          title={<>Other things I’ve built and taught.</>}
          lede="Side projects, teaching and tools. Not the main story, but they show how I work."
        />

        <div className="also">
          <Reveal className="card">
            <p className="eyebrow">Other builds</p>
            <ul className="mini-list">
              {projects
                .filter((p) => p.name !== 'RuggedLynx')
                .map((p) => (
                  <li key={p.name}>
                    <div>
                      <b>{p.name}</b>
                      <span>{p.tag}</span>
                    </div>
                    <p>{p.desc}</p>
                    {p.url ? (
                      <a className="link" href={p.url} target="_blank" rel="noreferrer">
                        {p.url.replace(/^https?:\/\//, '')} ↗
                      </a>
                    ) : null}
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal className="card" delay={0.06}>
            <p className="eyebrow">Teaching & leadership</p>
            <ul className="mini-list">
              {teaching.map((t) => (
                <li key={t.title}>
                  <div>
                    <b>{t.title}</b>
                  </div>
                  <p>{t.body}</p>
                </li>
              ))}
            </ul>
            <div className="also__photos">
              {teaching
                .flatMap((t) => t.photos)
                .slice(0, 4)
                .map((p) => (
                  <Zoomable key={p.src} src={p.src} alt={p.alt} />
                ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="card toolkit">
          <p className="eyebrow">Toolkit</p>
          <div className="toolkit__grid">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h4>{g.title}</h4>
                <p>{g.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Resume ───────── */

export function Resume() {
  const open = useLightbox()
  return (
    <section className="section section--tight" id="resume">
      <div className="container">
        <Reveal className="resume card">
          <button
            type="button"
            className="resume__preview"
            onClick={() => open({ src: '/images/resume-page1.jpg', alt: 'Resume of Ryan Elisha Bantu, page 1', pdf: profile.resume })}
            aria-label="Preview resume"
          >
            <img src="/images/resume-page1.jpg" alt="" loading="lazy" />
          </button>
          <div className="resume__copy">
            <p className="eyebrow">09 · Resume</p>
            <h2 className="resume__title">The whole story on two pages.</h2>
            <p className="resume__lede">
              Experience, research, patents, projects and skills, in one PDF that’s easy to forward to a hiring
              manager or an admissions committee.
            </p>
            <div className="resume__actions">
              <a className="btn btn--glow" href={profile.resume} download="Ryan-Bantu-Resume.pdf">
                Download resume <span aria-hidden="true">↓</span>
              </a>
              <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
                Open in new tab ↗
              </a>
            </div>
            <p className="resume__meta">PDF · 2 pages · updated November 2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Contact ───────── */

export function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact__planet" aria-hidden="true" />
      <div className="container contact__inner">
        <Reveal>
          <p className="eyebrow">Open channel</p>
          <h2 className="contact__title">
            Let’s make AI <br />
            <em>cheaper to run.</em>
          </h2>
          <p className="contact__lede">
            I’m looking for forward deployed and graduate research roles in efficient AI hardware, edge
            inference, robotics and climate tech. If your problem involves watts, heat or latency, let’s talk.
          </p>
          <div className="contact__actions">
            <a className="btn btn--glow" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn btn--ghost" href={profile.resume} download="Ryan-Bantu-Resume.pdf">
              Resume ↓
            </a>
            <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </Reveal>
        <p className="contact__fine">
          © {new Date().getFullYear()} {profile.fullName} · Forward Deployed Engineer
        </p>
      </div>
    </footer>
  )
}
