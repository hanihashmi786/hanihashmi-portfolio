<script>
export default {
  data() {
    return {
      hoveredProject: null,
      items: [
        {
          id: 1,
          name: 'Gogo Sports',
          status: 'A premium sports store in KSA for match balls, training gear, tracksuits, uniforms, and goalkeeper gloves. Built with Next.js and deployed as a production e-commerce experience.',
          tech: 'Next.js',
          techIcons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'],
          github: null,
          demo: 'https://gogosports.online/',
          playstore: null,
          label: null,
          color: '#22c55e'
        },
        {
          id: 2,
          name: 'Motorek',
          status: 'A comprehensive car oil change service platform providing both mobile application and website. Built with React Native for mobile, Next.js for web, Django for backend, and PostgreSQL for database.',
          tech: 'React Native, Next.js, Django, PostgreSQL',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
          ],
          github: null,
          demo: null,
          playstore: null,
          label: 'Coming Soon',
          color: '#3b82f6'
        },
        {
          id: 3,
          name: 'Break Portal',
          status: 'A web-based platform developed to manage employee break times and enhance workplace efficiency. Built and deployed on the server.',
          tech: 'React.js, Python (Flask/Django), PostgreSQL',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
          ],
          github: null,
          demo: null,
          playstore: null,
          label: 'Mars BPO Project',
          color: '#f59e0b'
        },
        {
          id: 4,
          name: 'Call Loom',
          status: 'A mobile application built to track AI-powered call interactions. Complete mobile app with API integration.',
          tech: 'React Native, Tailwind CSS, API, AWS',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
          ],
          github: null,
          demo: 'https://callloom.com/',
          playstore: 'https://play.google.com/store/apps/details?id=com.calloom3',
          label: null,
          color: '#8b5cf6'
        },
        {
          id: 5,
          name: 'Data Scrubber',
          status: 'A data cleaning and preprocessing tool for separating clean and bad numbers through Blacklist Alliance, saving API requests for already scrubbed numbers.',
          tech: 'HTML, CSS, JavaScript, Flask',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg'
          ],
          github: null,
          demo: null,
          playstore: null,
          label: 'Mars BPO Project',
          color: '#ef4444'
        },
        {
          id: 6,
          name: 'Dial Loom',
          status: 'A mobile application designed to help businesses monitor and track dialer performance and call center metrics. Designed the complete frontend.',
          tech: 'React Native, Tailwind CSS',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
          ],
          github: null,
          demo: null,
          playstore: null,
          label: 'Mars BPO Project',
          color: '#06b6d4'
        },
        {
          id: 7,
          name: 'Taskio',
          status: 'A task management app aimed at improving personal and team productivity. Built the entire website and deployed on server.',
          tech: 'React + Vite, Django, PostgreSQL',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
          ],
          github: null,
          demo: null,
          playstore: null,
          label: 'Mars BPO Project',
          color: '#10b981'
        },
        {
          id: 8,
          name: 'Rujo-illalah',
          status: 'An Islamic mobile application providing spiritual guidance and resources, built with React Native.',
          tech: 'React Native, Firebase, TypeScript',
          techIcons: [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
          ],
          github: null,
          demo: null,
          playstore: null,
          label: 'Coming Soon',
          color: '#f97316'
        }
      ]
    };
  }
}
</script>
<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left mx-3">
    <article>
      <header>
        <div class="text-2xl font-bold mb-10 fadein-bot title-section flex items-center justify-center flex-col">
          <h4 style="color: var(--text);">Projects</h4>
          <h4 class="text-base font-normal text-transparent bg-clip-text" style="background-image: linear-gradient(to right, var(--gradient-from), var(--gradient-to));">
            A selection of my work showcasing various technologies</h4>
        </div>
      </header>
      <section>
        <div class="grid grid-cols-1 gap-4 pb-32 md:grid-cols-2 lg:grid-cols-3 md:gap-5 fade-zoom-in">
          <div v-for="item in items" :key="item.id" class="relative"
            @mouseenter="item.demo ? hoveredProject = item.id : null"
            @mouseleave="hoveredProject = null">
            <div class="item-card flex flex-col gap-3 rounded-xl px-5 py-5 h-full transition-all duration-300"
              style="background-color: var(--bg-card); border: 1px solid var(--border);">
              <!-- Color accent bar -->
              <div class="w-full h-1 rounded-full" :style="{ backgroundColor: item.color }"></div>
              
              <h3 class="text-lg font-semibold" style="color: var(--text);">{{ item.name }}</h3>
              <p class="text-sm leading-relaxed flex-grow" style="color: var(--text-muted);">{{ item.status }}</p>
              
              <!-- Tech icons row -->
              <div class="flex items-center gap-2 mt-2">
                <img v-for="(icon, idx) in item.techIcons" :key="idx" 
                  :src="icon" :alt="item.tech" 
                  class="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              
              <div class="text-xs mt-1" style="color: var(--accent);">{{ item.tech }}</div>
              
              <div class="flex justify-end items-center gap-2 mt-2">
                <a v-if="item.demo" :href="item.demo" target="_blank" rel="noreferrer"
                  title="View live site" class="transition-colors hover:opacity-80" style="color: var(--text-muted);">
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <a v-if="item.playstore" :href="item.playstore" target="_blank" rel="noreferrer"
                  title="View on Play Store" class="transition-colors hover:opacity-80" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 9.991l-2.302 2.302L5.864 3.658z"/>
                  </svg>
                </a>
                <span v-if="item.label" class="text-xs italic" style="color: var(--text-muted);">{{ item.label }}</span>
              </div>
            </div>

            <!-- Hover preview for live sites -->
            <div v-if="hoveredProject === item.id && item.demo" 
              class="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 h-48 rounded-lg overflow-hidden shadow-2xl pointer-events-none"
              style="border: 2px solid var(--accent);">
              <iframe :src="item.demo" class="w-full h-full scale-50 origin-top-left pointer-events-none" 
                style="width: 200%; height: 200%;" frameborder="0" loading="lazy" sandbox="allow-scripts allow-same-origin"></iframe>
            </div>
          </div>
        </div>

        <!-- Final Year Project -->
        <div class="mb-32">
          <div class="text-xl font-bold mb-6 flex items-center" style="color: var(--text);">
            <div class="h-[1px] w-10 md:w-20 mr-3" style="background-color: var(--accent);"></div>
            Final Year Project
          </div>
          <div class="rounded-xl p-6 md:p-8" style="background-color: var(--bg-card); border: 1px solid var(--border);">
            <h3 class="text-lg font-semibold mb-2" style="color: var(--text);">Detection of Brain Tumor using MR Images</h3>
            <p class="text-sm leading-relaxed mb-4" style="color: var(--text-muted);">
              Developed an AI-based medical imaging system using Python, TensorFlow/Keras, and OpenCV to detect and classify brain tumors from MRI scans. Implemented deep learning models including CNN, VGG-16, ResNet-50, and Inception-V3 for tumor detection and multi-class classification. The system identifies tumor presence, classifies it as benign or malignant, and further categorizes it into Glioma, Meningioma, Pituitary Tumor, or No Tumor. Built a complete web application using Flask with HTML and CSS.
            </p>
            <div class="flex items-center gap-2">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" class="w-5 h-5" />
            </div>
            <div class="text-xs mt-2" style="color: var(--accent);">Python, TensorFlow/Keras, OpenCV, Flask, CNN, VGG-16, ResNet-50, Inception-V3</div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style>
.item-card:hover {
  transition: transform 0.3s ease;
  transform: translateY(-8px);
  background-color: var(--bg-card-hover) !important;
}

@keyframes fadeZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-zoom-in {
  animation: fadeZoomIn 1s ease-in-out;
}
</style>
