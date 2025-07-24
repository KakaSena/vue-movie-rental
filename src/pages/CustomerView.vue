<script setup lang="ts">
import { useDialog } from '@/composables/useDialog'
import useCustomerStorage from '@/composables/useCustomerStorage'
import { useCustomerActions } from '@/composables/useCustomerActions'
import { useCustomerFilters } from '@/composables/useCustomerFilters'
import { formatCustomerForDisplay } from '@/utils/customerFormatters'
import CustomerForm from '@/components/customers/CustomerForm.vue'
import CustomerTable from '@/components/customers/CustomerTable.vue'
import Button from '@/components/ui/Button.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import { statusUserOptions } from '@/constants/statusOptions'
import type { Customer } from '@/types/customer'

const customers = useCustomerStorage()
const {
  isOpen: isDialogOpen,
  state: currentCustomer,
  open: openDialog,
  close: closeDialog,
} = useDialog<Customer>()

const { handleSubmit, toggleCustomerStatus } = useCustomerActions(customers, {
  onSuccess: closeDialog,
})

const { searchTerm, statusFilter, filteredCustomers } = useCustomerFilters(customers)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchTerm" placeholder="Search by name or CPF" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="statusFilter" :options="statusUserOptions" class="w-40" />
        <Button @click="openDialog()">Add Customer</Button>
      </div>
    </div>

    <CustomerForm
      v-if="isDialogOpen"
      :isOpen="isDialogOpen"
      :customer="currentCustomer"
      @submit="handleSubmit"
      @close="closeDialog"
    />

    <CustomerTable
      :customers="filteredCustomers.map(formatCustomerForDisplay)"
      @edit="openDialog"
      @deactivate="toggleCustomerStatus"
    />
  </div>
</template>
