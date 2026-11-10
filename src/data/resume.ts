export const profile = {
  name: 'Ryan Bantu',
  fullName: 'Ryan Elisha Bantu',
  title: 'Forward Deployed Engineer',
  roles: ['Forward Deployed Engineer'],
  tagline: 'Forward Deployed Engineer · Mechanical engineering background',
  headline: 'I work on making AI cheaper to run, in watts, dollars and carbon.',
  subhead:
    'A mechanical engineer turned forward deployed engineer, working toward AI-efficient chips that run models locally. I’ve delivered software and hardware projects across North America, Europe and Asia: I get on site, find the real constraint, and ship the fix.',
  background: 'Grew up in Dallas, Texas.',
  summary:
    'Grew up in Dallas, Texas. Mechanical engineer by training, forward deployed engineer by practice. Inventor on a published patent, IEEE-presented author, Solar Decathlon India national winner, and founder of GoPerch Innovations (40+ enterprise clients).',
  focusAreas: ['Mechatronics', 'Embedded Systems', 'Edge AI', 'Computer Vision', 'Energy Systems', 'Space Tech'],
  researchInterests: [
    'Edge AI & Embedded ML',
    'Real-Time Inference',
    'Multimodal Learning',
    'Wind Energy & Climate',
    'Materials & Semiconductors',
    'Distributed Intelligent Systems',
  ],
  phone: '+91 9515339412',
  email: 'bantu.ryan@gmail.com',
  website: 'https://ryanbantu.com',
  linkedin: 'https://www.linkedin.com/in/ryan-bantu',
  github: 'https://github.com/RyanBantu',
  resume: '/docs/Ryan-Bantu-Resume.pdf',
}

export const heroStats = [
  { value: 1, prefix: '#', suffix: '', label: 'All-India Rank · Solar Decathlon' },
  { value: 1, suffix: '', label: 'Published patent application (IN)' },
  { value: 40, suffix: '+', label: 'Enterprise deployments' },
  { value: 99.8, suffix: '%', decimals: 1, label: 'LLM pipeline accuracy, cost-aware' },
]

/* ───────────── Thesis: why everything here exists ───────────── */

export const thesis = {
  statement:
    'AI’s next bottleneck isn’t model quality. It’s the cost of running it. Energy, heat, latency and bandwidth decide whether AI reaches a farm, an ambulance or a forest. I want to design the chips, algorithms and machines that let AI run locally, efficiently and sustainably.',
  pillars: [
    {
      key: 'silicon',
      title: 'Efficient silicon & hardware',
      body: 'Power and heat are mechanical problems before they are electrical ones. I bring thermal, structural and PCB design to the question of how AI accelerators should be built and cooled.',
      evidence: [
        { label: 'Patent: thermoelectric system, MCU-managed', href: '#vayu' },
        { label: '4-layer PCB design · Infopine', href: '#experience' },
        { label: 'Composites & thermal shielding · DRDO', href: '#experience' },
      ],
    },
    {
      key: 'algorithms',
      title: 'Efficient algorithms',
      body: 'Not every problem needs a bigger model. I pick the smallest method that is honest about the data, and spend compute only where it changes the answer.',
      evidence: [
        { label: 'Physics-informed wind forecast from 44 days of data', href: '#research' },
        { label: 'Cost-aware selective LLM regeneration · 99.8%', href: '#experience' },
      ],
    },
    {
      key: 'edge',
      title: 'AI at the edge & robots',
      body: 'The cheapest inference is the one that never leaves the device. I build systems that think locally on milliwatts and only transmit what matters.',
      evidence: [
        { label: 'RuggedLynx: on-device YOLO + Re-ID trail camera', href: '#deployments' },
        { label: 'IEEE: edge telemetry for ambulances', href: '#research' },
        { label: 'RFID edge nodes for workforce tracking', href: '#deployments' },
      ],
    },
    {
      key: 'climate',
      title: 'Climate & sustainability',
      body: 'Efficient AI is a climate problem. So is cooling a billion homes. I work on both: the energy that computing consumes and the energy people need.',
      evidence: [
        { label: 'VAYU: refrigerant-free cooling, national winner', href: '#vayu' },
        { label: 'Day-ahead wind power forecasting', href: '#research' },
      ],
    },
  ],
}

