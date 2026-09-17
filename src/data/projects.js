// Single source of truth for project data.
// `currentWork` feeds the "Currently building" strip on the home page,
// `projects` feeds the portfolio mosaic. Keep both in sync with the CV.
//
// The copy here is English. Arabic and Urdu live in src/i18n/locales and are
// overlaid by id through `localizedCurrentWork()` / `localizedProjects()`,
// which is what the views should read.

import { t, overlay } from '../i18n/index.js'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'

// `dark: true` marks logos drawn in black or near-black. They vanish on the
// dark theme, so the portfolio inverts them there (see .icon-dark).
const icon = (name, path, dark = false) => ({ name, src: DEVICON + path, dark })

export const ICONS = {
  typescript: icon('TypeScript', 'typescript/typescript-original.svg'),
  javascript: icon('JavaScript', 'javascript/javascript-original.svg'),
  react: icon('React', 'react/react-original.svg'),
  reactNative: icon('React Native', 'react/react-original.svg'),
  nextjs: icon('Next.js', 'nextjs/nextjs-original.svg', true),
  nodejs: icon('Node.js', 'nodejs/nodejs-original.svg'),
  express: icon('Express', 'express/express-original.svg', true),
  nestjs: icon('NestJS', 'nestjs/nestjs-original.svg'),
  trpc: icon('tRPC', 'trpc/trpc-original.svg'),
  django: icon('Django', 'django/django-plain.svg', true),
  flask: icon('Flask', 'flask/flask-original.svg', true),
  python: icon('Python', 'python/python-original.svg'),
  postgresql: icon('PostgreSQL', 'postgresql/postgresql-original.svg'),
  prisma: icon('Prisma', 'prisma/prisma-original.svg', true),
  redis: icon('Redis', 'redis/redis-original.svg'),
  mongodb: icon('MongoDB', 'mongodb/mongodb-original.svg'),
  firebase: icon('Firebase', 'firebase/firebase-plain.svg'),
  socketio: icon('Socket.IO', 'socketio/socketio-original.svg', true),
  threejs: icon('Three.js', 'threejs/threejs-original.svg', true),
  tailwind: icon('Tailwind CSS', 'tailwindcss/tailwindcss-original.svg'),
  vite: icon('Vite', 'vitejs/vitejs-original.svg'),
  vercel: icon('Vercel', 'vercel/vercel-original.svg', true),
  html: icon('HTML5', 'html5/html5-original.svg'),
  css: icon('CSS3', 'css3/css3-original.svg'),
  aws: icon('AWS', 'amazonwebservices/amazonwebservices-original-wordmark.svg')
}

// Labels come from the locale files (`status.*`), see `statusOf()`.
export const STATUS = {
  live: { color: '#22c55e' },
  testing: { color: '#f59e0b' },
  prelaunch: { color: '#38bdf8' },
  soon: { color: '#a78bfa' },
  shipped: { color: '#9ca3af' }
}

// Status colour plus its label in the current language.
export function statusOf(item) {
  const key = STATUS[item.status] ? item.status : 'shipped'
  return { key, color: STATUS[key].color, label: t('status.' + key) }
}

// Organisation keys; labels are `orgs.*` / `filters.*` in the locale files.
export const ORG_KEYS = ['otaishan', 'freelance', 'marsbpo', 'personal']
export const FILTER_KEYS = ['all', ...ORG_KEYS]

