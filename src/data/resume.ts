export const profile = {
  name: 'Ryan Elisha Bantu',
  roles: ['AI Systems Engineer', 'LLM Systems Engineer', 'Full-Stack Engineer'],
  headline:
    'AI & Systems Architect — research-driven problem solver specializing in embedded AI and intelligent systems.',
  summary:
    'Designed and experimentally validated Edge AI pipelines (YOLO-based Re-ID) for real-world, resource-constrained environments. Proven ability to translate research into scalable, production-grade deployments across 40+ enterprise environments. Experienced in cloud-native system design (AWS Bedrock) and scalable ML infrastructure.',
  researchInterests: [
    'Edge AI',
    'Embedded ML Systems',
    'Real-Time Inference',
    'Multimodal Learning',
    'Distributed Intelligent Systems',
  ],
  phone: '+91 9515339412',
  email: 'bantu.ryan@gmail.com',
  website: 'https://ryanbantu.com',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',
}

export const education = [
  {
    school: 'Manipal Institute of Technology',
    detail: 'B.Tech in Mechanical Engineering',
    years: '2021 – 2025',
  },
  {
    school: 'FIITJEE Junior College',
    detail: 'Intermediate Education (MPC)',
    years: '2019 – 2021',
  },
  {
    school: 'Kendriya Vidyalaya',
    detail: 'Secondary Education',
    years: '2009 – 2019',
  },
]

export const skillGroups = [
  {
    title: 'AI & Machine Learning',
    items:
      'Anthropic Claude, Llama 3.2, Qwen, YOLO (CNN), Object Detection, Re-identification (Re-ID), SFT, Prompt Engineering, Evaluation Frameworks, Random Forests, EEG Signal Processing',
  },
  {
    title: 'Cloud & Backend',
    items:
      'AWS Bedrock (Orchestration), AWS S3, PostgreSQL, MongoDB, Firebase, FastAPI, REST APIs, Node.js',
  },
  {
    title: 'IoT & Robotics',
    items:
      'Raspberry Pi, Arduino, RFID Systems, SIM7600 Modules, Sensor Fusion, Real-time Workforce Tracking',
  },
  {
    title: 'Languages & Frameworks',
    items:
      'Python, C++, JavaScript, TypeScript, MATLAB, Dart (Flutter), React.js, Next.js, MERN Stack',
  },
  {
    title: 'Core Engineering',
    items:
      'CAD, Fusion 360, Altium, Solidworks, Hypermesh, Ansys (CFD/Fluent), Catia V5',
  },
]

export const entrepreneurAward = {
  statement:
    "Felicitated for being one of the best entrepreneurs — MAHE Innovation Centre, Startup Founder's Felicitation Ceremony 2025; Certificate of Excellence for founding GoPerch Innovations (P) Ltd.",
  photos: [
    {
      src: '/images/award-felicitation-ceremony.png',
      alt: "Ryan Bantu receiving an award at MAHE Startup Founder's Felicitation Ceremony 2025",
    },
    {
      src: '/images/award-certificate-excellence.png',
      alt: 'Certificate of Excellence from MAHE Innovation Centre for founding GoPerch Innovations',
    },
  ],
}

export const solarDecathlonAchievement = {
  text: 'National Winner Solar Decathlon India 2024–25: 1st place nationally for a climate-tech solution, outperforming 500+ participants from premier institutions.',
  photos: [
    {
      src: '/images/solar-decathlon-team-stage.png',
      alt: 'Team Kalpana on stage with Solar Decathlon India award and logo',
    },
    {
      src: '/images/solar-decathlon-winner-screen.png',
      alt: 'Solar Decathlon India winner screen for Team Kalpana',
    },
    {
      src: '/images/solar-decathlon-plaque.png',
      alt: 'Solar Decathlon India winner plaque — Residential Cooling Retrofit Division 2024–25',
    },
  ],
}

export const achievements = [
  'Patent Holder Project VAYU: Provisional Patent No. 202541112613 — retrofitting cooling device reducing ambient temperatures by 4°C.',
  'Forbes Marshall Award: Runner-up for excellence in academic projects advancing energy and sustainability.',
]

export const researchItems = [
  {
    title: 'EEG-Based Phoneme Extraction for Cerebral Palsy Communication',
    body:
      'Designed and trained deep learning models on EEG signals (Caravan Dataset) for phoneme-level representations. Signal preprocessing, feature extraction, and evaluation under noise — enabling interpretable mappings for thought-to-speech synthesis. Paper under review.',
  },
  {
    title: 'Edge-Computing Telemetry System for Emergency Care',
    body:
      'Real-time edge telemetry for ambulance diagnostics: low-latency vitals pipelines, performance under network latency and hardware constraints for pre-arrival clinical insights. Paper under review.',
  },
]

/** Shown only under the Guest Lecturer — Infosys bullet */
export const guestLecturePhotos: { src: string; caption: string; alt: string }[] = [
  {
    src: '/images/teaching-infosys-vayu.png',
    caption: 'Innovation lecture — Project VAYU (faculty program: IIHS & Solar Decathlon India)',
    alt: 'Ryan presenting Project VAYU at an Infosys faculty development session',
  },
  {
    src: '/images/teaching-infosys-modal.png',
    caption: 'Faculty development — technical session (modal analysis, Altair OptiStruct)',
    alt: 'Ryan presenting engineering simulation at Infosys faculty development',
  },
]

