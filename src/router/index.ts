import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm,
    },
  ],
})

export default router
