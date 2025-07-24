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
  <div class="rounded-lg overflow-hidden">
    <div
      class="overflow-x-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div v-for="movie in movies" :key="movie.imdbID">
        <div class="h-full px-6 py-4 whitespace-nowrap bg-gray-100 rounded-lg">
          <img
            :src="getMoviePoster(movie.Poster)"
            onerror="this.onerror=null; this.src='/images/noPoster.jpg' "
            class="mb-3 h-35 object-cover rounded aspect-[3/4]"
            :alt="movie.Title"
          />
          <p class="mb-2 text-wrap text-sm font-medium text-gray-900">{{ movie.Title }}</p>
          <span class="bg-blue-950 rounded-full bg px-2 py-1 text-xs font-semibold text-white">
            {{ movie.Year }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
