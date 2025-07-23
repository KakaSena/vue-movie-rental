<script setup>
import { ref } from 'vue'
import CustomerForm from '@/components/customer/CustomerForm.vue'
import CustomerTable from '@/components/customer/CustomerTable.vue'
import Button from '@/components/ui/Button.vue'

const clients = ref([
  {
    id: 1,
    name: 'John Doe',
    cpf: '12345678900',
    email: 'john@example.com',
    phone: '11987654321',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    cpf: '98765432100',
    email: 'jane@example.com',
    phone: '11912345678',
    status: 'inactive',
  },
])

const isDialogOpen = ref(false)
const currentCustomer = ref(null)

const openDialog = (client = null) => {
  currentCustomer.value = client
  isDialogOpen.value = true
}

const handleSubmit = (clientData) => {
  if (clientData.id) {
    const index = clients.value.findIndex((c) => c.id === clientData.id)
    if (index !== -1) {
      clients.value[index] = clientData
    }
  } else {
    clients.value.push({
      ...clientData,
      id: Date.now(),
    })
  }
  isDialogOpen.value = false
}

const formatForDisplay = (client) => {
  return {
    ...client,
    cpf: client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    phone: client.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
  }
}

const toggleCustomerStatus = (clientId) => {
  const client = clients.value.find((c) => c.id === clientId)
  if (client) {
    client.status = client.status === 'active' ? 'inactive' : 'active'
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
      :clients="clients.map(formatForDisplay)"
      @edit="openDialog"
      @deactivate="toggleCustomerStatus"
    />
  </div>
</template>
