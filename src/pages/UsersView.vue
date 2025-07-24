<script setup>
import { ref } from 'vue'
import { userMockData } from '@/mocks/users'
import UserForm from '@/components/users/UserForm.vue'
import UserTable from '@/components/users/UserTable.vue'
import Button from '@/components/ui/Button.vue'

const users = ref([...userMockData])

// State
const isDialogOpen = ref(false)
const currentUser = ref(null)

// Actions
const openDialog = (user = null) => {
  currentUser.value = user
  isDialogOpen.value = true
}

const handleSubmit = (userData) => {
  if (userData.id) {
    // Update existing user
    const index = users.value.findIndex((u) => u.id === userData.id)
    if (index !== -1) {
      users.value[index] = userData
    }
  } else {
    // Add new user
    users.value.push({
      ...userData,
      id: Date.now(), // Simple ID generation
    })
  }
  isDialogOpen.value = false
}

const toggleUserStatus = (userId) => {
  const user = users.value.find((u) => u.id === userId)
  if (user) {
    user.status = user.status === 'active' ? 'inactive' : 'active'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-end">
      <Button @click="openDialog()" class="mb-4"> Add User </Button>
    </div>

    <UserForm
      v-if="isDialogOpen"
      :isOpen="isDialogOpen"
      :user="currentUser"
      @submit="handleSubmit"
      @close="isDialogOpen = false"
    />

    <UserTable :users="users" @edit="openDialog" @deactivate="toggleUserStatus" />
  </div>
</template>