// The two platforms currently in flight at Otaishan Investments.
// `phase` is the index into `phases` of the stage in progress right now.
export const currentWork = [
  {
    id: 'mrafqk',
    name: 'Mrafqk',
    tagline: 'Medical Companion Booking Platform',
    short: 'Medical companion booking',
    orgKey: 'otaishan',
    image: '/images/projects/mrafqk.jpg',
    icon: '/images/projects/mrafqk-icon.svg',
    color: '#0d5856',
    status: 'testing',
    statusNote: 'In internal testing. Google Play release is next.',
    phases: ['Design', 'Build', 'Internal testing', 'Play Store'],
    phase: 2,
    website: 'https://mrafqk.com',
    websiteLabel: 'mrafqk.com',
    description:
      'Book licensed, credential-verified nurses as non-clinical companions for hospital visits, dialysis support, treatments and elderly care across Saudi Arabia.',
    highlights: [
      'Built end-to-end: React Native (Expo) app, type-safe tRPC + Express backend, PostgreSQL data layer, Next.js admin platform and marketing site.',
      'Real-time bidding and chat over WebSockets with Redis pub/sub, matching users live with verified medical companions.',
      'Booking, payment and companion payout workflows covering the full request-to-settlement lifecycle, secured with MFA and role-based access.'
    ],
    stack: ['TypeScript', 'React Native (Expo)', 'Next.js', 'Node.js / Express', 'tRPC', 'PostgreSQL', 'Redis', 'WebSockets']
  },
  {
    id: 'bahhr',
    name: 'BAHHR',
    tagline: 'Vehicle & Adventure Rental Marketplace',
    short: 'Adventure rental marketplace',
    orgKey: 'otaishan',
    image: '/images/projects/bahhr-cover.svg',
    icon: '/images/projects/bahhr-icon.svg',
    color: '#023047',
    status: 'prelaunch',
    statusNote: 'Pre-launch security and reliability review underway.',
    phases: ['Design', 'Build', 'Security review', 'Launch'],
    phase: 2,
    website: 'https://www.bahhr.net',
    websiteLabel: 'bahhr.net',
    description:
      'A peer-to-peer marketplace for renting boats, jet skis, ATVs, buggies and motorcycles by the hour or the day, from the Saudi coast to the desert.',
    highlights: [
      'Multi-category rental marketplace connecting vendors and customers across listings, bookings and fulfilment.',
      'Booking engine with availability management and overlap validation, so no asset is ever double-booked across concurrent reservations.',
      'Real-time chat and notifications via Socket.IO, JWT + OTP authentication with RBAC, and full English/Arabic RTL support on Vercel with GitHub Actions CI.'
    ],
    stack: ['React Native (Expo)', 'NestJS', 'PostgreSQL', 'Prisma', 'Next.js', 'Socket.IO', 'TypeScript', 'Tailwind CSS']
  }
]

const work = Object.fromEntries(currentWork.map((p) => [p.id, p]))

// The in-flight builds carry their progress and highlights into the mosaic's
// hero tiles and the detail sheet.
const featured = (id) => ({
  featured: true,
  icon: work[id].icon,
  statusNote: work[id].statusNote,
  phases: work[id].phases,
  phase: work[id].phase,
  highlights: work[id].highlights
})

