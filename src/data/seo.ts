import { education, goperch, profile } from './resume'

export const siteUrl = 'https://ryanbantu.com'

export const seo = {
  siteUrl,
  title: 'Ryan Bantu · Founder, Engineer · Robotics & Edge AI',
  description:
    'Ryan Elisha Bantu — Founder of GoPerch Innovations building robotics, embedded systems, and computer vision. Edge AI on Raspberry Pi to AWS Bedrock LLM orchestration; 40+ enterprise deployments; Solar Decathlon India national winner; Project VAYU patent holder.',
  keywords: [
    'Ryan Bantu',
    'Ryan Elisha Bantu',
    'GoPerch Innovations',
    'robotics engineer',
    'embedded systems engineer',
    'computer vision',
    'edge AI',
    'autonomous systems',
    'YOLO object detection',
    'Raspberry Pi',
    'AWS Bedrock',
    'FastAPI',
    'wildlife monitoring',
    'clinical AI',
    'Manipal Institute of Technology',
    'Solar Decathlon India',
    'Project VAYU',
    'DRDO internship',
    ...profile.focusAreas,
    ...profile.researchInterests,
  ].join(', '),
  author: profile.fullName,
  locale: 'en_US',
  language: 'en',
  ogImage: `${siteUrl}/images/hero-intro.png`,
  ogImageAlt: `${profile.name} — portfolio showcasing robotics, embedded systems, and computer vision work`,
  themeColor: '#030303',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function externalProfiles(): string[] {
  return [profile.linkedin, profile.github, profile.website].filter(
    (url) => !/(linkedin\.com\/?$|github\.com\/?$)/.test(url),
  )
}

export function buildJsonLd() {
  const alumni = education[0]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: profile.name,
        description: profile.headline,
        inLanguage: 'en-US',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: profile.fullName,
        alternateName: profile.name,
        url: siteUrl,
        email: profile.email,
        telephone: profile.phone,
        jobTitle: profile.roles,
        description: profile.summary,
        knowsAbout: [...profile.focusAreas, ...profile.researchInterests],
        ...(externalProfiles().length > 0 ? { sameAs: externalProfiles() } : {}),
        worksFor: {
          '@type': 'Organization',
          name: 'GoPerch Innovations Pvt Ltd',
          description: goperch.title,
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: alumni.school,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'GoPerch Innovations Pvt Ltd',
        founder: { '@id': `${siteUrl}/#person` },
        description: goperch.bullets[0],
        url: siteUrl,
      },
    ],
  }
}

export function buildSeoHeadHtml(): string {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c')

  return `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
    <meta name="author" content="${escapeHtml(seo.author)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="googlebot" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="${seo.themeColor}" />
    <link rel="canonical" href="${siteUrl}/" />
    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="${escapeHtml(profile.name)}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:locale" content="${seo.locale}" />
    <meta property="og:image" content="${seo.ogImage}" />
    <meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />
    <meta property="profile:first_name" content="Ryan" />
    <meta property="profile:last_name" content="Bantu" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${seo.ogImage}" />
    <meta name="twitter:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />
    <script type="application/ld+json">${jsonLd}</script>
  `.trim()
}
