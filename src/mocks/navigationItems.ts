// src/mocks/navItems.ts
import { Film, Users, UserPlus, Calendar } from 'lucide-vue-next'
import type { NavItem } from '@/types/navigation'

export const navItemsMockData: NavItem[] = [
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
