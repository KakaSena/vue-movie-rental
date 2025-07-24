<script setup>
import Table from '@/components/ui/Tables.vue'
import Button from '@/components/ui/Button.vue'
import { toast } from 'vue3-toastify'

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
    render: (user) => `
      <span class="px-2 py-1 text-xs font-semibold rounded-full
        ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
        ${user.status}
      </span>
    `,
  },
]

const handleStatusChange = (user) => {
  emit('deactivate', user.id)
  toast.success(`User ${user.status === 'active' ? 'deactivated' : 'activated'} successfully!`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

const actions = [
  {
    key: 'edit',
    label: 'Edit',
    size: 'sm',
    handler: (user) => emit('edit', user),
  },
  {
    key: 'toggle-status',
    label: (user) => (user.status === 'active' ? 'Deactivate' : 'Activate'),
    size: 'sm',
    variant: 'outline',
    handler: handleStatusChange,
  },
]
</script>

<template>
  <Table :items="users" :columns="columns" :actions="actions" empty-message="No users found" />
</template>
