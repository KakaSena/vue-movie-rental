<script setup>
import SearchInput from '@/components/search/SearchInput.vue'
import SelectInput from '@/components/search/SelectInput.vue'
import MoviesTable from '@/components/movies/MoviesTable.vue'
import MoviesStatus from '@/components/movies/MoviesStatus.vue'
import useMovies from '@/composables/useMovies.ts'

const { searchQuery, yearFilter, isLoading, error, yearOptions, filteredMovies, fetchMovies } =
  useMovies()

// Initial fetch
fetchMovies()
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

    <!-- Status Components -->
    <MoviesStatus :isLoading="isLoading" :error="error" />

    <!-- Movie Table -->
    <MoviesTable v-if="!isLoading && !error" :movies="filteredMovies" />
  </div>
</template>
