import type { SelectRentalOption, StatusUsersOption } from '@/types/select'

export const statusUserOptions: readonly StatusUsersOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const statusRentalOptions: readonly SelectRentalOption[] = [
  { value: 'all', label: 'All Status' },
  { value: 'rented', label: 'Rented' },
  { value: 'delivered', label: 'Delivered' },
] as const
