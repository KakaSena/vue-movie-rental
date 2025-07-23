<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { PropType } from 'vue'

defineProps({
  variant: {
    type: String as () => 'default' | 'outline' | 'destructive',
    default: 'default',
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
  },
  icon: {
    type: [Object, String] as PropType<Component | 'plus'>,
    default: null,
  },
  iconPosition: {
    type: String as () => 'left' | 'right',
    default: 'left',
  },
})
</script>

<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      'disabled:opacity-50 disabled:pointer-events-none',
      {
        'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'default',
        'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50': variant === 'outline',
        'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
        'flex-row-reverse': iconPosition === 'right',
      },
    ]"
  >
    <template v-if="icon">
      <Plus
        v-if="icon === 'plus'"
        class="h-4 w-4"
        :class="iconPosition === 'left' ? 'mr-2' : 'ml-2'"
      />
      <component
        v-else
        :is="icon"
        class="h-4 w-4"
        :class="iconPosition === 'left' ? 'mr-2' : 'ml-2'"
      />
    </template>
    <slot />
  </button>
</template>
