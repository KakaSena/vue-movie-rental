import type { Customer } from '@/types/customer'

export function formatCustomerForDisplay(customer: Customer) {
  return {
    ...customer,
    cpf: customer.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    phone: customer.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
    cep: customer.cep.replace(/(\d{5})(\d{3})/, '$1-$2'),
  }
}

export function formatCustomerForStorage(customer: Customer) {
  return {
    ...customer,
    cpf: customer.cpf.replace(/\D/g, ''),
    phone: customer.phone.replace(/\D/g, ''),
    cep: customer.cep.replace(/\D/g, ''),
  }
}
