// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    redirect: '/dashboard/movies',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'movies',
        component: () => import('@/pages/MoviesView.vue'),
        name: 'Movies',
        meta: { requiresAuth: true },
      },
      {
        path: 'users',
        component: () => import('@/pages/UsersView.vue'),
        name: 'Users',
        meta: { requiresAuth: true },
      },
      {
        path: 'customers',
        component: () => import('@/pages/CustomerView.vue'),
        name: 'Customers',
        meta: { requiresAuth: true },
      },
      {
        path: 'rentals',
        component: () => import('@/pages/RentalsView.vue'),
        name: 'Rentals',
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

// Type for route meta
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// @ts-ignore
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

export default router
