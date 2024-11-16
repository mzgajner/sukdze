import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import nuxtUI from '@nuxt/ui/vue-plugin'

import Edit from './pages/Edit.vue'
import Study from './pages/Study.vue'
import App from './App.vue'
const app = createApp(App)

app.use(
  createRouter({
    routes: [
      { path: '/', redirect: '/edit' },
      { path: '/edit', component: Edit },
      { path: '/study', component: Study },
    ],
    history: createWebHistory(),
  }),
)

// allow Nuxt UI to register vue plugins, like dark mode support + NuxtIcon
app.use(nuxtUI)

app.mount('#app')
