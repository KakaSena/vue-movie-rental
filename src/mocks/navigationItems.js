import { Users, UserPlus, Film, Calendar } from 'lucide-vue-next'
export const navItemsMockData = [
  {
    path: '/dashboard/movies',
    label: 'Movies',
    icon: Film,
    name: 'movies',
  },
  {
    path: '/dashboard/users',
    label: 'Users',
    icon: Users,
    name: 'users',
  },
  {
    path: '/dashboard/customers',
    label: 'Customers',
    icon: UserPlus,
    name: 'customers',
  },
  {
    path: '/dashboard/rentals',
    label: 'Rentals',
    icon: Calendar,
    name: 'rentals',
  },
]
