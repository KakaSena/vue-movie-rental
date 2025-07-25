export type UserStatus = 'active' | 'inactive'

export interface User {
  id: number | string
  name: string
  document: string
  status: UserStatus
}
