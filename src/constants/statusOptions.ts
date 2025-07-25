import type { StatusRentalOption, StatusUsersOption } from '@/types/select'

export const statusUserOptions: readonly StatusUsersOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const statusRentalOptions: readonly StatusRentalOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'rented', label: 'Rented' },
  { value: 'returned', label: 'Returned' },
] as const
