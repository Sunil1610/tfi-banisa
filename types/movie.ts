export interface Movie {
  id: string
  title: string
  titleTelugu: string
  alternativeTitles: string[]
  year: number
  genre: string[]
  leadActor: string
  leadActress: string
  director: string
  plotHint: string
  description: string
  posterUrl: string
  rating: number
  popularity: number
  cast?: CastMember[]
  crew?: CrewMember[]
  boxOffice?: BoxOffice
  awards?: Award[]
  trivia: string[]
  tags: string[]
  trailerUrl?: string
  imdbId?: string
  imdbRating?: number
  createdAt: Date
  updatedAt: Date
}

export interface CastMember {
  name: string
  role: string
  character?: string
}

export interface CrewMember {
  name: string
  role: string
}

export interface BoxOffice {
  budget?: number
  worldwide?: number
  india?: number
  overseas?: number
}

export interface Award {
  name: string
  category: string
  year: number
  won: boolean
}
