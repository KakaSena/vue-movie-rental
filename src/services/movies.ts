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
const RESULTS_PER_PAGE = 10 // the default is 10

export const searchMovies = async (
  query: string,
  // @ts-ignore
  page = 1,
  type?: string,
  totalResults = 50
): Promise<SearchResponse> => {
  try {
    const pagesToFetch = Math.ceil(totalResults / RESULTS_PER_PAGE)
    const allMovies: Movie[] = []

    for (let currentPage = 1; currentPage <= pagesToFetch; currentPage++) {
      const url = new URL(BASE_URL)
      url.searchParams.set('apikey', API_KEY)
      url.searchParams.set('s', query)
      url.searchParams.set('page', currentPage.toString())
      if (type) url.searchParams.set('type', type)

      const response = await fetch(url.toString())
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data: SearchResponse = await response.json()
      if (data.Response === 'False') throw new Error(data.Error || 'Unknown error occurred')

      allMovies.push(...data.Search)

      if (allMovies.length >= totalResults || data.Search.length < RESULTS_PER_PAGE) break
    }

    return {
      Search: allMovies.slice(0, totalResults),
      totalResults: String(allMovies.length),
      Response: 'True',
    }
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}
