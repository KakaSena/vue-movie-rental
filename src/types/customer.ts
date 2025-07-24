export type CustomerStatus = 'active' | 'inactive'

export interface Customer {
  id: number | string
  firstName: string
  lastName: string
  cpf: string
  email: string
  phone: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  status: CustomerStatus
}
