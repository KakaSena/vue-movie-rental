import { toast } from 'vue3-toastify'
import type { Customer } from '@/types/customer'
import type { Ref } from 'vue'

export function useCustomerActions(
  customers: Ref<Customer[]>,
  options?: {
    onSuccess?: () => void
  }
) {
  const handleSubmit = (customerData: Customer) => {
    try {
      if (customerData.id) {
        const index = customers.value.findIndex((c: Customer) => c.id === customerData.id)
        if (index !== -1) {
          customers.value[index] = customerData
          toast.success('Customer updated successfully!')
          options?.onSuccess?.()
          return true
        }
      } else {
        customers.value.push({
          ...customerData,
          id: Date.now(),
        })
        toast.success('Customer created successfully!')
        options?.onSuccess?.()
        return true
      }
      return false
    } catch (error) {
      toast.error('Failed to save customer')
      console.error(error)
      return false
    }
  }

  const toggleCustomerStatus = (customerId: number | string) => {
    const customer = customers.value.find((c: Customer) => c.id === customerId)
    if (customer) {
      customer.status = customer.status === 'active' ? 'inactive' : 'active'
      toast.success(`Customer status changed to ${customer.status}`)
    }
  }

  return {
    handleSubmit,
    toggleCustomerStatus,
  }
}
