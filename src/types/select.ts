export interface SelectOption<T = string> {
  value: T
  label: string
}

export type StatusUsersValue = 'all' | 'active' | 'inactive'
export type StatusRentalValue = 'all' | 'rented' | 'returned'

export type StatusUsersOption = SelectOption<StatusUsersValue>
export type StatusRentalOption = SelectOption<StatusRentalValue>
