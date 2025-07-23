<script setup>
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  clients: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['edit', 'deactivate'])

const handleEdit = (client) => {
  emit('edit', client)
}

const handleDeactivate = (clientId) => {
  emit('deactivate', clientId)
}
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            CPF
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="client in clients" :key="client.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">{{ client.cpf }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">{{ client.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">{{ client.phone }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="{
                'bg-green-100 text-green-800': client.status === 'active',
                'bg-red-100 text-red-800': client.status === 'inactive',
              }"
              class="px-2 py-1 text-xs font-semibold rounded-full"
            >
              {{ client.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <Button size="sm" @click="handleEdit(client)"> Edit </Button>
            <Button size="sm" variant="outline" @click="handleDeactivate(client.id)">
              {{ client.status === 'active' ? 'Deactivate' : 'Activate' }}
            </Button>
          </td>
        </tr>
        <tr v-if="clients.length === 0">
          <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No clients found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