/** Shown under the BOC / community teaching bullet */
export const communityTeachingPhoto = {
  src: '/images/teaching-volunteering.png',
  caption: 'Rajpet — community teaching and outreach',
  alt: 'Ryan with students during a community teaching session in Rajpet',
}

export const manipalWorkshopPhotos: { src: string; caption: string; alt: string }[] = [
  {
    src: '/images/teaching-manipal-group.png',
    caption: 'Manipal — group session with students after workshops',
    alt: 'Ryan with school students and teachers in a classroom in Manipal',
  },
  {
    src: '/images/teaching-manipal-workshop.png',
    caption: 'Manipal — introductory Python and math workshop',
    alt: 'Ryan leading an introductory Python and math workshop for students in Manipal',
  },
]

export const teaching = [
  'Guest Lecturer — Infosys, Bangalore: Delivered a lecture on innovation for a faculty development program hosted with IIHS and Solar Decathlon India — covering sustainability, engineered solutions (e.g. Project VAYU), and structured approaches in technology-driven environments.',
  'BOC Society Math & Physics Instructor: Foundation teaching for high schoolers (SAT, JEE, Olympiads); introductory Python workshops for 50+ students.',
  'Introductory Python and math workshops at a school in Manipal — hands-on sessions with students and faculty.',
  'Technical Leadership: Organized “Tech Tatva” (30+ college fest); IEEE/ASME Board Member; raised 30k+ INR.',
  'Hope Center: Custom community management app with Flutter and React.js to streamline operations.',
]

export const goperch = {
  title: 'GoPerch Innovations Pvt Ltd — Founder & CEO',
  period: '2021 – Present',
  bullets: [
    'Lead technical architect and business head — end-to-end “Idea-to-Action” product development; scaled from concept to deployment across 40+ enterprise clients.',
    'Edge AI Wildlife Monitoring: Autonomous trail cameras with YOLO (CNNs); Similarity Analysis & Re-ID on Raspberry Pi; SIM7600 for remote transmission to researchers.',
    'ERP & CRM: Industry-specific software — custom ERP for multi-site landscaping; high-performance CRM for gaming centers (42 installations in 6 months).',
    'Compliance & Smart Infrastructure: Inventory compliance for 15+ SMBs; geo-fencing & geo-tagging parking system for Manipal campus.',
    'Leadership: Mentored a team of 8 engineers across architecture, product strategy, and full-stack execution.',
  ],
}

export const projects = [
  {
    name: 'SYPE (Social Impact)',
    url: 'https://sype.vercel.app',
    desc: 'React-based communication tool for autistic mute children — 4 active users for daily interaction.',
  },
  {
    name: 'MIT Manipal Smart Parking',
    desc: 'Geo-fencing and geo-tagging app for verified spot reservations and real-time parking flow.',
  },
  {
    name: 'Project VAYU (Hardware/CFD)',
    desc: 'Award-winning cooling device; ANSYS Fluent & Altair OptiStruct; 10 units sold, 20+ pre-orders.',
  },
  {
    name: 'Titanic Survival Prediction',
    desc: 'Random Forests; algorithm math from Stanford CS229; Kaggle-derived dataset.',
  },
]

export const experience = [
  {
    company: 'Windscapes Landscaping',
    location: 'MI, USA',
    role: 'AI Engineer',
    period: '03/2026 – Present',
    bullets: [
      'Enterprise inventory platform — 64% efficiency gain; IoT Flutter apps (Admin & Employee), FastAPI, React, AWS; edge RFID (Raspberry Pi & Arduino) for workforce tracking and automated payroll.',
    ],
  },
  {
    company: 'Manipal Dot Net Pvt Ltd',
    role: 'Internship',
    period: '11/2025 – 03/2026',
    bullets: [
      'Clinical workflow platforms: Anthropic Claude (AWS Bedrock), Llama 3.2, Qwen, II-Medical-8B for automated checklists and diagnostics.',
      'FastAPI + MongoDB backends; responsive React frontends for complex clinical workflows.',
      'Cost-aware selective regeneration pipelines — 85% spec adherence; evaluation frameworks; medical checklist accuracy to 99.8%.',
      'AWS infrastructure: Bedrock APIs and production services.',
    ],
  },
  {
    company: 'Infopine',
    role: 'Internship',
    period: '06/2025 – 08/2025',
    bullets: [
      'PCB engineering & ERP: 4-layer PCBs, fabrication/assembly workflows, inventory modules — 35% sales growth.',
      'AI-powered ERP/CRM for textiles; automation, planning, forecasting; AI market research.',
      'Client onboarding (India + Zeeland & Holland, MI): $350k revenue; Next.js, MongoDB, JavaScript, Python.',
    ],
  },
  {
    company: 'Sequoia Imports and Exports',
    role: 'Full-stack Engineer Intern',
    period: '08/2024 – 12/2024',
    bullets: [
      'MERN business site; SendGrid; agentic chatbots (LLaMA + Python) for turmeric import/export.',
    ],
  },
  {
    company: 'DRDO (Defence Research and Development Organisation)',
    role: 'Internship — ASL / CPDC Composite and Structural Engineer (AGNI & VEDA)',
    period: '05/2024 – 08/2024',
    bullets: [
      'Carbon-fiber composite components for missile/rocket systems: 23% weight reduction, 17% thermal resistance, 11% higher load capacity.',
      'Structural validation (2 analyses): 37% structural integrity, 17% thermal shielding efficiency under extreme conditions.',
    ],
  },
]
