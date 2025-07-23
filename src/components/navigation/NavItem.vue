<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (item) => ['path', 'label', 'icon'].every((key) => key in item),
  },
})

const isActive = computed(() => {
  return route.name === props.item.name
})
</script>

<template>
  <router-link
    :to="{ path: item.path }"
    class="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded mx-2"
    :class="{ 'bg-gray-200': isActive }"
  >
    <component :is="item.icon" class="h-4 w-4" />
    <span>{{ item.label }}</span>
  </router-link>
</template>
