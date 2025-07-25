import { ref, computed, type Ref } from 'vue'
import type { User, UserStatus } from '@/types/user'

export function useUserFilters(users: Ref<User[]>) {
  const searchTerm = ref('')
  const statusFilter = ref<UserStatus | 'all'>('all')

  const filteredUsers = computed(() => {
    let result = users.value

    if (statusFilter.value !== 'all') {
      result = result.filter((user) => user.status === statusFilter.value)
    }

    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase()
      result = result.filter((user) => {
        return user.name.toLowerCase().includes(term) || user.document.toLowerCase().includes(term)
      })
    }

    return result
  })

  return {
    searchTerm,
    statusFilter,
    filteredUsers,
  }
}
