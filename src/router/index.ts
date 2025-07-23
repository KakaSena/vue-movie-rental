import { createRouter, createWebHistory } from 'vue-router'
/* import LoginForm from '@/pages/LoginForm.vue' */
import Dashboard from '@/pages/Dashboard.vue'
import UsersView from '@/pages/UsersView.vue'
import CustomerView from '@/pages/CustomerView.vue'
import MoviesView from '@/pages/MoviesView.vue'
import RentalsView from '@/pages/RentalsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    /* {
      path: '/',
      name: 'login',
      component: LoginForm,
    }, */
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      redirect: '/dashboard/movies',
      children: [
        {
          path: 'movies',
          component: MoviesView,
          name: 'movies',
        },
        {
          path: 'users',
          component: UsersView,
          name: 'users',
        },
        {
          path: 'customers',
          component: CustomerView,
          name: 'customers',
        },
        {
          path: 'rentals',
          component: RentalsView,
          name: 'rentals',
        },
      ],
    },
  ],
})

export default router
