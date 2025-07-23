<script setup>
import { ref, watch } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import Button from '@/components/ui/Button.vue'
import { mask } from 'vue-the-mask'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  customer: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'close'])

const formData = ref({
  name: '',
  cpf: '',
  email: '',
  phone: '',
  status: 'active',
})

const vMask = mask

watch(
  () => props.client,
  (newCustomer) => {
    if (newCustomer) {
      formData.value = { ...newCustomer }
    } else {
      formData.value = {
        name: '',
        cpf: '',
        email: '',
        phone: '',
        status: 'active',
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>

<template>
  <BaseDialog
    :isOpen="isOpen"
    :title="client ? 'Edit Client' : 'Create Client'"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name *</label>
        <input v-model="formData.name" required class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">CPF *</label>
        <input
          v-model="formData.cpf"
          v-mask="'###.###.###-##'"
          required
          class="w-full p-2 border rounded"
          placeholder="000.000.000-00"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="formData.email"
          type="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          class="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Phone</label>
        <input
          v-model="formData.phone"
          class="w-full p-2 border rounded"
          placeholder="(00) 00000-0000"
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
          {{ client ? 'Update' : 'Create' }}
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>
