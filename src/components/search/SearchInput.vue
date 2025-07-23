<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
  withIcon: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="relative flex-1">
    <Search
      v-if="withIcon"
      class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
    />
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :class="[
        'block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
        withIcon ? 'pl-10 pr-3' : 'px-3',
      ]"
    />
  </div>
</template>
