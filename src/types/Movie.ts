export type MovieType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type MovieResponseType = {
  Search: MovieType[]
  totalResults: string
  Response: boolean
  ErrorMessage: string
}

export type MovieDetailsType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Plot: string
  Language: string
  Country: string
  imdbRating: string
  Error: boolean
  ErrorMessage: string
}
