import { computed } from 'vue'
import type { User } from '@/types/user'

export function useAuth() {
  const currentUser = computed<User | null>(() => {
    const user = sessionStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  })

  const isAuthenticated = computed(() => {
    return !!currentUser.value
  })

  return {
    currentUser,
    isAuthenticated,
  }
}
