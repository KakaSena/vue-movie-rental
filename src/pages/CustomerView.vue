<script setup>
import { ref, computed } from 'vue'
import { customerMockData } from '@/mocks/customers'
import CustomerForm from '@/components/customer/CustomerForm.vue'
import CustomerTable from '@/components/customer/CustomerTable.vue'
import Button from '@/components/ui/Button.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'

const customers = ref([...customerMockData])
const isDialogOpen = ref(false)
const currentCustomer = ref(null)
const searchTerm = ref('')
const statusFilter = ref('all')

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const openDialog = (customer = null) => {
  currentCustomer.value = customer
  isDialogOpen.value = true
}

const handleSubmit = (customerData) => {
  if (customerData.id) {
    const index = customers.value.findIndex((c) => c.id === customerData.id)
    if (index !== -1) {
      customers.value[index] = customerData
    }
  } else {
    customers.value.push({
      ...customerData,
      id: Date.now(),
    })
  }
  isDialogOpen.value = false
}

const formatForDisplay = (customer) => {
  return {
    ...customer,
    cpf: customer.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    phone: customer.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
    cep: customer.cep.replace(/(\d{5})(\d{3})/, '$1-$2'),
  }
}

const toggleCustomerStatus = (customerId) => {
  const customer = customers.value.find((c) => c.id === customerId)
  if (customer) {
    customer.status = customer.status === 'active' ? 'inactive' : 'active'
  }
}

const filteredCustomers = computed(() => {
  let result = customers.value

  // Apply status filter if not 'all'
  if (statusFilter.value !== 'all') {
    result = result.filter((customer) => customer.status === statusFilter.value)
  }

  // Apply search term filter if exists
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter((customer) => {
      return (
        customer.firstName.toLowerCase().includes(term) ||
        customer.lastName.toLowerCase().includes(term) ||
        customer.cpf.includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
      )
    })
  }

  return result
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchTerm" placeholder="Search by name, CPF, email or phone" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="statusFilter" :options="statusOptions" class="w-40" />
        <Button @click="openDialog()">Add Customer</Button>
      </div>
    </div>

    <CustomerForm
      v-if="isDialogOpen"
      :isOpen="isDialogOpen"
      :customer="currentCustomer"
      @submit="handleSubmit"
      @close="isDialogOpen = false"
    />

    <CustomerTable
      :customers="filteredCustomers.map(formatForDisplay)"
      @edit="openDialog"
      @deactivate="toggleCustomerStatus"
    />
  </div>
</template>
