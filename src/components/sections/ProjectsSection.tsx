import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, type ProjectBuild } from '../../data/resume'
import { easeOut, staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './ProjectsSection.css'

const filters = ['All', 'Software', 'Hardware', 'ML'] as const
type Filter = (typeof filters)[number]

function BuildCard({ project, index }: { project: ProjectBuild; index: number }) {
  const featured = project.featured

  return (
    <motion.article
      layout
      className={`build ${featured ? 'build--featured' : ''}`}
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
      transition={{ layout: { duration: 0.45, ease: easeOut } }}
      whileHover={{ y: featured ? -4 : -6 }}
    >
      <div className="build__head">
        <div className="build__head-main">
          <span className="build__index">{String(index + 1).padStart(2, '0')}</span>
          <span className={`build__type build__type--${project.type.toLowerCase()}`}>{project.type}</span>
        </div>
        {featured && project.metric ? <span className="build__metric build__metric--featured">{project.metric}</span> : null}
      </div>

      <h3 className="build__name">{project.name}</h3>

      {project.url ? (
        <a className="build__link" href={project.url} target="_blank" rel="noreferrer">
          {new URL(project.url).hostname}
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="build__link build__link--muted">Deployed / physical build</span>
      )}

      <p className="build__desc">{project.desc}</p>

      <div className="build__stack">
        {project.stack.map((item) => (
          <span key={item} className="build__chip">
            {item}
          </span>
        ))}
      </div>

      {!featured && project.metric ? <span className="build__metric">{project.metric}</span> : null}

      <span className="build__corner build__corner--tl" aria-hidden="true" />
      <span className="build__corner build__corner--br" aria-hidden="true" />
    </motion.article>
  )
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.type === filter)),
    [filter],
  )

  const counts = useMemo(
    () =>
      filters.reduce(
        (acc, key) => {
          acc[key] = key === 'All' ? projects.length : projects.filter((p) => p.type === key).length
          return acc
        },
        {} as Record<Filter, number>,
      ),
    [],
  )

  const featuredProject = visible.find((p) => p.featured)
  const deckProjects = visible.filter((p) => !p.featured)

  return (
    <SectionShell
      id="projects"
      index="08"
      title="Builds"
      subtitle="Shipped software, hardware prototypes, and ML systems"
      variant="editorial"
    >
      <div className="builds">
        <motion.div
          className="builds__toolbar"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="builds__filters" role="tablist" aria-label="Filter builds by type" data-lenis-prevent>
            {filters.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                className={`builds__filter ${filter === key ? 'builds__filter--active' : ''}`}
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
              >
                {key}
                <span className="builds__filter-count">{counts[key]}</span>
              </button>
            ))}
          </div>

          <div className="builds__summary">
            <strong>{visible.length}</strong>
            <span>{filter === 'All' ? 'Total builds' : `${filter} builds`}</span>
          </div>
        </motion.div>

        <motion.div
          className="builds__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
        >
          <AnimatePresence mode="popLayout">
            {featuredProject ? (
              <BuildCard
                key={featuredProject.name}
                project={featuredProject}
                index={visible.indexOf(featuredProject)}
              />
            ) : null}
            {deckProjects.length > 0 ? (
              <motion.div className="builds__deck" layout>
                {deckProjects.map((project) => (
                  <BuildCard
                    key={project.name}
                    project={project}
                    index={visible.indexOf(project)}
                  />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionShell>
  )
}
