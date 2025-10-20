import type { MovieResponseType, MovieType } from '@/types/Movie'
import axios from 'axios'

const API_KEY = '595695c3' // I know this should not be here and I dont care

const instance = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  timeout: 6969,
  params: {
    apikey: API_KEY,
  },
})

export const searchMovies = async (query: string): Promise<MovieResponseType> => {
  const response = await instance.get(``, {
    params: {
      s: query,
    },
  })

  // if (response.data.Response === 'False') {
  //   throw new Error(response.data.Error)
  // }

  const data: MovieResponseType = {
    Search: response.data.Search as MovieType[],
    totalResults: response.data.totalResults,
    Response: response.data.Response === 'True',
    ErrorMessage: response.data.Error || '',
  }

  return data
}

export const loadMoreMovies = async (query: string, page: number) => {
  const response = await instance.get(``, {
    params: {
      s: query,
      page: page,
    },
  })

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error)
  }

  return response.data
}

export const getMovie = async (id: string) => {
  const response = await instance.get(``, {
    params: {
      i: id,
      plot: 'full',
    },
  })

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error)
  }

  return response.data
}