export const fieldPhotos = [
  {
    src: '/images/field-onsite.jpg',
    alt: 'Ryan on site with a client',
    caption: 'On site with a client',
  },
  {
    src: '/images/field-gantry-robot.jpg',
    alt: 'Stylus gantry robot built from aluminium extrusion, stepper motors and 3D-printed parts, positioned over a payment terminal',
    caption: 'Stylus gantry robot for automated touchscreen testing. Extrusion frame, NEMA 17 steppers, printed parts',
  },
]

export const fdeLoop = [
  { step: 'Embed', body: 'Go where the problem lives: a warehouse in Michigan, a clinic workflow, a hot room in Manipal.' },
  { step: 'Find the real constraint', body: 'Usually it’s power, heat, data quality or cost, rarely the thing first reported.' },
  { step: 'Build across the stack', body: 'Mechanical, electrical, firmware, ML, cloud. Whatever the constraint demands.' },
  { step: 'Deploy & measure', body: '64% operational efficiency at Windscapes. 99.8% accuracy at Manipal Dot Net. 4 °C cooler rooms.' },
]

export const patent = {
  title: 'A ceiling fan-mounted hybrid thermoelectric cooling and dehumidification system and a method thereof',
  applicationNo: '202541112613',
  publicationNo: 'IN202541112613 A1',
  filed: '17 Nov 2025',
  published: '10 Apr 2026',
  journal: 'Patent Journal No. 15/2026',
  applicant: 'Manipal Academy of Higher Education',
  ipc: 'H10F 77/63 · H01L 23/38 · F02M 35/06 · F25D 16/00 · H02J 9/02',
  abstract:
    'Combines a Peltier cooling module, a reusable desiccant dehumidifier and a phase-change-material heat sink in one retrofit unit. Runs at about 120 W and under 55 dB, needs no refrigerants or water, and cycles through active cooling, heat storage and desiccant regeneration under microcontroller control.',
  pdf: '/docs/vayu-patent-journal-IN202541112613.pdf',
  searchUrl: 'https://iprsearch.ipindia.gov.in/PublicSearch/',
}

export const ruggedlynx = {
  name: 'RuggedLynx',
  url: 'https://www.ruggedlynx.com',
  line: 'An autonomous trail camera that runs its intelligence on the device.',
  body: 'YOLO detection, similarity analysis and re-identification run on a Raspberry Pi inside the camera, so it sends researchers only the frames that matter over a SIM7600 4G link instead of streaming everything. The hardware is built around the same idea: a wake MCU that sleeps at 4 µA and a dual-element PIR with a 0.1 s trigger, giving about 6 months on standby from 8 AA cells.',
  specs: [
    { k: 'Sleep current', v: '4 µA' },
    { k: 'Standby', v: '~6 months' },
    { k: 'Trigger', v: '0.1 s PIR' },
    { k: 'Sensor', v: 'True 4K · 1/1.8″ BSI' },
    { k: 'Night', v: '24 × 940 nm IR' },
    { k: 'Housing', v: 'IP66' },
  ],
}

export const education = [
  { school: 'Manipal Institute of Technology', detail: 'B.Tech, Mechanical Engineering', years: '2021 – 2025' },
  { school: 'FIITJEE Junior College', detail: 'Intermediate (MPC)', years: '2019 – 2021' },
  { school: 'Kendriya Vidyalaya', detail: 'Secondary Education', years: '2009 – 2019' },
]

/* ───────────── Research ───────────── */

export const iotPaper = {
  title: 'IoT Framework for Real-Time Patient Monitoring in Emergency Transfers',
  status: 'Published · Presented',
  venue: 'SCPGCON 2026, IEEE Bangalore Section (AP-S / MTT-S / GRSS / Photonics)',
  where: 'Manipal Institute of Technology, Bengaluru · 2–4 Sept 2026',
  authors: 'Krrish Gulla, Vivan Jain, Ryan Bantu, Shweta Vincent, Vimal Krishnan',
  abstract:
    'An edge-based telemetry system that streams patient vitals out of a moving ambulance so the receiving hospital has clinical insight before the doors open. Sensor nodes push vitals through a low-latency edge pipeline that degrades gracefully when cellular links drop, and was evaluated under real network-latency and hardware constraints.',
  pipeline: ['Vitals sensors', 'Edge node', '4G uplink', 'Cloud broker', 'ER dashboard'],
  certificate: '/images/scpgcon-certificate.jpg',
  certificatePdf: '/docs/scpgcon-2026-certificate.pdf',
}

