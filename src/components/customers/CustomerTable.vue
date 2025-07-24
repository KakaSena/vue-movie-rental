<script setup>
import Table from '@/components/ui/Tables.vue'
import Button from '@/components/ui/Button.vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  customers: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['edit', 'deactivate'])

const columns = [
  {
    key: 'name',
    label: 'Name',
    render: (customer) => `${customer.firstName} ${customer.lastName}`,
  },
  {
    key: 'cpf',
    label: 'CPF',
  },
  {
    key: 'contact',
    label: 'Contact',
    render: (customer) => `
      <p>${customer.email}</p>
      <p>${customer.phone}</div>
    `,
  },
  {
    key: 'address',
    label: 'Address',
    render: (customer) => `
      <div class="text-sm ">
        ${formatAddress(customer)}
        ${customer.cep ? `<div class="text-xs  mt-1">CEP: ${customer.cep}</div>` : ''}
      </div>
    `,
  },
  {
    key: 'status',
    label: 'Status',
    render: (customer) => `
      <span class="px-2 py-1 text-xs font-semibold rounded-full
        ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
        ${customer.status}
      </span>
    `,
  },
]

const handleStatusChange = (customer) => {
  emit('deactivate', customer.id)
  toast.success(
    `Customer ${customer.status === 'active' ? 'deactivated' : 'activated'} successfully!`,
    {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  )
}

const actions = [
  {
    key: 'edit',
    label: 'Edit',
    size: 'sm',
    handler: (customer) => emit('edit', customer),
  },
  {
    key: 'toggle-status',
    label: (customer) => (customer.status === 'active' ? 'Deactivate' : 'Activate'),
    size: 'sm',
    variant: 'outline',
    handler: handleStatusChange,
  },
]

const formatAddress = (customer) => {
  const parts = [
    customer.street,
    customer.number,
    customer.complement,
    customer.neighborhood,
    customer.city,
    customer.state,
  ].filter(Boolean)
  return parts.join(', ')
}
</script>

<template>
  <Table
    :items="customers"
    :columns="columns"
    :actions="actions"
    empty-message="No customers found"
  />
</template>
