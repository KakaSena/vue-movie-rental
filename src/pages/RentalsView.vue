<script setup>
import { ref } from 'vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import Button from '@/components/ui/Button.vue'
import { statusRentalOptions } from '@/constants/statusOptions'

const searchTerm = ref('')
const statusFilter = ref('all')
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchTerm" placeholder="Search by name or document" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="statusFilter" :options="statusRentalOptions" class="w-40" />
        <Button @click="openDialog()">Add User</Button>
      </div>
    </div>
  </div>
</template>
