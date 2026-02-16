<script>
export default {
  data() {
    return {
      activeTab: 1,
      tech: [
        { id: 1, name: 'Python', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', status: 'Advanced' },
        { id: 2, name: 'JavaScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', status: 'Advanced' },
        { id: 3, name: 'TypeScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', status: 'Advanced' },
        { id: 4, name: 'React', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', status: 'Advanced' },
        { id: 5, name: 'React Native', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', status: 'Advanced' },
        { id: 6, name: 'Next.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', status: 'Advanced' },
        { id: 7, name: 'HTML', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', status: 'Advanced' },
        { id: 8, name: 'CSS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', status: 'Advanced' },
        { id: 9, name: 'Tailwind CSS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', status: 'Advanced' },
        { id: 10, name: 'Angular', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', status: 'Intermediate' },
        { id: 11, name: 'Flask', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', status: 'Advanced' },
        { id: 12, name: 'Django', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', status: 'Advanced' },
        { id: 13, name: 'Node.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', status: 'Advanced' },
        { id: 14, name: 'Express', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', status: 'Advanced' },
        { id: 15, name: 'PostgreSQL', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', status: 'Advanced' },
        { id: 16, name: 'MySQL', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', status: 'Intermediate' },
        { id: 17, name: 'MongoDB', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', status: 'Advanced' },
        { id: 18, name: 'Firebase', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', status: 'Intermediate' },
      ],
      tools: [
        { id: 1, name: 'Git', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', status: 'Version Control' },
        { id: 2, name: 'GitHub', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', status: 'Git Hosting' },
        { id: 3, name: 'AWS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', status: 'Cloud' },
        { id: 4, name: 'Docker', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', status: 'Containers' },
        { id: 5, name: 'VS Code', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', status: 'IDE' },
        { id: 6, name: 'NPM', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', status: 'Package Manager' },
        { id: 7, name: 'Selenium', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg', status: 'Automation' },
        { id: 8, name: 'TensorFlow', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', status: 'AI/ML' },
      ],
      experiences: [
        {
          role: 'Full Stack Developer',
          company: 'Freelancing',
          period: 'Oct 2025 - Present',
          location: 'Riyadh, Saudi Arabia',
          current: true,
          points: [
            'Developed the mobile app "Rujo-illalah" using React Native',
            'Currently working on "Motorek" web using Next.js and mobile app using React Native, with Django backend',
            'Developed the frontend of "Gogo Sports" using Next.js'
          ]
        },
        {
          role: 'Full Stack Developer',
          company: 'Mars BPO Pvt. Ltd.',
          period: 'Jul 2024 - Aug 2025',
          location: 'Rawalpindi, Pakistan',
          current: false,
          points: [
            'Developed & maintained 5+ web apps using React and mobile apps using React Native & Python (Flask/Django), improving deployment time by 30%',
            'Collaborated with cross-functional teams to build scalable solutions, resulting in a 25% increase in system reliability',
            'Optimized backend codebase & debugging processes, reducing issue resolution time by 40%'
          ]
        },
        {
          role: 'Full Stack Developer',
          company: 'Freelancing',
          period: 'Sep 2023 - Jul 2024',
          location: 'Islamabad, Pakistan',
          current: false,
          points: [
            'Developed a UI/UX dashboard using React.js',
            'Built a mobile app for online clothing sales using React Native',
            'Created an e-commerce store for an international student project with MERN stack',
            'Built a voice changer website using Python as a final year project'
          ]
        },
        {
          role: 'JavaScript Developer - Internship',
          company: 'SOFTOO Pvt. Ltd.',
          period: 'Jul 2023 - Sep 2023',
          location: 'Islamabad, Pakistan',
          current: false,
          points: [
            'Completed intensive Node.js training during the internship',
            'Enhanced logical thinking & problem-solving by independently tackling coding challenges',
            'Contributed to a collaborative team culture by sharing solutions and improving peer review quality'
          ]
        }
      ],
      education: [
        {
          degree: 'BS Software Engineering',
          institution: 'Capital University of Science & Technology',
          period: '2020 - 2024',
          location: 'Islamabad, Pakistan',
          highlights: [
            'Final Year Project: Detection of Brain Tumor using MR Images (Python, TensorFlow/Keras, OpenCV)',
            'Focused on Full Stack Development, AI/ML, and Mobile App Development',
            'Strong foundation in Data Structures, Algorithms, and System Design'
          ]
        }
      ],
      certifications: [
        { name: 'Google IT Support', issuer: 'Google', category: 'IT Support', url: 'https://www.coursera.org/professional-certificates/google-it-support' },
        { name: 'Crash Course on Python', issuer: 'Google', category: 'Programming', url: 'https://www.coursera.org/learn/python-crash-course' },
        { name: 'Introduction to DevOps', issuer: 'Coursera', category: 'DevOps', url: 'https://www.coursera.org/learn/intro-to-devops' },
        { name: 'Data Science', issuer: 'Coursera', category: 'Data Science', url: 'https://www.coursera.org/browse/data-science' },
        { name: 'JavaScript (Basics)', issuer: 'Coursera', category: 'Programming', url: 'https://www.coursera.org/learn/javascript-basics' },
        { name: 'JavaScript', issuer: 'Coursera', category: 'Programming', url: 'https://www.coursera.org/learn/javascript' },
        { name: 'Advanced Appium: Scalable Mobile Automation', issuer: 'Coursera', category: 'Test Automation', url: 'https://www.coursera.org/account/accomplishments/verify/W9XMI8AGU48H' },
        { name: 'Lean Six Sigma White Belt', issuer: 'Smart Irtekaz', category: 'Process Improvement', url: null },
      ]
    };
  }
}
</script>
<template>
  <!-- About Me Section with Image -->
  <div class="bg-mono-card px-5 py-5 md:px-12 md:py-10 text-left border border-mono-border rounded-3xl text-mono-fg mx-3 mb-5">
    <article>
      <header>
        <div class="text-2xl font-bold text-mono-fg mb-5 fadein-bot title-section flex items-center">
          About Me &nbsp;
          <div class="h-[1px] w-32 bg-mono-fg md:w-96"></div>
        </div>
      </header>
      <section class="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        <!-- Profile Image -->
        <div class="flex-shrink-0 mx-auto md:mx-0">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-mono-border">
            <img src="/images/profile.png" alt="Hani Hashmi" class="w-full h-full object-cover" />
          </div>
        </div>
        <!-- Text -->
        <div class="flex flex-col gap-4 text-sm md:text-base text-justify">
          <p class="leading-relaxed fadein-left fadeins-1 text-mono-muted">
            I am a Software Engineer with 2 years of experience in Full Stack Development, IT Support, Software Support, and Networking. Skilled in React.js, React Native, Python (Flask/Django), and the MERN stack, with a solid foundation in AI, Machine Learning, and NLP.
          </p>
          <p class="leading-relaxed fadein-left fadeins-2 text-mono-muted">
            I have contributed to multiple successful projects including Break Portal, Call Loom, Data Scrubber, Dial Loom, Taskio, Rujo-illalah and am currently working on Motorek (Web & Mobile App). My work has improved deployment time by 30%, increased system reliability by 25%, and reduced issue resolution time by 40%.
          </p>
        </div>
      </section>
    </article>
  </div>

  <!-- Work Experience Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-mono-fg mx-3 mb-5">
    <article>
      <header>
        <div class="text-2xl font-bold text-mono-fg mb-8 fadein-bot title-section flex items-center">
          <div class="h-[1px] w-10 bg-mono-fg md:w-20"></div>
          &nbsp; Work Experience
        </div>
      </header>
      <section>
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-4 top-0 bottom-0 w-[2px] bg-mono-border hidden md:block"></div>
          <div v-for="(exp, index) in experiences" :key="index" class="mb-8 md:ml-12 relative">
            <!-- Timeline dot -->
            <div class="absolute -left-[3.25rem] top-1 w-3 h-3 rounded-full bg-mono-fg hidden md:block" :class="{ 'ring-4 ring-mono-subtle/30': exp.current }"></div>
            <div class="bg-mono-card border border-mono-border rounded-xl p-5 md:p-6 hover:bg-mono-card-hover transition-colors duration-300">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-mono-fg">{{ exp.role }}</h3>
                  <p class="text-mono-accent text-sm">{{ exp.company }}</p>
                </div>
                <div class="text-right mt-2 md:mt-0">
                  <span v-if="exp.current" class="inline-block px-2 py-1 text-xs bg-mono-fg/10 text-mono-fg rounded-full mb-1">Current</span>
                  <p class="text-mono-muted text-xs">{{ exp.period }}</p>
                  <p class="text-mono-subtle text-xs">{{ exp.location }}</p>
                </div>
              </div>
              <ul class="list-disc list-inside text-mono-muted text-sm leading-relaxed flex flex-col gap-2">
                <li v-for="(point, pIndex) in exp.points" :key="pIndex">{{ point }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>

  <!-- Education Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-mono-fg mx-3 mb-5">
    <article>
      <header>
        <div class="text-2xl font-bold text-mono-fg mb-8 fadein-bot title-section flex items-center">
          Education &nbsp;
          <div class="h-[1px] w-32 bg-mono-fg md:w-96"></div>
        </div>
      </header>
      <section>
        <div v-for="(edu, index) in education" :key="index" class="bg-mono-card border border-mono-border rounded-xl p-5 md:p-6 mb-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-mono-fg">{{ edu.degree }}</h3>
              <p class="text-mono-accent text-sm">{{ edu.institution }}</p>
            </div>
            <div class="text-right mt-2 md:mt-0">
              <p class="text-mono-muted text-xs">{{ edu.period }}</p>
              <p class="text-mono-subtle text-xs">{{ edu.location }}</p>
            </div>
          </div>
          <div class="mt-3">
            <h4 class="text-sm font-medium text-mono-accent mb-2">Key Highlights</h4>
            <ul class="list-disc list-inside text-mono-muted text-sm leading-relaxed flex flex-col gap-2">
              <li v-for="(highlight, hIndex) in edu.highlights" :key="hIndex">{{ highlight }}</li>
            </ul>
          </div>
        </div>
      </section>
    </article>
  </div>

  <!-- Skills Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-mono-fg mx-3 mb-5">
    <article>
      <header>
        <div class="text-2xl font-bold text-mono-fg mb-5 fadein-bot title-section flex items-center">
          <div class="h-[1px] w-10 bg-mono-fg md:w-20"></div>
          &nbsp; Skills & Technologies
        </div>
      </header>
      <section>
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center text-mono-subtle mb-5">
            <li class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg hover:text-mono-fg transition-colors"
                :class="{ 'text-mono-fg bg-mono-fg/10': activeTab === 1 }" @click="activeTab = 1">Tech Stack</button>
            </li>
            <li class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg hover:text-mono-fg transition-colors"
                :class="{ 'text-mono-fg bg-mono-fg/10': activeTab === 2 }" @click="activeTab = 2">Tools</button>
            </li>
          </ul>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tech" :key="item.id">
              <div class="item-tech flex cursor-pointer items-center gap-2 rounded border border-mono-border px-2 py-2 hover:bg-mono-card-hover md:gap-3 lg:px-3 transition-colors">
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl" style="color: transparent;">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium text-mono-fg transition-all duration-300 translate-y-0">{{ item.name }}</div>
                  <div class="status-tech opacity-0 absolute mt-5 text-[10px] text-mono-accent transition-all duration-300 md:text-xs lg:text-sm">{{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 2">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tools" :key="item.id">
              <div class="item-tech flex cursor-pointer items-center gap-2 rounded border border-mono-border px-2 py-2 hover:bg-mono-card-hover md:gap-3 lg:px-3 transition-colors">
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl" style="color: transparent;">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium text-mono-fg transition-all duration-300 translate-y-0">{{ item.name }}</div>
                  <div class="status-tech opacity-0 absolute mt-5 text-[10px] text-mono-accent transition-all duration-300 md:text-xs lg:text-sm">{{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>

  <!-- Certifications Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-mono-fg mx-3 mb-32">
    <article>
      <header>
        <div class="text-2xl font-bold text-mono-fg mb-8 fadein-bot title-section flex items-center">
          Certifications &nbsp;
          <div class="h-[1px] w-32 bg-mono-fg md:w-96"></div>
        </div>
      </header>
      <section>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <component
            v-for="(cert, index) in certifications" :key="index"
            :is="cert.url ? 'a' : 'div'"
            :href="cert.url || undefined"
            :target="cert.url ? '_blank' : undefined"
            :rel="cert.url ? 'noopener' : undefined"
            class="bg-mono-card border border-mono-border rounded-xl p-5 hover:bg-mono-card-hover transition-all duration-300 hover:-translate-y-1"
            :class="{ 'cursor-pointer': cert.url }">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-mono-fg/10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-mono-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-mono-fg">{{ cert.name }}</h3>
                <p class="text-mono-accent text-xs mt-1">{{ cert.issuer }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="inline-block px-2 py-0.5 text-[10px] bg-mono-fg/10 text-mono-muted rounded-full">{{ cert.category }}</span>
                  <span v-if="cert.url" class="text-[10px] text-mono-accent flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View
                  </span>
                </div>
              </div>
            </div>
          </component>
        </div>
      </section>
    </article>
  </div>
</template>

<style>
.fadein-left {
  opacity: 0;
  animation: fadeInLeft 0.5s ease-out forwards;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeins-1 {
  animation-delay: 500ms;
}

.fadeins-2 {
  animation-delay: 800ms;
}

.img-tech,
.tech {
  transition: transform 0.3s ease;
}

.item-tech:hover .img-tech {
  transform: scale(1.3);
}

.item-tech:hover .tech {
  transform: translateY(-12px);
}

.item-tech:hover .status-tech {
  opacity: 1;
}
</style>
