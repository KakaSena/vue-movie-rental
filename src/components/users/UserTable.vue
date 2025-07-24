<script setup>
import DataTable from '@/components/Tables.vue'
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['edit', 'deactivate'])

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'document', label: 'Document' },
  {
    key: 'status',
    render: (customer) => `
      <span class="px-2 py-1 text-xs font-semibold rounded-full
        ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
        ${customer.status}
      </span>
    `,
  },
]

const actions = [
  {
    label: 'Edit',
    handler: (user) => emit('edit', user),
    size: 'sm',
  },
  {
    label: (user) => (user.status === 'active' ? 'Deactivate' : 'Activate'),
    handler: (user) => emit('deactivate', user.id),
    size: 'sm',
    variant: 'outline',
  },
]
</script>

<template>
  <DataTable :items="users" :columns="columns" :actions="actions" empty-message="No users found" />
</template>
