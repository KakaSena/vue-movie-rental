<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import Button from '@/components/ui/Button.vue'
import { statusRentalOptions } from '@/constants/statusOptions'
import RentalTable from '@/components/rentals/RentalTable.vue'
import RentalForm from '@/components/rentals/RentalForm.vue'
import { useRentals } from '@/composables/useRental'
import type { RentalWithDetails } from '@/types/rental'

const searchTerm = ref('')
const statusFilter = ref('all')

const isRentalFormOpen = ref(false)

const { getRentalsWithDetails, customers, returnRental } = useRentals()

const rentals = ref<RentalWithDetails[]>([])

const loadRentals = async () => {
  rentals.value = await getRentalsWithDetails()
}

onMounted(() => {
  loadRentals()
})

const handleRentalCreated = () => {
  loadRentals()
  isRentalFormOpen.value = false
}

const handleReturnRental = async (rentalId: string) => {
  returnRental(rentalId)
  await loadRentals()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchTerm" placeholder="Search rentals..." :withIcon="true" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="statusFilter" :options="statusRentalOptions" class="w-40" />
        <Button @click="isRentalFormOpen = true"> New Rental </Button>
      </div>
    </div>

    <RentalForm
      :isOpen="isRentalFormOpen"
      @close="isRentalFormOpen = false"
      @created="handleRentalCreated"
      :customers="customers"
    />

    <RentalTable
      :items="rentals"
      :search-term="searchTerm"
      :status-filter="statusFilter"
      @return="handleReturnRental"
    />
  </div>
</template>
