import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { EngineeringBackdrop } from './components/EngineeringBackdrop'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { AchievementsSection } from './components/sections/AchievementsSection'
import { ContactFooter } from './components/sections/ContactFooter'
import { EducationSection } from './components/sections/EducationSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { Hero } from './components/sections/Hero'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { ResearchSection } from './components/sections/ResearchSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { SystemsSection } from './components/sections/SystemsSection'
import { TeachingSection } from './components/sections/TeachingSection'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <SmoothScrollProvider>
      <AnimatePresence mode="wait">{loading ? <LoadingScreen key="loader" /> : null}</AnimatePresence>

      <div className={`site ${loading ? 'site--locked' : ''}`}>
        <EngineeringBackdrop />
        <Navbar />
        <main>
          <Hero ready={!loading} />
          <SystemsSection />
          <ResearchSection />
          <EducationSection />
          <SkillsSection />
          <AchievementsSection />
          <ExperienceSection />
          <PublicationsSection />
          <ProjectsSection />
          <TeachingSection />
        </main>
        <ContactFooter />
      </div>
    </SmoothScrollProvider>
  )
}

export default App
