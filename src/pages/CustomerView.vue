<script setup>
import { ref } from 'vue'
import CustomerForm from '@/components/customer/CustomerForm.vue'
import CustomerTable from '@/components/customer/CustomerTable.vue'
import Button from '@/components/ui/Button.vue'

const clients = ref([
  {
    id: 1,
    name: 'John Doe',
    cpf: '123.456.789-00',
    email: 'john@example.com',
    phone: '(11) 98765-4321',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    cpf: '987.654.321-00',
    email: 'jane@example.com',
    phone: '(11) 91234-5678',
    status: 'inactive',
  },
])

// State
const isDialogOpen = ref(false)
const currentCustomer = ref(null)

// Actions
const openDialog = (client = null) => {
  currentCustomer.value = client
  isDialogOpen.value = true
}

const handleSubmit = (clientData) => {
  if (clientData.id) {
    // Update existing client
    const index = clients.value.findIndex((c) => c.id === clientData.id)
    if (index !== -1) {
      clients.value[index] = clientData
    }
  } else {
    // Add new client
    clients.value.push({
      ...clientData,
      id: Date.now(), // Simple ID generation
    })
  }
  isDialogOpen.value = false
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
      :client="currentCustomer"
      @submit="handleSubmit"
      @close="isDialogOpen = false"
    />

    <CustomerTable :clients="clients" @edit="openDialog" @deactivate="toggleCustomerStatus" />
  </div>
</template>
