<script setup lang="ts">
import NavLogo from '@/components/navigation/NavLogo.vue'
import NavList from '@/components/navigation/NavList.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { computed } from 'vue'

const isLoggedIn = computed(() => {
  return !!sessionStorage.getItem('currentUser')
})

const handleLogout = () => {
  sessionStorage.removeItem('currentUser')
  toast.success('Logged out successfully')
  window.location.href = '/login'
}
</script>

<template>
  <div class="fixed h-screen w-64 bg-gray-50 border-r border-gray-200 py-4 flex flex-col">
    <NavLogo />
    <NavList class="flex-1 overflow-y-auto" />
    <button
      v-if="isLoggedIn"
      @click="handleLogout"
      class="mx-4 mt-auto py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</template>