export const windPaper = {
  title: 'Day-Ahead, 15-Minute Wind Power Forecasting for a Research-Instrumented Small Wind Turbine',
  subtitle: 'Case study: the Chalmers 45 kW turbine, Björkö, Sweden',
  status: 'Manuscript · 2026',
  supervisor: 'Supervised by K. Victor Sam Moses Babu',
  url: 'https://windforecasting-project.vercel.app',
  question:
    'Can you forecast tomorrow’s power, every 15 minutes, for a turbine that has no continuous year of SCADA, only 44 scattered measurement days across 13 months?',
  steps: [
    {
      k: '01',
      title: 'Rejected the obvious model',
      body: 'An end-to-end weather→power network needs continuous history to learn temporal dynamics. 311 fifteen-minute points with multi-week gaps can’t support that, so I didn’t pretend it could.',
    },
    {
      k: '02',
      title: 'Learned the physics from 20 Hz data',
      body: 'Mined a 2.8 GB, 20 Hz SCADA record (filtered to controller state “Running”) into a monotonic PCHIP power curve over 0.5 m/s bins, with hundreds of thousands of samples per bin. Cut-in detected at 3.0 m/s, plateau 19.99 kW.',
    },
    {
      k: '03',
      title: 'Corrected the weather model',
      body: 'NWP under-forecast wind by 0.957 m/s. A model-output-statistics fit (obs = 0.930·fcst + 1.356) removed the bias; hourly SMHI / Open-Meteo forecasts were disaggregated to 15 min with a calibrated variability layer.',
    },
    {
      k: '04',
      title: 'Refused to fool myself',
      body: 'In-sample correction looked great, so I ran leave-one-day-out cross-validation over all 44 days, and cross-checked on the multi-year Kelmarsh wind-farm record. Out-of-sample barely moved.',
    },
  ],
  curve: [
    { ws: 3.0, p: 0 },
    { ws: 3.25, p: 3.47 },
    { ws: 4.25, p: 4.79 },
    { ws: 5.25, p: 7.98 },
    { ws: 6.25, p: 11.67 },
    { ws: 7.25, p: 15.31 },
    { ws: 8.25, p: 18.45 },
    { ws: 9.25, p: 19.97 },
    { ws: 10.25, p: 19.4 },
    { ws: 12.25, p: 18.59 },
    { ws: 13.75, p: 19.99 },
    { ws: 15, p: 19.99 },
  ],
  results: [
    { metric: 'Wind MAE (m/s)', raw: '1.289', lodo: '1.003' },
    { metric: 'Wind bias (m/s)', raw: '−0.957', lodo: '+0.009' },
    { metric: 'Power RMSE (kW)', raw: '5.776', lodo: '5.479' },
    { metric: 'Power nRMSE', raw: '0.289', lodo: '0.274' },
  ],
  insight:
    'The dominant residual error isn’t the wind forecast. It’s the nonlinear amplification of wind error through the steep ramp of the power curve.',
}

export const eegPaper = {
  title: 'EEG-Based Phoneme Extraction for Cerebral Palsy Communication',
  status: 'In progress',
  body: 'Deep models on the Caravan EEG dataset that extract phoneme-level representations, with noise-robust preprocessing and feature extraction toward interpretable thought-to-speech for people who cannot speak.',
  tags: ['EEG', 'Deep Learning', 'Assistive Tech', 'Signal Processing'],
}

/* ───────────── VAYU ───────────── */

