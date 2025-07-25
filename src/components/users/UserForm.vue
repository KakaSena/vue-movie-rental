<script setup>
import { ref, watch } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import Button from '@/components/ui/Button.vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'close'])

const formData = ref({
  name: '',
  document: '',
  status: 'active',
})

watch(
  () => props.user,
  (newUser) => {
    formData.value = newUser ? { ...newUser } : { name: '', document: '', status: 'active' }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  if (!formData.value.name.trim() || !formData.value.document.trim()) {
    toast.error('Please fill all required fields', {
      position: 'top-right',
      autoClose: 3000,
    })
    return
  }

  emit('submit', formData.value)
}
</script>

<template>
  <BaseDialog :is-open="isOpen" :title="user ? 'Edit User' : 'Create User'" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name *</label>
        <input v-model="formData.name" required class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Document *</label>
        <input v-model="formData.document" required class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Status</label>
        <select v-model="formData.status" class="w-full p-2 border rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" @click="$emit('close')"> Cancel </Button>
        <Button type="submit">
          {{ user ? 'Update' : 'Create' }}
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>
