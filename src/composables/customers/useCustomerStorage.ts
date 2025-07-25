import { useStorage } from '@vueuse/core'
import { customerMockData } from '@/mocks/customers'
import type { Customer } from '@/types/customer'

export default function useCustomerStorage() {
  const customers = useStorage<Customer[]>('customers', customerMockData)

  if (customers.value && !Array.isArray(customers.value)) {
    customers.value = customerMockData
    console.warn('Reset customers data due to invalid format')
  }

  return customers
}
