<script setup>
import { ref } from 'vue'
import { customerMockData } from '@/mocks/customers'
import CustomerForm from '@/components/customer/CustomerForm.vue'
import CustomerTable from '@/components/customer/CustomerTable.vue'
import Button from '@/components/ui/Button.vue'

const customers = ref([...customerMockData])

const isDialogOpen = ref(false)
const currentCustomer = ref(null)

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
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-end">
      <Button @click="openDialog()" class="mb-4"> Add Customer </Button>
    </div>

    <CustomerForm
      v-if="isDialogOpen"
      :isOpen="isDialogOpen"
      :customer="currentCustomer"
      @submit="handleSubmit"
      @close="isDialogOpen = false"
    />

    <CustomerTable
      :customers="customers.map(formatForDisplay)"
      @edit="openDialog"
      @deactivate="toggleCustomerStatus"
    />
  </div>
</template>
