import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { inject } from '@vercel/analytics'

// Initialize Vercel Analytics
inject()

createApp(App).use(router).mount('#app')


