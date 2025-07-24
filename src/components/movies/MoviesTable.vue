<script setup>
defineProps({
  movies: Array,
})

const fallbackImage = '/images/noPoster.jpg'

const getMoviePoster = (poster) => {
  return poster !== 'N/A' ? poster : fallbackImage
}

const handleImageError = (event) => {
  event.target.src = fallbackImage
  event.target.onerror = null // Prevent infinite loop if fallback fails
}
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Poster
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Year
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="movie in movies" :key="movie.imdbID">
            <td class="px-6 py-4 whitespace-nowrap">
              <img
                :src="getMoviePoster(movie.Poster)"
                onerror="this.onerror=null; this.src='/images/noPoster.jpg' "
                class="h-20 object-cover rounded"
                :alt="movie.Title"
              />
            </td>
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-gray-900">{{ movie.Title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ movie.Year }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap"></td>
          </tr>
          <tr v-if="movies.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No movies found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
