<script setup>
import Button from './Button.vue'
const props = defineProps({
  items: Array,
  columns: Array,
  actions: Array,
  emptyMessage: String,
})
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
            <th
              v-if="actions.length > 0"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in items" :key="index">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
              :class="column.class"
              v-html="typeof column.render === 'function' ? column.render(item) : item[column.key]"
            ></td>
            <td
              v-if="actions.length > 0"
              class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"
            >
              <Button
                v-for="(action, actionIndex) in actions"
                :key="actionIndex"
                @click.stop="action.handler(item)"
                :size="action.size || 'sm'"
                :variant="action.variant || 'default'"
              >
                {{ typeof action.label === 'function' ? action.label(item) : action.label }}
              </Button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td
              :colspan="columns.length + (actions.length > 0 ? 1 : 0)"
              class="px-6 py-4 text-center text-sm text-gray-500"
            >
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
