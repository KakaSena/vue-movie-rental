// src/utils/validators.ts
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 11 // Brazilian phones have 11 digits (including DDD)
}

export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')

  // Basic length check
  if (cleaned.length !== 11) return false

  // Validate CPF algorithm
  let sum = 0
  let remainder

  // First digit verification
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false

  // Second digit verification
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false

  return true
}

export const validateCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, '')
  return cleaned.length === 8
}
