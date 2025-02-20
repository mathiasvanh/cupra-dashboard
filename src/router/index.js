import { createRouter, createWebHistory } from 'vue-router'
import Callback from '@/components/Callback.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    // ... your other routes ...
  ]
})

export default router 