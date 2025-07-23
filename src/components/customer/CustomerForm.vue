<script setup>
import { ref, watch, computed } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import Button from '@/components/ui/Button.vue'
import { mask } from 'vue-the-mask'
import { validatePhone, validateCPF } from '@/utils/validators'

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
  id: null,
  name: '',
  cpf: '',
  email: '',
  phone: '',
  status: 'active',
})

const vMask = mask
const phoneError = ref('')
const cpfError = ref('')

const isFormValid = computed(() => {
  return formData.value.name.trim() && !cpfError.value && !phoneError.value
})

watch(
  () => props.customer,
  (newCustomer) => {
    if (newCustomer) {
      formData.value = {
        ...newCustomer,
        id: newCustomer.id,
      }
    } else {
      formData.value = {
        id: null,
        name: '',
        cpf: '',
        email: '',
        phone: '',
        status: 'active',
      }
    }
    phoneError.value = ''
    cpfError.value = ''
  },
  { immediate: true }
)

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePhoneField = () => {
  if (!formData.value.phone) {
    phoneError.value = 'Phone number is required'
    return false
  }
  const isValid = validatePhone(formData.value.phone)
  phoneError.value = isValid ? '' : 'Invalid phone number format'
  return isValid
}

const validateCpfField = () => {
  if (!formData.value.cpf) {
    cpfError.value = 'CPF is required'
    return false
  }
  const isValid = validateCPF(formData.value.cpf)
  cpfError.value = isValid ? '' : 'Invalid CPF'
  return isValid
}

const handleSubmit = () => {
  const isPhoneValid = validatePhoneField()
  const isCpfValid = validateCpfField()

  if (!isPhoneValid || !isCpfValid) {
    return
  }

  const submitData = {
    ...formData.value,
    cpf: formData.value.cpf.replace(/\D/g, ''),
    phone: formData.value.phone.replace(/\D/g, ''),
  }

  emit('submit', submitData)
}
</script>

<template>
  <BaseDialog
    :isOpen="isOpen"
    :title="customer ? 'Edit Customer' : 'Create Customer'"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name *</label>
        <input
          v-model="formData.name"
          required
          class="w-full p-2 border rounded"
          :class="{ 'border-red-500': !formData.name.trim() }"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">CPF *</label>
        <input
          v-model="formData.cpf"
          v-mask="'###.###.###-##'"
          @blur="validateCpfField"
          required
          class="w-full p-2 border rounded"
          :class="{ 'border-red-500': cpfError }"
          placeholder="000.000.000-00"
        />
        <p v-if="cpfError" class="mt-1 text-sm text-red-600">{{ cpfError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="formData.email" type="email" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Phone *</label>
        <input
          v-model="formData.phone"
          v-mask="'(##) #####-####'"
          @blur="validatePhoneField"
          required
          class="w-full p-2 border rounded"
          :class="{ 'border-red-500': phoneError }"
          placeholder="(00) 00000-0000"
        />
        <p v-if="phoneError" class="mt-1 text-sm text-red-600">{{ phoneError }}</p>
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
        <Button type="submit" :disabled="!isFormValid">
          {{ customer ? 'Update' : 'Create' }}
        </Button>
      </div>
    </form>
  </BaseDialog>
</template>