export const vayu = {
  name: 'VAYU',
  expansion: 'Versatile Air Yielding Unit',
  alias: 'CBEC',
  url: 'https://cbec-ashen.vercel.app',
  role: 'Head Mechanical Engineer. Led structural & thermal engineering with CFD for Team Kalpana (MIT × MSAP)',
  patent: 'Patent application 202541112613 · published',
  chapters: [
    {
      tag: 'The problem',
      title: 'Hot, humid homes can’t afford an AC',
      body: 'Across India’s hot-humid belt, low- and middle-income households live under a ceiling fan that only moves hot, wet air around. An air-conditioner is out of reach, in price and in grid load.',
    },
    {
      tag: 'The idea',
      title: 'Don’t replace the fan. Upgrade it.',
      body: 'A donut-shaped retrofit that clips onto an existing ceiling fan, pairing Peltier thermoelectric cooling with desiccant dehumidification: “Integrating Hybrid Desiccant-Peltier Air Cooler with Ceiling Fan.”',
    },
    {
      tag: 'The engineering',
      title: 'Simulate, optimise, then build',
      body: 'I led structural and thermal engineering: ANSYS Fluent CFD to shape airflow through the ring, Altair OptiStruct topology and modal analysis so a rotating fan could carry the load, and a 3D-printed body tuned for mass and stiffness.',
    },
    {
      tag: 'The proof',
      title: 'Tested in real homes',
      body: 'Controlled testing in real residential settings showed a 4 °C drop in ambient temperature, lower humidity and substantial energy savings versus conventional AC, and 67.6% more efficient than a fan alone.',
    },
    {
      tag: 'The verdict',
      title: 'All-India Rank 1',
      body: 'First prize, Residential Cooling Retrofit division, Solar Decathlon India 2024–25, against 2,100+ students from 150+ institutions. Then Runner-Up at the Forbes Marshall Outstanding Project Award 2025.',
    },
    {
      tag: 'The market',
      title: 'From prototype to product',
      body: 'Patent application published (IN202541112613 A1). 10 units sold, 20+ pre-orders, ₹3,000 early-bird price. A climate device priced for the people who need it.',
    },
  ],
  stats: [
    { value: 4, suffix: '°C', label: 'Room temperature drop' },
    { value: 67.6, suffix: '%', decimals: 1, label: 'More efficient than a fan' },
    { value: 10, suffix: '', label: 'Units sold' },
    { value: 20, suffix: '+', label: 'Pre-orders' },
  ],
  photos: [
    { src: '/images/vayu-render.jpg', alt: 'Render of the VAYU retrofit unit mounted on a ceiling fan' },
    { src: '/images/solar-decathlon-winner-screen.png', alt: 'Solar Decathlon India winner screen for Team Kalpana' },
    { src: '/images/teaching-infosys-vayu.png', alt: 'Ryan presenting VAYU at Infosys' },
    { src: '/images/solar-decathlon-plaque.png', alt: 'Solar Decathlon India winner plaque, Residential Cooling Retrofit 2024–25' },
  ],
}

export const press = [
  { outlet: 'Manipal.edu', title: 'Celebrating innovation: MSAP’s Team Kalpana wins SDI 2025', url: 'https://www.manipal.edu/news-and-events/news/celebrating-innovation-msap-s-team-kalpana-wins-sdi-2025', topic: 'sdi' },
  { outlet: 'Deccan Herald', title: 'Six student teams win Solar Decathlon contest', url: 'https://www.deccanherald.com/india/karnataka/bengaluru/six-student-teams-win-solar-decathlon-contest-3563574', topic: 'sdi' },
  { outlet: 'Construction World', title: 'Student teams shine at India’s net-zero design challenge', url: 'https://www.constructionworld.in/policy-updates-and-economic-news/student-teams-shine-at-india---s-net-zero-design-challenge/74154', topic: 'sdi' },
  { outlet: 'Passionate in Marketing', title: 'Winners of Solar Decathlon India 2024–25 announced', url: 'https://www.passionateinmarketing.com/winners-of-the-solar-decathlon-india-sdi-2024-25-challenge-announced/', topic: 'sdi' },
  { outlet: 'The CSR Universe', title: 'Breaking the carbon ceiling: SDI’s mission for climate-ready professionals', url: 'https://thecsruniverse.com/articles/breaking-the-carbon-ceiling-solar-decathlon-india-s-mission-to-create-10-climate-ready-professionals-by-2030', topic: 'sdi' },
  { outlet: 'The Wire', title: 'Alumnus Bikram Singh Bedi felicitates young entrepreneurs at MAHE', url: 'https://thewire.in/ptiprnews/alumnus-bikram-singh-bedi-felicitates-young-entrepreneurs-at-mahe-33rd-convocation', topic: 'goperch' },
  { outlet: 'Newsvoir', title: 'MAHE 33rd Convocation: startup founders felicitated', url: 'https://www.newsvoir.com/release/alumnus-bikram-singh-bedi-felicitates-young-entrepreneurs-at-mahe-33rd-convocation-33919.html', topic: 'goperch' },
  { outlet: 'LinkedIn · Director, MIT', title: '#TeamKalpana: MIT Manipal congratulates the winners', url: 'https://www.linkedin.com/posts/director-mit-manipal-76295721b_teamkalpana-mitmanipal-mahe-share-7335959395781984256-AJEE/', topic: 'sdi' },
]

