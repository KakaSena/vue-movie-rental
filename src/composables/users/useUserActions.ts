import { toast } from 'vue3-toastify'
import type { User } from '@/types/user'
import type { Ref } from 'vue'

export function useUserActions(
  users: Ref<User[]>,
  options?: {
    onSuccess?: () => void
  }
) {
  const handleSubmit = (userData: User) => {
    try {
      if (userData.id) {
        const index = users.value.findIndex((c: User) => c.id === userData.id)
        if (index !== -1) {
          users.value[index] = userData
          toast.success('User updated successfully!')
          options?.onSuccess?.()
          return true
        }
      } else {
        users.value.push({
          ...userData,
          id: Date.now(),
        })
        toast.success('User created successfully!')
        options?.onSuccess?.()
        return true
      }
      return false
    } catch (error) {
      toast.error('Failed to save user')
      console.error(error)
      return false
    }
  }

  const toggleUserStatus = (userId: number | string) => {
    const user = users.value.find((c: User) => c.id === userId)
    if (user) {
      user.status = user.status === 'active' ? 'inactive' : 'active'
      toast.success(`User status changed to ${user.status}`)
    }
  }

  return {
    handleSubmit,
    toggleUserStatus,
  }
}
