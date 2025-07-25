<script setup>
import { ref, watch, computed } from 'vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import Button from '@/components/ui/Button.vue'
import { mask } from 'vue-the-mask'
import { validatePhone, validateCPF, validateCEP } from '@/utils/validators'
import { fetchAddressByCep } from '@/services/cep'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  customer: { type: Object, default: null },
})

const emit = defineEmits(['submit', 'close'])

const formData = ref({
  id: null,
  firstName: '',
  lastName: '',
  cpf: '',
  email: '',
  phone: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  status: 'active',
})

const vMask = mask
const phoneError = ref('')
const cpfError = ref('')
const cepError = ref('')
const cepNotFound = ref(false)
const isLoadingCep = ref(false)

const isFormValid = computed(() => {
  const firstName = formData.value.firstName.trim()
  const lastName = formData.value.lastName.trim()
  const street = formData.value.street.trim()
  const neighborhood = formData.value.neighborhood.trim()
  const city = formData.value.city.trim()
  const state = formData.value.state.trim()
  const cpfErr = cpfError.value
  const phoneErr = phoneError.value
  const cepErr = cepError.value
  const cepNotFoundVal = cepNotFound.value

  const requiredFieldsValid =
    firstName && lastName && !cpfErr && !phoneErr && (!cepErr || cepNotFoundVal)

  if (cepNotFoundVal) {
    return requiredFieldsValid && street && neighborhood && city && state
  }

  return requiredFieldsValid
})
watch(
  () => props.customer,
  (newCustomer) => {
    if (newCustomer) {
      formData.value = { ...newCustomer, id: newCustomer.id }
      cepNotFound.value = false
    } else {
      formData.value = {
        id: null,
        firstName: '',
        lastName: '',
        cpf: '',
        email: '',
        phone: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        status: 'active',
      }
      cepNotFound.value = false
    }
    phoneError.value = ''
    cpfError.value = ''
    cepError.value = ''
  },
  { immediate: true }
)

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

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

const validateCepField = () => {
  if (!formData.value.cep) {
    cepError.value = 'CEP is required'
    return false
  }
  const cleanedCep = formData.value.cep.replace(/\D/g, '')
  const isValid = cleanedCep.length === 8
  cepError.value = isValid ? '' : 'CEP must have 8 digits'
  return isValid
}

const fetchAddress = async () => {
  if (!validateCepField()) return

  const cleanedCep = formData.value.cep.replace(/\D/g, '')
  isLoadingCep.value = true
  cepNotFound.value = false

  const result = await fetchAddressByCep(cleanedCep)

  if (result.success) {
    formData.value.street = result.address.street
    formData.value.neighborhood = result.address.neighborhood
    formData.value.city = result.address.city
    formData.value.state = result.address.state
    cepError.value = ''
    cepNotFound.value = false
  } else {
    cepError.value = result.error
    cepNotFound.value = result.error === 'CEP not found'
    if (cepNotFound.value) {
      formData.value.street = ''
      formData.value.neighborhood = ''
      formData.value.city = ''
      formData.value.state = ''
    }
  }

  isLoadingCep.value = false
}

const handleSubmit = () => {
  const isPhoneValid = validatePhoneField()
  const isCpfValid = validateCpfField()
  const isCepValid = validateCepField() || cepNotFound.value

  if (!isPhoneValid || !isCpfValid || (!isCepValid && !cepNotFound.value)) {
    return
  }

  if (
    cepNotFound.value &&
    (!formData.value.street.trim() ||
      !formData.value.neighborhood.trim() ||
      !formData.value.city.trim() ||
      !formData.value.state.trim())
  ) {
    emit('error', 'Please fill all address fields manually')
    return
  }

  const submitData = {
    ...formData.value,
    firstName: formData.value.firstName.trim(),
    lastName: formData.value.lastName.trim(),
    cpf: formData.value.cpf.replace(/\D/g, ''),
    phone: formData.value.phone.replace(/\D/g, ''),
    cep: formData.value.cep.replace(/\D/g, ''),
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
    <form @submit.prevent="handleSubmit" class="space-y-6 max-h-[90vh] overflow-auto px-4 py-2">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">First Name *</label>
          <input
            v-model="formData.firstName"
            required
            class="w-full p-2 border rounded"
            :class="{ 'border-red-500': !formData.firstName.trim() }"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Last Name *</label>
          <input
            v-model="formData.lastName"
            required
            class="w-full p-2 border rounded"
            :class="{ 'border-red-500': !formData.lastName.trim() }"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="formData.email" type="email" class="w-full p-2 border rounded" />
        </div>
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

      <h3 class="font-semibold border-t pt-4 mb-2">Address Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">CEP *</label>
          <div class="flex items-center gap-2">
            <input
              v-model="formData.cep"
              v-mask="'#####-###'"
              @blur="fetchAddress"
              required
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': cepError && !cepNotFound }"
              placeholder="00000-000"
            />
            <button
              type="button"
              @click="fetchAddress"
              class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
              :disabled="isLoadingCep"
            >
              <span v-if="isLoadingCep">...</span>
              <span v-else>Search</span>
            </button>
          </div>
          <p v-if="cepError" class="mt-1 text-sm text-red-600">{{ cepError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Street *</label>
          <input
            v-model="formData.street"
            required
            class="w-full p-2 border rounded"
            :class="{ 'border-red-500': cepNotFound && !formData.street.trim() }"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Number</label>
          <input v-model="formData.number" class="w-full p-2 border rounded" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Complement</label>
          <input v-model="formData.complement" class="w-full p-2 border rounded" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Neighborhood *</label>
        <input
          v-model="formData.neighborhood"
          required
          class="w-full p-2 border rounded"
          :class="{ 'border-red-500': cepNotFound && !formData.neighborhood.trim() }"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">City *</label>
          <input
            v-model="formData.city"
            required
            class="w-full p-2 border rounded"
            :class="{ 'border-red-500': cepNotFound && !formData.city.trim() }"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">State *</label>
          <input
            v-model="formData.state"
            required
            class="w-full p-2 border rounded"
            :class="{ 'border-red-500': cepNotFound && !formData.state.trim() }"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Status</label>
        <select v-model="formData.status" class="w-full p-2 border rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div class="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" @click="$emit('close')">Cancel</Button>
        <Button type="submit" :disabled="!isFormValid">{{ customer ? 'Update' : 'Create' }}</Button>
      </div>
    </form>
  </BaseDialog>
</template>
