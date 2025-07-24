<script setup>
defineProps({
  isLoading: Boolean,
  error: String,
})
</script>

<template>
  <div v-if="isLoading" class="text-center py-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    <p class="mt-2 text-gray-600">Loading movies...</p>
  </div>

  <div v-else-if="error" class="text-center py-8 text-red-500">
    {{ error }}
  </div>
</template>
