import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MovieType } from '@/types/Movie'

function saveMovies(movies: MovieType[]) {
  localStorage.setItem('movies', JSON.stringify(movies))
}

function loadMovies(): MovieType[] {
  const movies = localStorage.getItem('movies')
  return movies ? JSON.parse(movies) : []
}

export const useMoviesStore = defineStore('movies', () => {
  const movieList = ref<MovieType[]>(loadMovies())

  function addMovie(movie: MovieType) {
    if (!movieList.value.find((m) => m.imdbID === movie.imdbID)) {
      movieList.value.push(movie)
      saveMovies(movieList.value)
    }
  }

  function removeMovie(movieId: string) {
    movieList.value = movieList.value.filter((m) => m.imdbID !== movieId)
    saveMovies(movieList.value)
  }

  return { movieList, addMovie, removeMovie }
})

// TODO: add state for search page

export const useSearchPageStore = defineStore('searchPage', () => {
  const movieList = ref<MovieType[]>()
  const searchPage = ref(0)
  const searchQuery = ref('')

  function setState(page: number, query: string, movies: MovieType[]) {
    searchPage.value = page
    searchQuery.value = query
    movieList.value = movies
  }
  return { searchPage, searchQuery, movieList, setState }
})
