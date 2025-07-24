<script setup>
import { ref, computed } from 'vue'
import { userMockData } from '@/mocks/users'
import UserForm from '@/components/users/UserForm.vue'
import UserTable from '@/components/users/UserTable.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import Button from '@/components/ui/Button.vue'
import { statusOptions } from '@/constants/statusOptions'

const users = ref([...userMockData])
const searchTerm = ref('')
const statusFilter = ref('all')

// State
const isDialogOpen = ref(false)
const currentUser = ref(null)

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

const openDialog = (user = null) => {
  currentUser.value = user
  isDialogOpen.value = true
}

const handleSubmit = (userData) => {
  if (userData.id) {
    const index = users.value.findIndex((u) => u.id === userData.id)
    if (index !== -1) {
      users.value[index] = userData
    }
  } else {
    users.value.push({
      ...userData,
      id: Date.now(),
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
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchTerm" placeholder="Search by name or document" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="statusFilter" :options="statusOptions" class="w-40" />
        <Button @click="openDialog()">Add User</Button>
      </div>
    </div>

    <UserForm
      v-if="isDialogOpen"
      :isOpen="isDialogOpen"
      :user="currentUser"
      @submit="handleSubmit"
      @close="isDialogOpen = false"
    />

    <UserTable :users="filteredUsers" @edit="openDialog" @deactivate="toggleUserStatus" />
  </div>
</template>
