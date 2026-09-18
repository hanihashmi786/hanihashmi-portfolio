// Skills, tools and certifications: shared by the About page and the CV.
// `level`, `type` and `category` are keys into about.* in the locale files;
// names and issuers are proper nouns and stay as they are.

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'

export const tech = [
  { id: 1, name: 'Python', imageUrl: DEVICON + 'python/python-original.svg', level: 'advanced' },
  { id: 2, name: 'JavaScript', imageUrl: DEVICON + 'javascript/javascript-original.svg', level: 'advanced' },
  { id: 3, name: 'TypeScript', imageUrl: DEVICON + 'typescript/typescript-original.svg', level: 'advanced' },
  { id: 4, name: 'React', imageUrl: DEVICON + 'react/react-original.svg', level: 'advanced' },
  { id: 5, name: 'React Native', imageUrl: DEVICON + 'react/react-original.svg', level: 'advanced' },
  { id: 6, name: 'Next.js', imageUrl: DEVICON + 'nextjs/nextjs-original.svg', level: 'advanced' },
  { id: 7, name: 'HTML', imageUrl: DEVICON + 'html5/html5-original.svg', level: 'advanced' },
  { id: 8, name: 'CSS', imageUrl: DEVICON + 'css3/css3-original.svg', level: 'advanced' },
  { id: 9, name: 'Tailwind CSS', imageUrl: DEVICON + 'tailwindcss/tailwindcss-original.svg', level: 'advanced' },
  { id: 10, name: 'Angular', imageUrl: DEVICON + 'angularjs/angularjs-original.svg', level: 'intermediate' },
  { id: 11, name: 'Flask', imageUrl: DEVICON + 'flask/flask-original.svg', level: 'advanced' },
  { id: 12, name: 'Django', imageUrl: DEVICON + 'django/django-plain.svg', level: 'advanced' },
  { id: 13, name: 'Node.js', imageUrl: DEVICON + 'nodejs/nodejs-original.svg', level: 'advanced' },
  { id: 14, name: 'Express', imageUrl: DEVICON + 'express/express-original.svg', level: 'advanced' },
  { id: 15, name: 'PostgreSQL', imageUrl: DEVICON + 'postgresql/postgresql-original.svg', level: 'advanced' },
  { id: 16, name: 'MySQL', imageUrl: DEVICON + 'mysql/mysql-original.svg', level: 'intermediate' },
  { id: 17, name: 'MongoDB', imageUrl: DEVICON + 'mongodb/mongodb-original.svg', level: 'advanced' },
  { id: 18, name: 'Firebase', imageUrl: DEVICON + 'firebase/firebase-plain.svg', level: 'intermediate' }
]

export const tools = [
  { id: 1, name: 'Git', imageUrl: DEVICON + 'git/git-original.svg', type: 'versionControl' },
  { id: 2, name: 'GitHub', imageUrl: DEVICON + 'github/github-original.svg', type: 'gitHosting' },
  { id: 3, name: 'AWS', imageUrl: DEVICON + 'amazonwebservices/amazonwebservices-original-wordmark.svg', type: 'cloud' },
  { id: 4, name: 'Docker', imageUrl: DEVICON + 'docker/docker-original.svg', type: 'containers' },
  { id: 5, name: 'VS Code', imageUrl: DEVICON + 'vscode/vscode-original.svg', type: 'ide' },
  { id: 6, name: 'NPM', imageUrl: DEVICON + 'npm/npm-original-wordmark.svg', type: 'packageManager' },
  { id: 7, name: 'Selenium', imageUrl: DEVICON + 'selenium/selenium-original.svg', type: 'automation' },
  { id: 8, name: 'TensorFlow', imageUrl: DEVICON + 'tensorflow/tensorflow-original.svg', type: 'aiMl' }
]

export const certifications = [
  { name: 'Google IT Support', issuer: 'Google', category: 'itSupport', url: 'https://www.coursera.org/professional-certificates/google-it-support' },
  { name: 'Crash Course on Python', issuer: 'Google', category: 'programming', url: 'https://www.coursera.org/learn/python-crash-course' },
  { name: 'Introduction to DevOps', issuer: 'Coursera', category: 'devops', url: 'https://www.coursera.org/learn/intro-to-devops' },
  { name: 'Data Science', issuer: 'Coursera', category: 'dataScience', url: 'https://www.coursera.org/browse/data-science' },
  { name: 'JavaScript (Basics)', issuer: 'Coursera', category: 'programming', url: 'https://www.coursera.org/learn/javascript-basics' },
  { name: 'JavaScript', issuer: 'Coursera', category: 'programming', url: 'https://www.coursera.org/learn/javascript' },
  { name: 'Advanced Appium: Scalable Mobile Automation', issuer: 'Coursera', category: 'testAutomation', url: 'https://www.coursera.org/account/accomplishments/verify/W9XMI8AGU48H' },
  { name: 'Lean Six Sigma White Belt', issuer: 'Smart Irtekaz', category: 'processImprovement', url: null }
]

// Grouped for the CV. Order is the order they print in.
export const skillGroups = [
  { key: 'languages', items: ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS'] },
  { key: 'frontend', items: ['React', 'Next.js', 'React Native (Expo)', 'Vue', 'Angular', 'Tailwind CSS', 'Three.js'] },
  { key: 'backend', items: ['Node.js', 'Express', 'NestJS', 'tRPC', 'Django', 'Django REST Framework', 'Flask'] },
  { key: 'data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'Firebase'] },
  { key: 'platform', items: ['WebSockets', 'Socket.IO', 'JWT / OTP / MFA', 'AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Git'] },
  { key: 'other', items: ['TensorFlow / Keras', 'OpenCV', 'Selenium', 'Arabic / English RTL products', 'Technical SEO'] }
]
