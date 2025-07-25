export type UserStatus = 'active' | 'inactive'

export interface User {
  id: number | string
  name: string
  document: string
  password: string
  status: UserStatus
}