/* ───────────── GoPerch ───────────── */

export const goperch = {
  title: 'GoPerch Innovations Pvt Ltd, Founder & CEO',
  url: 'https://www.goperch.in',
  period: '2021 – Present',
  tagline: 'One platform. Every department. Zero duct tape.',
  pitch:
    'I started GoPerch as a student with one belief: most businesses don’t need more software, they need their software to talk. Today it’s an ERP + CRM operating system (inventory, warehouse, time-clock, payroll, finance and CRM in one database) that speaks natively to the barcode scanners, label printers and RFID readers already on the floor.',
  bullets: [
    'Lead architect and business head. “Idea-to-Action” delivery for 40+ enterprise clients; mentor a team of 8 engineers.',
    'Edge-AI wildlife monitoring (ruggedlynx.com): autonomous trail cameras running YOLO detection + Re-ID on Raspberry Pi, with SIM7600 4G uplink to researchers worldwide.',
    'CRM for gaming centres: 42 installations in 6 months. Compliance platforms automating regulatory reporting for 15+ SMBs.',
    'Geo-fenced, geo-tagged smart-parking reservation system for the Manipal campus.',
  ],
  modules: [
    { n: '01', name: 'Inventory & Warehouse', desc: 'Real-time stock, bins, zones, native OEM scanners' },
    { n: '02', name: 'Time & Workforce', desc: 'Phone, kiosk or RFID badge clock-in → payroll' },
    { n: '03', name: 'Finance & Accounts', desc: 'POs, invoices, payments integration' },
    { n: '04', name: 'CRM & Employees', desc: 'Lead-to-cash in the same login' },
  ],
  stats: [
    { value: 40, suffix: '+', label: 'Enterprise clients' },
    { value: 42, suffix: '', label: 'CRM installs in 6 months' },
    { value: 15, suffix: '+', label: 'SMBs on compliance platforms' },
    { value: 8, suffix: '', label: 'Engineers mentored' },
  ],
  award: {
    text: 'Selected as one of the felicitated startup founders of 2025 by the MAHE Innovation Centre, awarded at MAHE’s 33rd Convocation by Bikram Singh Bedi (VP, Google Cloud APAC).',
    photos: [
      { src: '/images/award-felicitation-ceremony.jpeg', alt: "Ryan receiving the Start-Up Founder's Felicitation award, 2025" },
      { src: '/images/award-certificate-excellence.png', alt: 'Certificate of Excellence from MAHE Innovation Centre' },
    ],
  },
}

/* ───────────── Experience ───────────── */

type ExperienceEntry = {
  company: string
  location: string
  role: string
  period: string
  kind: 'AI' | 'Hardware' | 'Full-stack' | 'Aerospace'
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Windscapes Landscaping',
    location: 'Michigan, USA',
    role: 'Forward Deployed Engineer',
    period: '03/2026 – Present',
    kind: 'AI',
    bullets: [
      'Architecting an enterprise inventory platform that lifted operational efficiency 64%. Flutter admin & employee apps, FastAPI + React on AWS.',
      'Edge RFID modules on Raspberry Pi + Arduino for real-time workforce tracking and automated payroll.',
    ],
  },
  {
    company: 'Manipal Dot Net',
    location: 'Manipal, India',
    role: 'AI Systems Intern',
    period: '11/2025 – 03/2026',
    kind: 'AI',
    bullets: [
      'Clinical-workflow LLM platforms: Claude on AWS Bedrock + fine-tuned open-weight models (Llama 3.2, Qwen, II-Medical-8B).',
      'Cost-aware selective-regeneration pipelines with evaluation frameworks and retry/fallback logic took medical checklist accuracy to 99.8%.',
    ],
  },
  {
    company: 'Infopine',
    location: 'India',
    role: 'PCB & ERP Intern',
    period: '06/2025 – 08/2025',
    kind: 'Hardware',
    bullets: [
      'Designed 4-layer PCBs and tightened fabrication/assembly workflows.',
      'AI-powered ERP/CRM for textile clients (35% sales growth); onboarded US clients generating $350k revenue.',
    ],
  },
  {
    company: 'Sequoia Imports & Exports',
    location: 'India',
    role: 'Full-Stack Engineer Intern',
    period: '08/2024 – 12/2024',
    kind: 'Full-stack',
    bullets: ['MERN platform with SendGrid automation and LLaMA-powered agentic chatbots.'],
  },
  {
    company: 'DRDO, ASL / CPDC',
    location: 'India',
    role: 'Composite & Structural Engineering Intern (AGNI, VEDA)',
    period: '05/2024 – 08/2024',
    kind: 'Aerospace',
    bullets: [
      'Carbon-fibre composite components for missile and rocket systems: −23% weight, +17% thermal resistance, +11% load capacity.',
      'Structural validation testing: +37% structural integrity, +17% thermal shielding efficiency under extreme conditions.',
    ],
  },
]

