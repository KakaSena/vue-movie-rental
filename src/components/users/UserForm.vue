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
    formData.value = newUser
      ? { ...newUser, password: '', confirmPassword: '' }
      : { name: '', document: '', password: '', confirmPassword: '', status: 'active' }
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

  if (!props.user || formData.value.password) {
    if (formData.value.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.value.password !== formData.value.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    const { confirmPassword, ...userData } = formData.value
    emit('submit', formData.value)
  }
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
        <label class="block text-sm font-medium mb-1">
          {{ user ? 'New Password' : 'Password *' }}
        </label>
        <input
          v-model="formData.password"
          type="password"
          :required="!user"
          class="w-full p-2 border rounded"
        />
        <p class="text-xs text-gray-500 mt-1" v-if="user">Leave blank to keep current password</p>
      </div>

      <div v-if="!user || formData.password">
        <label class="block text-sm font-medium mb-1">
          {{ user ? 'Confirm New Password' : 'Confirm Password *' }}
        </label>
        <input
          v-model="formData.confirmPassword"
          type="password"
          :required="!user || formData.password"
          class="w-full p-2 border rounded"
        />
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
