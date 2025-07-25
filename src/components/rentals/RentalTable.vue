<script setup lang="ts">
import Table from '@/components/ui/Tables.vue'
import type { RentalWithDetails } from '@/types/rental'
import { computed } from 'vue'

const props = defineProps<{
  items: RentalWithDetails[]
  searchTerm?: string
  statusFilter?: string
}>()

const emit = defineEmits(['return'])

const columns = [
  {
    key: 'customer',
    label: 'Customer',
    render: (rental: RentalWithDetails) =>
      `${rental.customer.firstName} ${rental.customer.lastName}`,
  },
  {
    key: 'movie',
    label: 'Movie',
    render: (rental: RentalWithDetails) => `${rental.movie.Title} (${rental.movie.Year})`,
  },
  {
    key: 'rentalDate',
    label: 'Rented On',
    render: (rental: RentalWithDetails) => new Date(rental.rentalDate).toLocaleDateString(),
  },
  {
    key: 'dueDate',
    label: 'Due Date',
    render: (rental: RentalWithDetails) => new Date(rental.dueDate).toLocaleDateString(),
  },
  {
    key: 'status',
    label: 'Status',
    render: (rental: RentalWithDetails) => {
      const isOverdue = rental.status === 'overdue'
      const isReturned = rental.status === 'returned'

      return `
        <span class="px-2 py-1 text-xs font-semibold rounded-full
          ${
            isOverdue
              ? 'bg-red-100 text-red-800'
              : isReturned
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
          }">
          ${rental.status}${isOverdue ? ' (Overdue)' : ''}
        </span>
      `
    },
  },
]

const actions = [
  {
    key: 'return',
    label: 'Return',
    size: 'sm',
    variant: 'outline',
    handler: (rental: RentalWithDetails) => emit('return', rental.id),
    show: (rental: RentalWithDetails) => rental.status === 'rented' || rental.status === 'overdue',
  },
]

const filteredRentals = computed(() => {
  return props.items.filter((rental) => {
    const matchesSearch =
      !props.searchTerm ||
      `${rental.customer.firstName} ${rental.customer.lastName}`
        .toLowerCase()
        .includes(props.searchTerm.toLowerCase()) ||
      rental.movie.Title.toLowerCase().includes(props.searchTerm.toLowerCase())

    const matchesStatus = props.statusFilter === 'all' || rental.status === props.statusFilter

    return matchesSearch && matchesStatus
  })
})
</script>

<template>
  <Table
    :items="filteredRentals"
    :columns="columns"
    :actions="actions"
    empty-message="No rentals found"
  />
</template>