/* ───────────── Projects ───────────── */

export type ProjectBuild = {
  name: string
  desc: string
  url?: string
  tag: string
  stack: string[]
}

export const projects: ProjectBuild[] = [
  {
    name: 'Cardilyn',
    tag: 'Health · Mobile',
    desc: 'Family health companion. Native SwiftUI + Kotlin apps on Firebase: medication reminders, vitals, HealthKit / Health Connect sync, doctor sharing, PDF reports.',
    url: 'https://cardilyn.com',
    stack: ['SwiftUI', 'Kotlin', 'Firebase', 'HealthKit'],
  },
  {
    name: 'Unearth',
    tag: 'Maps · Social',
    desc: 'A map of little-known public places with no ratings, ads or ranking. A place earns trust only when others independently find it.',
    stack: ['SwiftUI', 'Compose', 'Fastify', 'PostgreSQL'],
  },
  {
    name: 'farmXPdition',
    tag: 'Game · Productivity',
    desc: 'Co-built a cross-platform 2D pixel-art RPG that turns real productivity into progress. Projects become village doors, tasks become quests, and finishing real work earns XP and gold that grow a farming world. Built in C#/.NET 8 and Godot 4 on a local-first SQLite core with 280+ automated tests and Windows/macOS CI, shipped as a signed, notarized Mac release with in-app update notices and a React download site.',
    url: 'https://site-gamma-nine-54.vercel.app',
    stack: ['Godot 4', 'C# .NET 8', 'SQLite', 'CI'],
  },
  {
    name: 'RuggedLynx',
    tag: 'Edge AI · Wildlife',
    desc: 'Autonomous trail cameras: YOLO detection, similarity analysis and Re-ID on a Raspberry Pi, beaming finds over 4G to researchers.',
    url: 'https://ruggedlynx.com',
    stack: ['YOLO', 'Re-ID', 'Raspberry Pi', 'SIM7600'],
  },
  {
    name: 'SYPE',
    tag: 'Assistive Tech',
    desc: 'Communication tool for non-verbal autistic children, with structured daily interaction flows for kids and caregivers.',
    url: 'https://sype.vercel.app',
    stack: ['React', 'Accessibility'],
  },
  {
    name: 'Titanic from scratch',
    tag: 'ML · Fundamentals',
    desc: 'Random Forest implemented from Stanford CS229 (Andrew Ng) math and trained on Kaggle passenger data.',
    stack: ['Python', 'Random Forests', 'CS229'],
  },
]

/* ───────────── Letters ───────────── */

export const letters = [
  {
    name: 'Cdr. (Dr.) Anil Rana',
    role: 'Director, Manipal Institute of Technology',
    org: 'Manipal Academy of Higher Education',
    date: '25 March 2026',
    quote:
      'I strongly believe he is exceptionally well-prepared for graduate study at a reputed institution.',
    excerpt: [
      'Ryan distinguishes himself through his ability to translate engineering concepts into impactful, real-world solutions. He was a core contributor to Team Kalpana, an interdisciplinary collaboration between MIT and the Manipal School of Architecture and Planning (MSAP).',
      'Beyond academics, Ryan has demonstrated a strong entrepreneurial mindset… his efforts were recognized when he was selected as one of the five felicitated startup founders of 2025.',
      'Ryan’s strengths lie in his interdisciplinary thinking, leadership, and commitment to innovation. I am confident that he will thrive in a rigorous academic environment. I strongly recommend him without reservation.',
    ],
    image: '/images/lor-mit-director-anil-rana.jpg',
    pdf: '/docs/lor-mit-director-anil-rana.pdf',
  },
  {
    name: 'Prasad Vaidya',
    role: 'Director, Solar Decathlon India',
    org: 'IUSSTF · IIHS · AEEE',
    date: '10 April 2026',
    quote:
      'The project demonstrated a strong combination of engineering rigor, user-centric design, and sustainability thinking.',
    excerpt: [
      'During the competition, Ryan played a key role in the development of the team’s innovative solution, VAYU, a retrofit cooling device designed for hot and humid climates.',
      'Ryan contributed significantly to the technical development and testing of the prototype, which integrated thermoelectric cooling with desiccant-based dehumidification.',
      'Ryan is a motivated and capable individual with a solid foundation in engineering design and a clear commitment to developing practical, climate-responsive solutions.',
    ],
    image: '/images/lor-solar-decathlon-prasad-vaidya.jpg',
    pdf: '/docs/lor-solar-decathlon-prasad-vaidya.pdf',
  },
]

