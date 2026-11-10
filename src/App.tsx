import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Navbar, Starfield } from './components/chrome'
import { Loader } from './components/Loader'
import { Deployments } from './components/GoPerch'
import { Hero } from './components/Hero'
import { Thesis } from './components/Thesis'
import { Research } from './components/Research'
import { Also, Contact, Letters, Recognition, Resume, Trajectory } from './components/Sections'
import { LightboxProvider } from './components/ui'
import { Vayu } from './components/Vayu'
import './styles.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [smooth] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 2600)
    return () => window.clearTimeout(t)
  }, [])

  const site = (
    <LightboxProvider>
      <Loader show={loading} />
      <Starfield />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Thesis />
        <Research />
        <Vayu />
        <Deployments />
        <Trajectory />
        <Letters />
        <Recognition />
        <Also />
        <Resume />
      </main>
      <Contact />
      <Analytics />
      <SpeedInsights />
    </LightboxProvider>
  )

  return smooth ? (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, autoRaf: true, anchors: { offset: -70 } }}>
      {site}
    </ReactLenis>
  ) : (
    site
  )
}

export default App
