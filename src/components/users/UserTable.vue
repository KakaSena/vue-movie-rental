<script setup>
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['edit', 'deactivate'])

const handleEdit = (user) => {
  emit('edit', user)
}

const handleDeactivate = (userId) => {
  emit('deactivate', userId)
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
            Document
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
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">{{ user.document }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="{
                'bg-green-100 text-green-800': user.status === 'active',
                'bg-red-100 text-red-800': user.status === 'inactive',
              }"
              class="px-2 py-1 text-xs font-semibold rounded-full"
            >
              {{ user.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <Button size="sm" @click="handleEdit(user)"> Edit </Button>
            <Button size="sm" variant="outline" @click="handleDeactivate(user.id)">
              {{ user.status === 'active' ? 'Deactivate' : 'Activate' }}
            </Button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No users found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
