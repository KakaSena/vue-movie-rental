<script setup>
import { ref, computed } from 'vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import MoviesCard from '@/components/movies/MoviesCard.vue'
import MoviesStatus from '@/components/movies/MoviesStatus.vue'
import useMovies from '@/composables/useMovies.ts'

const { searchQuery, yearFilter, isLoading, error, yearOptions, filteredMovies, fetchMovies } =
  useMovies()

fetchMovies()

const currentPage = ref(1)
const itemsPerPage = 20

const totalPages = computed(() => Math.ceil(filteredMovies.value.length / itemsPerPage))

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredMovies.value.slice(start, end)
})

import { watch } from 'vue'

watch([searchQuery, yearFilter], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="space-y-6">
    <!-- Search and Filter Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1">
        <SearchInput v-model="searchQuery" placeholder="Search movies..." :withIcon="true" />
      </div>
      <div class="flex items-center gap-4">
        <SelectInput v-model="yearFilter" :options="yearOptions" class="w-32" />
      </div>
    </div>

    <MoviesStatus :isLoading="isLoading" :error="error" />

    <MoviesCard v-if="!isLoading && !error" :movies="paginatedMovies" />

    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-3 py-1 rounded border transition',
          currentPage === page ? 'bg-blue-950 text-white' : 'bg-white text-gray-800',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
