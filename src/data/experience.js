// Work history and education for the Experience page. Keep in sync with the
// CV. English copy lives here; Arabic and Urdu overlay it by id from
// src/i18n/locales (`experienceItems.<id>` and `education`), so the views
// read `localizedExperiences()` / `localizedEducation()`.

import { overlay } from '../i18n/index.js'

export const experiences = [
  {
    id: 'otaishan',
    role: 'Product Developer (Full-Stack)',
    company: 'Otaishan Investments',
    period: 'Oct 2025 - Present',
    location: 'Riyadh, Saudi Arabia',
    current: true,
    summary:
      "Own end-to-end delivery of the company's digital products: frontend, backend, APIs, database, admin platforms and marketing sites. Four production platforms for the Saudi market, spanning marketplace, booking, real-time and on-demand service domains.",
    products: [
      {
        id: 'mrafqk',
        name: 'Mrafqk',
        tagline: 'Medical companion booking platform',
        status: 'Internal testing',
        statusColor: '#f59e0b',
        color: '#14b8a6',
        url: 'https://mrafqk.com',
        stack: 'TypeScript · React Native (Expo) · Next.js · Node.js/Express · tRPC · PostgreSQL · Redis · WebSockets'
      },
      {
        id: 'bahhr',
        name: 'BAHHR',
        tagline: 'Vehicle & adventure rental marketplace',
        status: 'Pre-launch',
        statusColor: '#38bdf8',
        color: '#00b4d8',
        url: 'https://www.bahhr.net',
        stack: 'React Native (Expo) · NestJS · PostgreSQL · Prisma · Next.js · Socket.IO · TypeScript · Tailwind CSS'
      },
      {
        id: 'motorekcs',
        name: 'Motorekcs',
        tagline: 'On-demand automotive service platform',
        status: 'In production',
        statusColor: '#22c55e',
        color: '#f97316',
        url: 'https://motorekcs.com',
        stack: 'Next.js · React · TypeScript · Django REST Framework · PostgreSQL · React Native · Tailwind CSS'
      },
      {
        id: 'the-perfect-house',
        name: 'The Perfect House',
        tagline: 'Architecture & construction platform',
        status: 'Live on Google Play',
        statusColor: '#22c55e',
        color: '#eab308',
        url: 'https://theperfecthouse.co',
        stack: 'React Native (Expo) · Next.js · Three.js/WebGL · TypeScript · Node.js serverless · Vercel'
      }
    ],
    responsibilities: [
      'Built Mrafqk end-to-end: cross-platform React Native (Expo) app, type-safe tRPC and Express backend, PostgreSQL data layer, Next.js admin platform and marketing site',
      'Engineered real-time bidding and chat over WebSockets with Redis pub/sub, enabling live matching between users and verified medical companions',
      'Architected the BAHHR multi-category rental marketplace, with a booking engine that validates availability and overlaps to prevent double-booking across concurrent reservations',
      'Delivered real-time chat and notifications via Socket.IO, with JWT/OTP authentication, MFA and role-based access control across mobile, admin and API layers',
      'Built the Motorekcs Django REST Framework backend, Next.js customer platform and React Native app, integrating payments and push notifications',
      'Engineered The Perfect House web platform and Expo app, including 3D architectural experiences in Three.js/WebGL, technical SEO and serverless deployment on Vercel'
    ],
    impact: [
      'Four production platforms for the Saudi market delivered end-to-end, from first commit to release',
      'Booking, payment and payout workflows covering the full request-to-settlement lifecycle',
      'Full English/Arabic internationalisation with RTL support, shipped on Vercel with GitHub Actions CI'
    ],
    stack: ['TypeScript', 'React Native (Expo)', 'Next.js', 'Node.js', 'Express', 'NestJS', 'tRPC', 'Django REST Framework', 'PostgreSQL', 'Prisma', 'Redis', 'WebSockets', 'Socket.IO', 'Three.js', 'Tailwind CSS', 'Vercel', 'GitHub Actions']
  },
  {
    id: 'freelance-2025',
    role: 'Freelance Full-Stack Developer',
    company: 'Independent Contractor',
    period: 'Aug 2025 - Mar 2026',
    location: 'Riyadh, Saudi Arabia',
    current: false,
    note: 'Concurrent with the Otaishan Investments role',
    responsibilities: [
      'Built the customer-facing Gogo Sports platform (gogosports.online) in Next.js with a backend-free architecture, routing the order flow directly through WhatsApp',
      'Delivered and deployed 3+ client portfolio websites with responsive design and live hosting'
    ],
    impact: [
      'A production storefront live with no backend to maintain, orders flowing straight to WhatsApp',
      'Every client site delivered live, responsive and on time'
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 'marsbpo',
    role: 'Full-Stack Developer',
    company: 'Mars BPO Pvt. Ltd.',
    period: 'Jul 2024 - Aug 2025',
    location: 'Rawalpindi, Pakistan',
    current: false,
    responsibilities: [
      "Built the React Native mobile app for Call Loom (callloom.com), the company's flagship commercial AI call-tracking and IVR platform, integrating the product APIs and shipping the app to the Google Play Store",
      'Developed and maintained 5+ web applications in React and mobile applications in React Native, backed by Python (Flask/Django) services and PostgreSQL',
      'Contributed to further products including Break Portal, Data Scrubber (Blacklist Alliance API integration), Dial Loom and Taskio'
    ],
    impact: [
      'Improved application response times through Redis caching and database query optimisation',
      'Reduced issue resolution time by refactoring the backend codebase and streamlining debugging and deployment'
    ],
    stack: ['React', 'React Native', 'Python', 'Flask', 'Django', 'PostgreSQL', 'Redis', 'AWS']
  },
  {
    id: 'freelance-2023',
    role: 'Freelance Full-Stack Developer',
    company: 'Independent Contractor',
    period: 'Sep 2023 - Jul 2024',
    location: 'Islamabad, Pakistan',
    current: false,
    responsibilities: [
      'Built an e-commerce store using the MERN stack',
      'Developed a React Native mobile application for online clothing sales',
      'Designed and built a React.js UI/UX dashboard'
    ],
    impact: ['Delivered multiple client projects independently, end-to-end and on time'],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'React Native']
  },
  {
    id: 'softoo',
    role: 'JavaScript Developer (Internship)',
    company: 'SOFTOO Pvt. Ltd.',
    period: 'Jul 2023 - Sep 2023',
    location: 'Islamabad, Pakistan',
    current: false,
    responsibilities: [
      'Completed intensive Node.js training',
      'Contributed to backend development tasks and participated in peer code review'
    ],
    impact: [
      'Contributed to a collaborative team culture by sharing solutions',
      'Improved peer review quality through active participation'
    ],
    stack: ['JavaScript', 'Node.js']
  }
]

export const education = {
  degree: 'BS Software Engineering',
  institution: 'Capital University of Science & Technology',
  period: '2020 - 2024',
  location: 'Islamabad, Pakistan',
  highlights: [
    'Final Year Project, Brain Tumour Detection from MRI: AI medical imaging system in Python, TensorFlow/Keras and OpenCV using CNN, VGG-16, ResNet-50 and Inception-V3 for multi-class tumour classification, delivered as a Flask web application',
    'Focused on Full Stack Development, AI/ML, and Mobile App Development',
    'Strong foundation in Data Structures, Algorithms, and System Design'
  ]
}

// ---------- localized views of the data ----------

export function localizedExperiences() {
  return experiences.map((e) => {
    const o = overlay('experienceItems.' + e.id)
    if (!o) return e
    // Product rows are keyed by id in the locale files; everything else on
    // the record overlays flat.
    const products = e.products && o.products ? e.products.map((p) => ({ ...p, ...o.products[p.id] })) : e.products
    return { ...e, ...o, products }
  })
}

export function localizedEducation() {
  return { ...education, ...overlay('education') }
}
