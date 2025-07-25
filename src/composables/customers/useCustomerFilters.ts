import { ref, computed, type Ref } from 'vue'
import type { Customer, CustomerStatus } from '@/types/customer'

export function useCustomerFilters(customers: Ref<Customer[]>) {
  const searchTerm = ref('')
  const statusFilter = ref<CustomerStatus | 'all'>('all')

  const filteredCustomers = computed(() => {
    let result = customers.value

    if (statusFilter.value !== 'all') {
      result = result.filter((customer) => customer.status === statusFilter.value)
    }

    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase()
      result = result.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(term) ||
          customer.lastName.toLowerCase().includes(term) ||
          customer.cpf.includes(term)
      )
    }

    return result
  })

  return {
    searchTerm,
    statusFilter,
    filteredCustomers,
  }
}
