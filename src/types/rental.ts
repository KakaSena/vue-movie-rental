import type { Customer } from './customer'
import type { Movie } from './movies'

export type RentalStatus = 'rented' | 'returned' | 'overdue'

export interface Rental {
  id: string
  customerId: Customer['id']
  movieImdbID: Movie['imdbID']
  rentalDate: string
  dueDate: string
  returnDate: string | null
  status: RentalStatus
}

export interface RentalWithDetails extends Omit<Rental, 'customerId' | 'movieImdbID'> {
  customer: Customer
  movie: Movie
}
