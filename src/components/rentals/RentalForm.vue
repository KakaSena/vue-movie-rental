<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import Button from '@/components/ui/Button.vue'
import { useRentals } from '@/composables/useRental'
import { searchMovies } from '@/services/movies'
import type { Customer } from '@/types/customer'
import type { Movie } from '@/types/movies'

const props = defineProps<{
  isOpen: boolean
  customers: Customer[]
}>()

const emit = defineEmits(['close', 'created'])

const { customers: propCustomers, createRental, canCustomerRent } = useRentals()

// Form data
const formData = ref({
  customerId: '' as Customer['id'] | '',
  movieQuery: '',
  movieImdbID: '' as Movie['imdbID'] | '',
  rentalDays: 7,
})

// UI state
const searchResults = ref<Movie[]>([])
const selectedMovie = ref<Movie | null>(null)
const isSearching = ref(false)
const errorMessage = ref('')

// Computed properties
const isCustomerEligible = computed(() => {
  if (!formData.value.customerId) return true
  return canCustomerRent(String(formData.value.customerId))
})

const isFormValid = computed(() => {
  return (
    formData.value.customerId &&
    formData.value.movieImdbID &&
    formData.value.rentalDays > 0 &&
    isCustomerEligible.value
  )
})

// Watch for customer changes
watch(
  () => formData.value.customerId,
  (newVal) => {
    errorMessage.value = ''
    if (newVal && !isCustomerEligible.value) {
      errorMessage.value = 'This customer has active/overdue rentals and cannot rent new movies'
    }
  }
)

// Methods
const searchForMovies = async () => {
  if (!formData.value.movieQuery.trim()) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  errorMessage.value = ''

  try {
    const result = await searchMovies(formData.value.movieQuery)
    searchResults.value = result.Search
  } catch (error) {
    errorMessage.value = 'Failed to search movies. Please try again.'
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

const selectMovie = (movie: Movie) => {
  selectedMovie.value = movie
  formData.value.movieImdbID = movie.imdbID
  errorMessage.value = ''
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  try {
    const newRental = await createRental({
      customerId: String(formData.value.customerId),
      movieImdbID: formData.value.movieImdbID,
      rentalDays: formData.value.rentalDays,
    })

    emit('created', newRental)
    resetForm()
    emit('close')
  } catch (error) {
    errorMessage.value = `Error: ${error instanceof Error ? error.message : 'Failed to create rental'}`
  }
}

const resetForm = () => {
  formData.value = {
    customerId: '',
    movieQuery: '',
    movieImdbID: '',
    rentalDays: 7,
  }
  searchResults.value = []
  selectedMovie.value = null
  errorMessage.value = ''
}
</script>

<template>
  <BaseDialog :isOpen="isOpen" title="Create Rental" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="errorMessage" class="p-2 bg-red-100 text-red-800 rounded text-sm">
        {{ errorMessage }}
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Customer *</label>
        <select
          v-model="formData.customerId"
          class="w-full p-2 border rounded"
          :class="{
            'border-red-500': formData.customerId && !isCustomerEligible,
            'border-gray-300': !formData.customerId || isCustomerEligible,
          }"
          required
        >
          <option value="" disabled>Select a customer</option>
          <option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.id"
            :disabled="!canCustomerRent(String(customer.id))"
          >
            {{ customer.firstName }} {{ customer.lastName }}
            {{
              !canCustomerRent(String(customer.id))
                ? '(Cannot rent - has active/overdue rentals)'
                : ''
            }}
          </option>
        </select>
        <p v-if="formData.customerId && !isCustomerEligible" class="mt-1 text-sm text-red-600">
          This customer cannot rent new movies until all active rentals are returned
        </p>
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Movie *</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="formData.movieQuery"
            @keyup.enter="searchForMovies"
            class="flex-1 p-2 border rounded"
            placeholder="Search movie title..."
            required
          />
          <Button @click="searchForMovies" :loading="isSearching" type="button" variant="outline">
            Search
          </Button>
        </div>

        <div v-if="searchResults.length > 0" class="border rounded max-h-40 overflow-y-auto">
          <div
            v-for="movie in searchResults"
            :key="movie.imdbID"
            @click="selectMovie(movie)"
            class="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
            :class="{ 'bg-blue-50': selectedMovie?.imdbID === movie.imdbID }"
          >
            <img
              v-if="movie.Poster !== 'N/A'"
              :src="movie.Poster"
              class="w-10 h-10 object-cover rounded"
            />
            <div v-else class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded">
              <span class="text-xs text-gray-500">No image</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium truncate">{{ movie.Title }}</div>
              <div class="text-sm text-gray-500">{{ movie.Year }} • {{ movie.Type }}</div>
            </div>
          </div>
        </div>

        <div v-if="selectedMovie" class="mt-2 p-3 bg-gray-50 rounded flex items-center gap-3">
          <img
            v-if="selectedMovie.Poster !== 'N/A'"
            :src="selectedMovie.Poster"
            class="w-12 h-12 object-cover rounded"
          />
          <div v-else class="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
            <span class="text-xs text-gray-500">No image</span>
          </div>
          <div>
            <div class="font-medium">{{ selectedMovie.Title }}</div>
            <div class="text-sm text-gray-500">{{ selectedMovie.Year }}</div>
          </div>
        </div>
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Rental Duration (Days) *</label>
        <input
          v-model.number="formData.rentalDays"
          type="number"
          min="1"
          max="30"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" @click="$emit('close')"> Cancel </Button>
        <Button type="submit" :disabled="!isFormValid"> Create Rental </Button>
      </div>
    </form>
  </BaseDialog>
</template>