/* ───────────── Honors, teaching, skills ───────────── */

export const honors = [
  { year: '2025', title: 'National Winner, Solar Decathlon India 2024–25', detail: 'All-India Rank 1, Residential Cooling Retrofit division (VAYU).' },
  { year: '2026', title: 'Patent application 202541112613 published', detail: 'Hybrid thermoelectric cooling & dehumidification system (VAYU), Patent Journal 15/2026.' },
  { year: '2025', title: 'Start-Up Founder’s Felicitation, MAHE', detail: 'One of the felicitated founders of 2025, for GoPerch Innovations.' },
  { year: '2025', title: 'Forbes Marshall Outstanding Project Award', detail: 'Runner-Up for work advancing energy and sustainability.' },
  { year: '2026', title: 'IEEE SCPGCON 2026: paper presented', detail: 'IoT framework for real-time patient monitoring in emergency transfers.' },
]

export const teaching = [
  {
    title: 'Guest Lecturer, Infosys Bangalore',
    body: 'Faculty development programme with IIHS & Solar Decathlon India: innovation, sustainability and engineered solutions like VAYU; a technical session on modal analysis in Altair OptiStruct.',
    photos: [
      { src: '/images/teaching-infosys-modal.png', alt: 'Ryan presenting modal analysis at Infosys' },
    ],
  },
  {
    title: 'Math & Physics Instructor, BOC Society',
    body: 'Foundation teaching for SAT, JEE and Olympiad aspirants; community teaching in Rajpet.',
    photos: [{ src: '/images/teaching-volunteering.png', alt: 'Community teaching session in Rajpet' }],
  },
  {
    title: 'Python & Math Workshops, Manipal',
    body: 'Hands-on introductory Python workshops for 50+ school students and faculty.',
    photos: [
      { src: '/images/teaching-manipal-workshop.png', alt: 'Python workshop for students in Manipal' },
      { src: '/images/teaching-manipal-group.png', alt: 'Group photo with students in Manipal' },
    ],
  },
  {
    title: 'Technical Leadership',
    body: 'Organised TechTatva (30+ events), IEEE / ASME board member, raised ₹30,000+. Built a community-management app for Hope Center in Flutter + React.',
    photos: [{ src: '/images/hero-intro.png', alt: 'Ryan at the sound desk during a campus event' }],
  },
]

export const skillGroups = [
  { title: 'AI / ML', icon: 'brain', items: ['Claude · Bedrock', 'Llama 3.2 · Qwen', 'SFT & evals', 'YOLO · Re-ID', 'Random Forests', 'EEG processing', 'MOS / NWP'] },
  { title: 'Embedded & IoT', icon: 'chip', items: ['Raspberry Pi', 'Arduino', 'RFID', 'SIM7600 4G', 'Sensor fusion', 'Real-time telemetry'] },
  { title: 'Electronics', icon: 'pcb', items: ['KiCad', 'Altium', 'Multi-layer PCB', 'Fab & assembly'] },
  { title: 'Mechanical & Sim', icon: 'gear', items: ['ANSYS Fluent CFD', 'Altair OptiStruct', 'HyperMesh', 'SolidWorks', 'CATIA V5', 'Fusion 360', 'Composites'] },
  { title: 'Software', icon: 'code', items: ['Python', 'C / C++ / C#', 'TypeScript', 'Swift · Kotlin', 'React · Next.js', 'FastAPI · Fastify', 'Godot 4', 'MATLAB'] },
  { title: 'Cloud & Data', icon: 'cloud', items: ['AWS (Bedrock, S3, EC2)', 'PostgreSQL', 'MongoDB', 'Firebase · Supabase', 'CI/CD', 'Docker'] },
]
