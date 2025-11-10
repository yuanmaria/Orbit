import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/OrbitView.vue'),
    },
    {
      path: '/opera',
      name: 'orbit-opera',
      component: () => import('../views/OrbitOpera.vue'),
    },
  ],
})

export default router
