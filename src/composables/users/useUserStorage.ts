import { useStorage } from '@vueuse/core'
import { userMockData } from '@/mocks/users'
import type { User } from '@/types/user'

export default function useUserStorage() {
  const users = useStorage<User[]>('users', userMockData)

  if (users.value && !Array.isArray(users.value)) {
    users.value = userMockData
    console.warn('Reset users data due to invalid format')
  }

  return users
}
