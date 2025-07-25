<script setup lang="ts">
import type { User } from '@/types/user'
import { useDialog } from '@/composables/useDialog'
import { useUserActions } from '@/composables/users/useUserActions'
import { useUserFilters } from '@/composables/users/useUserFilters'
import useUserStorage from '@/composables/users/useUserStorage'
import { statusUserOptions } from '@/constants/statusOptions'
import Button from '@/components/ui/Button.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import UserForm from '@/components/users/UserForm.vue'
import UserTable from '@/components/users/UserTable.vue'

const users = useUserStorage()
const {
  isOpen: isDialogOpen,
  state: currentUser,
  open: openDialog,
  close: closeDialog,
} = useDialog<User>()

const { handleSubmit, toggleUserStatus } = useUserActions(users, {
  onSuccess: closeDialog,
})

const { searchTerm, statusFilter, filteredUsers } = useUserFilters(users)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchTerm" placeholder="Search by name or document" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="statusFilter" :options="statusUserOptions" class="w-40" />
        <Button @click="openDialog()">Add User</Button>
      </div>
    </div>

    <UserForm
      v-if="isDialogOpen"
      :isOpen="isDialogOpen"
      :user="currentUser"
      @submit="handleSubmit"
      @close="closeDialog"
    />

    <UserTable :users="filteredUsers" @edit="openDialog" @deactivate="toggleUserStatus" />
  </div>
</template>
