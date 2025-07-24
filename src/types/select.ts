export interface SelectOption {
  value: string
  label: string
}

export type StatusOptionValue = 'all' | 'active' | 'inactive'

export interface StatusOption extends SelectOption {
  value: StatusOptionValue
}
