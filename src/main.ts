import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import nuxtUI from '@nuxt/ui/vue-plugin'

import Edit from '#/pages/Edit.vue'
import Study from '#/pages/Study.vue'
import Settings from '#/pages/Settings.vue'
import Login from '#/pages/Login.vue'

import App from '#/App.vue'
import { getAuthState } from './api-client'

const app = createApp(App)

const router = createRouter({
  routes: [
    { path: '/', redirect: '/edit' },
    { path: '/edit', component: Edit },
    { path: '/study', component: Study },
    { path: '/settings', component: Settings },
    { path: '/login', component: Login, meta: { hideNavigation: true } },
  ],
  history: createWebHashHistory(),
})

router.beforeEach(async (to, _) => {
  const loggedIn = getAuthState()

  if (!loggedIn && to.path !== '/login') return { path: '/login' }
  else if (loggedIn && to.path === '/login') return { path: '/edit' }
})

app.use(router)

// allow Nuxt UI to register vue plugins, like dark mode support + NuxtIcon
app.use(nuxtUI)

app.mount('#app')
