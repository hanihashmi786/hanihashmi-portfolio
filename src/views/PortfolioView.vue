<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Gogo Sports',
          status: 'A premium sports store in KSA for match balls, training gear, tracksuits, uniforms, and goalkeeper gloves. Built with Next.js and deployed as a production e-commerce experience.',
          tech: 'Next.js',
          techIcons: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'],
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
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
          github: 'null',
          demo: 'null',
          color: '#f97316'
        }
      ]
    };
  }
}
</script>
<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article>
      <header>
        <div class="text-2xl font-bold text-white mb-10 fadein-bot title-section flex items-center justify-center flex-col">
          <h4>Projects</h4>
          <h4 class="text-base font-normal text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300">
            A selection of my work showcasing various technologies</h4>
        </div>
      </header>
      <section>
        <div class="grid grid-cols-1 gap-4 pb-32 md:grid-cols-2 lg:grid-cols-3 md:gap-5 fade-zoom-in">
          <div v-for="item in items" :key="item.id">
            <div class="item-card flex flex-col gap-3 bg-[#1e1e1f] hover:bg-[#282828] border border-[#383838] rounded-xl text-amber-50 px-5 py-5 h-full transition-all duration-300">
              <!-- Color accent bar -->
              <div class="w-full h-1 rounded-full" :style="{ backgroundColor: item.color }"></div>
              
              <h3 class="text-lg font-semibold text-white">{{ item.name }}</h3>
              <p class="text-sm text-[#c1c1c1] leading-relaxed flex-grow">{{ item.status }}</p>
              
              <!-- Tech icons row -->
              <div class="flex items-center gap-2 mt-2">
                <img v-for="(icon, idx) in item.techIcons" :key="idx" 
                  :src="icon" :alt="item.tech" 
                  class="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              
              <div class="text-xs text-amber-200 mt-1">{{ item.tech }}</div>
              
              <div class="flex justify-end gap-2 mt-2">
                <a v-if="item.github !== 'null'" :href="item.github" target="_blank" rel="noreferrer"
                  title="View github repository" class="text-gray-400 hover:text-amber-200 transition-colors">
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a v-if="item.demo !== 'null'" :href="item.demo" target="_blank" rel="noreferrer"
                  title="View live demo" class="text-gray-400 hover:text-amber-200 transition-colors">
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <span v-if="item.github === 'null' && item.demo === 'null'" class="text-gray-500 text-xs italic">Private Project</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Final Year Project -->
        <div class="mb-32">
          <div class="text-xl font-bold text-white mb-6 flex items-center">
            <div class="h-[1px] w-10 bg-amber-200 md:w-20 mr-3"></div>
            Final Year Project
          </div>
          <div class="bg-[#1e1e1f] border border-[#383838] rounded-xl p-6 md:p-8">
            <h3 class="text-lg font-semibold text-white mb-2">Detection of Brain Tumor using MR Images</h3>
            <p class="text-sm text-gray-300 leading-relaxed mb-4">
              Developed an AI-based medical imaging system using Python, TensorFlow/Keras, and OpenCV to detect and classify brain tumors from MRI scans. Implemented deep learning models including CNN, VGG-16, ResNet-50, and Inception-V3 for tumor detection and multi-class classification. The system identifies tumor presence, classifies it as benign or malignant, and further categorizes it into Glioma, Meningioma, Pituitary Tumor, or No Tumor. Built a complete web application using Flask with HTML and CSS.
            </p>
            <div class="flex items-center gap-2">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" class="w-5 h-5" />
            </div>
            <div class="text-xs text-amber-200 mt-2">Python, TensorFlow/Keras, OpenCV, Flask, CNN, VGG-16, ResNet-50, Inception-V3</div>
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
