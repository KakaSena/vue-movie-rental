import { useLocalStorage } from '@vueuse/core'
import type { Rental, RentalWithDetails } from '@/types/rental'
import type { Customer } from '@/types/customer'
import type { Movie } from '@/types/movies'
import { getMovieDetails } from '@/services/movies'

export function useRentals(getMovieById?: (id: string) => Movie | undefined) {
  const rentals = useLocalStorage<Rental[]>('rentals', [])
  const customers = useLocalStorage<Customer[]>('customers', [])

  const getRentalsWithDetails = async (): Promise<RentalWithDetails[]> => {
    const detailedRentals: RentalWithDetails[] = await Promise.all(
      rentals.value.map(async (rental) => {
        let movie: Movie = {
          Title: 'Unknown Movie',
          Year: '',
          imdbID: rental.movieImdbID,
          Type: 'movie',
          Poster: '',
        }

        if (getMovieById) {
          const localMovie = getMovieById(rental.movieImdbID)
          if (localMovie) {
            movie = localMovie
          }
        }

        if (!movie || movie.Title === 'Unknown Movie') {
          try {
            movie = await getMovieDetails(rental.movieImdbID)
          } catch {
            movie = {
              Title: 'Unknown Movie',
              Year: '',
              imdbID: rental.movieImdbID,
              Type: 'movie',
              Poster: '',
            }
          }
        }

        const customer = customers.value.find((c) => c.id === rental.customerId) ?? {
          id: rental.customerId,
          firstName: 'Unknown',
          lastName: 'Customer',
          cpf: '',
          email: '',
          phone: '',
          cep: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
          status: 'inactive',
        }

        return {
          ...rental,
          movie,
          customer,
        }
      })
    )

    return detailedRentals
  }

  const addRental = (rental: Rental) => {
    rentals.value.push(rental)
  }

  const createRental = async ({
    customerId,
    movieImdbID,
    rentalDays,
  }: {
    customerId: string
    movieImdbID: string
    rentalDays: number
  }): Promise<Rental> => {
    const newRental: Rental = {
      id: Date.now().toString(),
      customerId,
      movieImdbID,
      rentalDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + rentalDays * 86400000).toISOString(),
      returnDate: null,
      status: 'rented',
    }

    addRental(newRental)
    return newRental
  }

  const canCustomerRent = (customerId: string): boolean => {
    return !rentals.value.some(
      (r) => r.customerId === customerId && (r.status === 'rented' || r.status === 'overdue')
    )
  }

  const returnRental = (rentalId: string) => {
    const rental = rentals.value.find((r) => r.id === rentalId)
    if (rental) {
      rental.returnDate = new Date().toISOString()
      rental.status =
        new Date(rental.returnDate) > new Date(rental.dueDate) ? 'overdue' : 'returned'
    }
  }

  const removeRental = (rentalId: string | number) => {
    rentals.value = rentals.value.filter((r) => r.id !== rentalId)
  }

  return {
    rentals,
    customers,
    getRentalsWithDetails,
    addRental,
    removeRental,
    createRental,
    canCustomerRent,
    returnRental,
  }
}
