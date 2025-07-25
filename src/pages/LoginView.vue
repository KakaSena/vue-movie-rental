<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import useUserStorage from '@/composables/users/useUserStorage'

const router = useRouter()
const users = useUserStorage()

const form = ref({
  document: '',
  password: '',
})

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const user = users.value.find(
      (u) => u.document === form.value.document && u.password === form.value.password
    )

    if (!user) {
      toast.error('Invalid credentials')
      return
    }

    if (user.status === 'inactive') {
      toast.error('Your account is inactive. Please contact support.')
      return
    }

    // Store user in session
    sessionStorage.setItem('currentUser', JSON.stringify(user))
    toast.success('Login successful')
    router.push('/dashboard')
  } catch (error) {
    toast.error('Login failed. Please try again.')
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
      <div class="text-center p-6 bg-white border-b">
        <h1 class="text-2xl font-bold text-gray-800">Movie Rental System</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-2">
            <label for="document" class="block text-sm font-medium text-gray-700">Document</label>
            <input
              id="document"
              type="text"
              placeholder="Enter your document number"
              v-model="form.document"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model="form.password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
