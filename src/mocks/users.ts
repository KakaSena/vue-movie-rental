import type { User } from '@/types/user'

export const userMockData: User[] = [
  { id: 1, name: 'Admin', document: '123456789', password: 'admin123', status: 'active' },
  { id: 2, name: 'Disabled user', document: '1234579', password: 'admin123', status: 'inactive' },
  { id: 3, name: 'kaka', document: '12345', password: '123', status: 'active' },
]
