import type { MediaType } from "./Media"

type TMDBMedia = {
  adult: boolean
  backdrop_path: string | null
  id: number
  title?: string
  name?: string
  original_title?: string
  original_name?: string
  original_language: string
  overview: string
  poster_path: string | null
  popularity: number
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  media_type: 'movie' | 'tv' | 'person' | 'collection'
}

export const mapMedia = (m: TMDBMedia): MediaType => ({
  Adult: m.adult,
  BackdropPath: m.backdrop_path ?? '',
  Id: m.id,
  Title: m.title ?? m.name ?? '',
  OriginalTitle: m.original_title ?? m.original_name ?? '',
  OriginalLanguage: m.original_language,
  MediaType: m.media_type,
  Overview: m.overview,
  PosterPath: m.poster_path ?? '',
  Popularity: m.popularity,
  ReleaseDate: m.release_date ?? '',
  FirstAirDate: m.first_air_date ?? '',
  VoteAverage: m.vote_average,
  VoteCount: m.vote_count,
})