import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import theme from './theme'
import reveal from './motion/reveal.js'
import './assets/tailwind.css'
import './assets/motion.css'
import { inject } from '@vercel/analytics'

// Initialize Vercel Analytics
inject()

createApp(App).use(i18n).use(theme).use(router).use(reveal, { router }).mount('#app')
