<script setup>
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  customers: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['edit', 'deactivate'])

const handleEdit = (customer) => {
  emit('edit', customer)
}

const handleDeactivate = (customerId) => {
  emit('deactivate', customerId)
}

// Helper to format address for display
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
  <div class="border rounded-lg overflow-hidden">
    <!-- Responsive container -->
    <div class="overflow-x-auto">
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
              Contact
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
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
          <tr v-for="customer in customers" :key="customer.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">
                {{ customer.firstName }} {{ customer.lastName }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ customer.cpf }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ customer.email }}</div>
              <div class="text-sm text-gray-500">{{ customer.phone }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-500">
                {{ formatAddress(customer) }}
                <div v-if="customer.cep" class="text-xs text-gray-400 mt-1">
                  CEP: {{ customer.cep }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="{
                  'bg-green-100 text-green-800': customer.status === 'active',
                  'bg-red-100 text-red-800': customer.status === 'inactive',
                }"
                class="px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ customer.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <Button size="sm" @click="handleEdit(customer)"> Edit </Button>
              <Button
                size="sm"
                variant="outline"
                @click="handleDeactivate(customer.id)"
                :class="{
                  'text-red-600 border-red-300': customer.status === 'active',
                  'text-green-600 border-green-300': customer.status === 'inactive',
                }"
              >
                {{ customer.status === 'active' ? 'Deactivate' : 'Activate' }}
              </Button>
            </td>
          </tr>
          <tr v-if="customers.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
              No customers found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
