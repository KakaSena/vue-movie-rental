// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginView.vue'),
    meta: { requiresAuth: false, title: '🔐 Login' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    redirect: '/dashboard/movies',
    meta: { requiresAuth: true, title: 'Dashboard' },
    children: [
      {
        path: 'movies',
        component: () => import('@/pages/MoviesView.vue'),
        name: 'Movies',
        meta: { requiresAuth: true, title: '📽️ Movies' },
      },
      {
        path: 'users',
        component: () => import('@/pages/UsersView.vue'),
        name: 'Users',
        meta: { requiresAuth: true, title: '👤 Users' },
      },
      {
        path: 'customers',
        component: () => import('@/pages/CustomerView.vue'),
        name: 'Customers',
        meta: { requiresAuth: true, title: '👥 Customers' },
      },
      {
        path: 'rentals',
        component: () => import('@/pages/RentalsView.vue'),
        name: 'Rentals',
        meta: { requiresAuth: true, title: '📦 Rentals' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

// Adicionando suporte a 'meta.title'
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Redirecionamento e proteção de rotas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('currentUser')

  if (to.meta.requiresAuth && !isAuthenticated) {
    toast.error('Please login to access this page')
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

// Atualiza o título da aba com base na rota ativa
router.afterEach((to) => {
  const defaultTitle = 'Vue Movie Rental'
  document.title = to.meta.title || defaultTitle
})

export default router