// `size` drives the mosaic: xl = hero tile, lg = tall tile, md = standard.
export const projects = [
  {
    id: 'mrafqk',
    name: 'Mrafqk',
    tagline: 'Medical companion booking platform',
    orgKey: 'otaishan',
    status: 'testing',
    size: 'xl',
    image: '/images/projects/mrafqk.jpg',
    // Keep the wordmark on the left in frame when the cover is cropped.
    imagePosition: '10% center',
    description:
      'Book licensed, verified nurses as non-clinical companions for hospital visits, dialysis and elderly care across Saudi Arabia. Real-time bidding and chat, booking-to-payout workflows, MFA and role-based access, all built end-to-end.',
    tech: 'TypeScript, React Native (Expo), Next.js, Node.js/Express, tRPC, PostgreSQL, Redis, WebSockets',
    icons: [ICONS.typescript, ICONS.reactNative, ICONS.nextjs, ICONS.nodejs, ICONS.trpc, ICONS.postgresql, ICONS.redis],
    demo: 'https://mrafqk.com',
    playstore: null,
    note: 'Play Store release pending',
    color: '#14b8a6',
    ...featured('mrafqk')
  },
  {
    id: 'bahhr',
    name: 'BAHHR',
    tagline: 'Vehicle & adventure rental marketplace',
    orgKey: 'otaishan',
    status: 'prelaunch',
    size: 'xl',
    image: '/images/projects/bahhr-cover.svg',
    description:
      'Multi-category rental marketplace for boats, jet skis, ATVs, buggies and motorcycles. Booking engine with overlap validation, real-time chat via Socket.IO, JWT/OTP auth with RBAC, and full English/Arabic RTL support.',
    tech: 'React Native (Expo), NestJS, PostgreSQL, Prisma, Next.js, Socket.IO, TypeScript, Tailwind CSS',
    icons: [ICONS.reactNative, ICONS.nestjs, ICONS.postgresql, ICONS.prisma, ICONS.nextjs, ICONS.socketio, ICONS.tailwind],
    demo: 'https://www.bahhr.net',
    playstore: null,
    note: 'Pre-launch review',
    color: '#00b4d8',
    ...featured('bahhr')
  },
  {
    id: 'motorekcs',
    name: 'Motorekcs',
    tagline: 'On-demand automotive service platform',
    orgKey: 'otaishan',
    status: 'live',
    size: 'lg',
    image: '/images/projects/motorek.jpg',
    description:
      'Dispatches service vehicles to customer locations for engine oil changes ordered from Saudi automotive and oil brands. Django REST backend with JWT auth, Next.js customer platform and a React Native app with payments and push notifications.',
    highlights: [
      'Service vehicles are dispatched to the customer’s location to perform engine oil changes ordered from Saudi automotive and oil brands.',
      'Django REST Framework backend with JWT authentication and PostgreSQL, powering order management and separate customer, driver and service workflows.',
      'Next.js customer platform and React Native mobile app, integrating payment architecture and push notifications.'
    ],
    tech: 'Next.js, React, TypeScript, Django REST Framework, PostgreSQL, React Native, Tailwind CSS',
    icons: [ICONS.nextjs, ICONS.react, ICONS.typescript, ICONS.django, ICONS.postgresql, ICONS.tailwind],
    demo: 'https://motorekcs.com',
    playstore: null,
    note: 'Mobile release in progress',
    color: '#f97316'
  },
  {
    id: 'the-perfect-house',
    name: 'The Perfect House',
    tagline: 'Architecture & construction platform',
    orgKey: 'otaishan',
    status: 'live',
    size: 'lg',
    image: '/images/projects/the-perfect-house.webp',
    description:
      'Interactive digital product for an architecture, interiors, landscape and construction firm, including 3D architectural experiences in Three.js/WebGL. Shipped as a React Native (Expo) app and web platform with Arabic/English RTL, technical SEO and serverless deployment.',
    highlights: [
      'Interactive digital product for the firm’s architecture, interiors, landscape and construction divisions.',
      '3D architectural experiences built with Three.js/WebGL.',
      'React Native (Expo) app released alongside the web platform, with Arabic/English RTL, technical SEO, security headers and serverless deployment on Vercel.'
    ],
    tech: 'React Native (Expo), Next.js, Three.js/WebGL, TypeScript, Node.js serverless, Vercel',
    icons: [ICONS.reactNative, ICONS.nextjs, ICONS.threejs, ICONS.typescript, ICONS.nodejs, ICONS.vercel],
    demo: 'https://theperfecthouse.co',
    playstore: 'https://play.google.com/store/apps/details?id=co.theperfecthouse.app',
    note: null,
    color: '#eab308'
  },
  {
    id: 'gogo-sports',
    name: 'Gogo Sports',
    tagline: 'Premium football gear store, KSA',
    orgKey: 'freelance',
    status: 'live',
    size: 'md',
    image: '/images/projects/gogo-sports.jpg',
    description:
      'Customer-facing store for match balls, training gear, uniforms and goalkeeper gloves. Built in Next.js with a backend-free architecture: the order flow is routed directly through WhatsApp.',
    highlights: [
      'Backend-free architecture: the order flow is routed directly through WhatsApp.',
      'Premium football gear catalogue priced in SAR with delivery across Saudi Arabia.'
    ],
    tech: 'Next.js, React, Tailwind CSS',
    icons: [ICONS.nextjs, ICONS.react, ICONS.tailwind],
    demo: 'https://gogosports.online/',
    playstore: null,
    note: null,
    color: '#22c55e'
  },
  {
    id: 'mutmainnah',
    name: "Mutma'innah",
    tagline: 'Offline-first Islamic companion app',
    orgKey: 'personal',
    status: 'soon',
    size: 'md',
    image: '/images/projects/mutmainnah.png',
    description:
      "Designed, built and shipped independently. Runs on React Native's New Architecture (Fabric, TurboModules) with Hermes, React Context across salah, tasbeeh, theme and settings, AsyncStorage as the sole persistence layer, and English/Urdu via a custom i18n layer.",
    highlights: [
      'Designed, built and shipped to Google Play independently, covering product definition, engineering and release.',
      'React Native New Architecture (Fabric and TurboModules) on the Hermes engine, with React Context across the salah, tasbeeh, theme and settings modules.',
      'Fully offline-first with AsyncStorage as the sole persistence layer, and bilingual English/Urdu via a custom lightweight i18n layer.'
    ],
    tech: 'React Native, React, JavaScript, Hermes, React Navigation, AsyncStorage',
    icons: [ICONS.reactNative, ICONS.react, ICONS.javascript],
    demo: null,
    playstore: null,
    note: 'Google Play listing goes live shortly',
    color: '#10b981'
  },
  {
    id: 'call-loom',
    name: 'Call Loom',
    tagline: 'AI call-tracking & IVR platform',
    orgKey: 'marsbpo',
    status: 'live',
    size: 'lg',
    image: '/images/projects/call-loom.jpg',
    description:
      "React Native mobile app for the company's flagship commercial AI call-tracking and IVR platform. Integrated the product APIs and shipped the app to the Google Play Store.",
    highlights: [
      'React Native app for Mars BPO’s flagship commercial AI call-tracking and IVR platform.',
      'Integrated the product APIs and shipped the app to the Google Play Store.'
    ],
    tech: 'React Native, Tailwind CSS, REST APIs, AWS',
    icons: [ICONS.reactNative, ICONS.tailwind, ICONS.aws],
    demo: 'https://callloom.com/',
    playstore: 'https://play.google.com/store/apps/details?id=com.calloom3',
    note: null,
    color: '#8b5cf6'
  },
  {
    id: 'break-portal',
    name: 'Break Portal',
    tagline: 'Workforce break management',
    orgKey: 'marsbpo',
    status: 'shipped',
    size: 'md',
    image: '/images/projects/break-portal.jpg',
    description:
      'Web platform for managing employee break times and improving floor efficiency. Built and deployed on the company server.',
    tech: 'React.js, Python (Flask/Django), PostgreSQL',
    icons: [ICONS.react, ICONS.python, ICONS.flask, ICONS.postgresql],
    demo: null,
    playstore: null,
    note: 'Internal platform',
    color: '#f59e0b'
  },
  {
    id: 'data-scrubber',
    name: 'Data Scrubber',
    tagline: 'Number cleaning & compliance tool',
    orgKey: 'marsbpo',
    status: 'shipped',
    size: 'md',
    image: '/images/projects/data-scrubber.jpg',
    description:
      'Separates clean and bad numbers through the Blacklist Alliance API, caching already-scrubbed numbers to save API requests.',
    tech: 'HTML, CSS, JavaScript, Flask',
    icons: [ICONS.html, ICONS.css, ICONS.javascript, ICONS.flask],
    demo: null,
    playstore: null,
    note: 'Internal tool',
    color: '#ef4444'
  },
  {
    id: 'dial-loom',
    name: 'Dial Loom',
    tagline: 'Dialer performance monitoring',
    orgKey: 'marsbpo',
    status: 'shipped',
    size: 'md',
    image: '/images/projects/dial-loom.jpg',
    description:
      'Mobile app that helps businesses monitor dialer performance and call-center metrics. Designed and built the complete frontend.',
    tech: 'React Native, Tailwind CSS',
    icons: [ICONS.reactNative, ICONS.tailwind],
    demo: null,
    playstore: null,
    note: 'Internal product',
    color: '#06b6d4'
  },
  {
    id: 'taskio',
    name: 'Taskio',
    tagline: 'Task & team productivity',
    orgKey: 'marsbpo',
    status: 'shipped',
    size: 'md',
    image: '/images/projects/taskio.jpg',
    description:
      'Task management app for personal and team productivity. Built the entire web application and deployed it on the company server.',
    tech: 'React + Vite, Django, PostgreSQL',
    icons: [ICONS.react, ICONS.vite, ICONS.django, ICONS.postgresql],
    demo: null,
    playstore: null,
    note: 'Internal product',
    color: '#3b82f6'
  }
]

// ---------- localized views of the data ----------
// Each returns fresh records with the translated copy for the current
// language spread over the English fields, plus a resolved `org` label. In
// English the overlay is null and the records come back as they are above.

const withOrg = (p) => ({ ...p, org: t('orgs.' + p.orgKey) })

// Only the keys the overlay actually defines, so a missing translation never
// blanks out an English field.
const pick = (obj, keys) =>
  Object.fromEntries(keys.filter((k) => obj && obj[k] !== undefined).map((k) => [k, obj[k]]))

export function localizedCurrentWork() {
  return currentWork.map((p) => withOrg({ ...p, ...overlay('currentWork.' + p.id) }))
}

export function localizedProjects() {
  return projects.map((p) => {
    // The featured tiles borrow their progress copy from the currentWork
    // entry, exactly as `featured()` does for the English fields.
    const shared = p.featured ? pick(overlay('currentWork.' + p.id), ['statusNote', 'phases', 'highlights']) : null
    return withOrg({ ...p, ...shared, ...overlay('projects.' + p.id) })
  })
}
