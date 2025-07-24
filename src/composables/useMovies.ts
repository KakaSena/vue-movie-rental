import { ref, computed, watch } from 'vue'
import { searchMovies } from '@/services/movies'
import type { Movie, SearchResponse } from '@/types/movies'

interface YearOption {
  value: string
  label: string
}

export default function useMovies() {
  const movies = ref<Movie[]>([])
  const searchQuery = ref<string>('')
  const yearFilter = ref<string>('all')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchMovies = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response: SearchResponse = await searchMovies(searchQuery.value || 'movie', 1, 'movie')
      movies.value = (response.Search || []).map((movie) => ({
        ...movie,
        // Normalize year format by removing any non-year characters
        Year: movie.Year?.replace(/[^0-9–]/g, ''),
      }))
      console.log('Fetched movies:', movies.value)
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch movies'
      movies.value = []
    } finally {
      isLoading.value = false
    }
  }

  const yearOptions = computed<YearOption[]>(() => {
    const years = new Set<string>()
    movies.value.forEach((movie) => {
      if (movie.Year) {
        // Extract base year (handles both "2025" and "2025–2026" formats)
        const baseYear = movie.Year.split('–')[0].trim()
        years.add(baseYear)
      }
    })

    return [
      { value: 'all', label: 'All Years' },
      ...Array.from(years).map((year) => ({
        value: year,
        label: year,
      })),
    ].sort((a, b) => b.value.localeCompare(a.value))
  })

  const filteredMovies = computed<Movie[]>(() => {
    if (yearFilter.value === 'all') return movies.value

    return movies.value.filter((movie) => {
      if (!movie.Year) return false

      // Compare only the base year (first part of range)
      const movieYear = movie.Year.split('–')[0].trim()
      return movieYear === yearFilter.value
    })
  })

  // Debug filter changes
  watch(yearFilter, (newYear) => {
    console.log(`Year filter changed to: ${newYear}`)
    console.log(
      'Matching movies:',
      filteredMovies.value.map((m) => `${m.Title} (${m.Year})`)
    )
  })

  // Debounced search
  watch(searchQuery, (newVal: string) => {
    const handler = setTimeout(() => {
      if (newVal.trim().length >= 3 || newVal === '') {
        fetchMovies()
      }
    }, 500)

    return () => clearTimeout(handler)
  })

  return {
    movies,
    searchQuery,
    yearFilter,
    isLoading,
    error,
    yearOptions,
    filteredMovies,
    fetchMovies,
  }
}
