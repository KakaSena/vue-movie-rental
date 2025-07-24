interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
  Error?: string
}

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = import.meta.env.VITE_OMDB_API_URL || 'https://www.omdbapi.com/'

export const searchMovies = async (
  query: string,
  page = 1,
  type?: string
): Promise<SearchResponse> => {
  const url = new URL(BASE_URL)
  url.searchParams.set('apikey', API_KEY)
  url.searchParams.set('s', query)
  url.searchParams.set('page', page.toString())
  if (type) {
    url.searchParams.set('type', type)
  }

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: SearchResponse = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Unknown error occurred')
    }

    return data
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

export const getMovieDetails = async (imdbID: string) => {
  const url = new URL(BASE_URL)
  url.searchParams.set('apikey', API_KEY)
  url.searchParams.set('i', imdbID)
  url.searchParams.set('plot', 'full')

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}
