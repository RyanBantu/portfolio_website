import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import { easeOut, fadeUpProps } from './motion'
import { EngineeringBackdrop } from './components/EngineeringBackdrop'
import { Navbar } from './components/Navbar'
import {
  achievements,
  entrepreneurAward,
  solarDecathlonAchievement,
  education,
  experience,
  goperch,
  profile,
  projects,
  researchItems,
  skillGroups,
  teaching,
  guestLecturePhotos,
  communityTeachingPhoto,
  manipalWorkshopPhotos,
} from './data/resume'

function App() {
  return (
    <div id="top" className="app">
      <EngineeringBackdrop />
      <Navbar />

      <section className="hero">
        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.06, ease: easeOut }}
          >
            <p className="eyebrow">Portfolio · Systems & AI</p>
            <h1>{profile.name}</h1>
            <p className="role-line">{profile.roles.join(' · ')}</p>
            <p className="lede">{profile.headline}</p>
            <p className="summary">{profile.summary}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#experience">
                View experience
              </a>
              <a className="btn ghost" href={profile.email ? `mailto:${profile.email}` : '#contact'}>
                Email
              </a>
            </div>
            <TelemetryStrip />
          </motion.div>
        </div>
      </section>

      <Section id="about" title="Research focus" subtitle="Where engineering meets intelligent systems">
        <p className="block-text">
          From YOLO-based Re-ID at the edge to AWS Bedrock orchestration in production — I bridge research
          validation and scalable deployment.
        </p>
        <div className="pill-row">
          {profile.researchInterests.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section id="education" title="Education" subtitle="Mechanical engineering foundation">
        <ul className="timeline">
          {education.map((e) => (
            <li key={e.school}>
              <strong>{e.school}</strong>
              <span>{e.detail}</span>
              <em>{e.years}</em>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="skills" title="Technical skills" subtitle="AI, cloud, robotics, and core engineering">
        <div className="skill-grid">
          {skillGroups.map((g) => (
            <article key={g.title} className="skill-card">
              <h3>{g.title}</h3>
              <p>{g.items}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="achievements" title="Key achievements" subtitle="Recognition and impact">
        <div className="achievement-entrepreneur">
          <p className="achievement-entrepreneur-statement">{entrepreneurAward.statement}</p>
          <div className="achievement-photo-row" aria-label="Entrepreneurship recognition">
            {entrepreneurAward.photos.map((ph) => (
              <figure key={ph.src} className="achievement-photo-wrap">
                <img
                  className="achievement-photo"
                  src={ph.src}
                  alt={ph.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
        <ul className="bullet-list highlight achievement-bullets">
          <li className="achievement-item achievement-item--solar">
            {solarDecathlonAchievement.text}
            <div
              className="achievement-photo-row achievement-photo-row--solar"
              aria-label="Solar Decathlon India — national winner"
            >
              {solarDecathlonAchievement.photos.map((ph) => (
                <figure key={ph.src} className="achievement-photo-wrap">
                  <img
                    className="achievement-photo"
                    src={ph.src}
                    alt={ph.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </li>
          {achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      <Section id="experience" title="Professional experience" subtitle="From defense composites to clinical AI">
        <div className="exp-stack">
          {experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="exp-card">
              <header>
                <h3>
                  {job.company}
                  {job.location ? <span className="muted"> · {job.location}</span> : null}
                </h3>
                <p className="role">{job.role}</p>
                <p className="period">{job.period}</p>
              </header>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="exp-card founder">
          <header>
            <h3>{goperch.title}</h3>
            <p className="period">{goperch.period}</p>
          </header>
          <ul>
            {goperch.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      </Section>

      <Section id="research" title="Research" subtitle="Publications in progress">
        <div className="research-grid">
          {researchItems.map((r) => (
            <article key={r.title} className="research-card">
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Technical projects" subtitle="Hardware, ML, and social impact">
        <div className="project-grid">
          {projects.map((p) => (
            <article key={p.name} className="project-card">
              <h3>{p.name}</h3>
              {'url' in p && p.url ? (
                <a className="project-link" href={p.url} target="_blank" rel="noreferrer">
                  {new URL(p.url).hostname}
                </a>
              ) : null}
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="teaching" title="Teaching & volunteering" subtitle="Community and leadership">
        <ul className="bullet-list teaching-list">
          <li className="teaching-item teaching-item--guest">
            {teaching[0]}
            <div className="teaching-inline-gallery" aria-label="Guest lecture at Infosys">
              {guestLecturePhotos.map((ph) => (
                <figure key={ph.src} className="teaching-photo-wrap">
                  <img
                    className="teaching-photo"
                    src={ph.src}
                    alt={ph.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="teaching-photo-caption">{ph.caption}</figcaption>
                </figure>
              ))}
            </div>
          </li>
          <li className="teaching-item teaching-item--community">
            {teaching[1]}
            <figure className="teaching-photo-wrap teaching-photo-wrap--single">
              <img
                className="teaching-photo"
                src={communityTeachingPhoto.src}
                alt={communityTeachingPhoto.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="teaching-photo-caption">{communityTeachingPhoto.caption}</figcaption>
            </figure>
          </li>
          <li className="teaching-item teaching-item--manipal">
            {teaching[2]}
            <div className="teaching-inline-gallery" aria-label="Workshops in Manipal">
              {manipalWorkshopPhotos.map((ph) => (
                <figure key={ph.src} className="teaching-photo-wrap">
                  <img
                    className="teaching-photo"
                    src={ph.src}
                    alt={ph.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="teaching-photo-caption">{ph.caption}</figcaption>
                </figure>
              ))}
            </div>
          </li>
          {teaching.slice(3).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      <footer id="contact" className="site-footer">
        <motion.div className="footer-inner" {...fadeUpProps}>
          <h2>Contact</h2>
          <p className="footer-lede">Let’s build reliable systems at the edge and in the cloud.</p>
          <div className="contact-row">
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.website}>{profile.website.replace(/^https?:\/\//, '')}</a>
          </div>
          <div className="contact-row social">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} {profile.name}</p>
        </motion.div>
      </footer>
    </div>
  )
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <motion.section id={id} className="content-section" {...fadeUpProps}>
      <header className="section-head">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      {children}
    </motion.section>
  )
}

function TelemetryStrip() {
  const items = ['YOLO Re-ID', 'AWS Bedrock', 'FastAPI', 'Raspberry Pi', 'EEG ML', 'CFD', '40+ deploys']
  return (
    <div className="telemetry" aria-hidden="true">
      <div className="telemetry-track">
        {[...items, ...items].map((label, i) => (
          <span key={`${label}-${i}`} className="telemetry-tag">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default App
