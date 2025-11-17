export const MAX_ATTEMPTS = 6

export const CLUE_ORDER = ['year', 'genre', 'actor', 'actress', 'director', 'hint'] as const

export const AUDIO_SEGMENTS = [5, 10, 15, 20, 25, 30] as const

export const ROUTES = {
  HOME: '/',
  KATHA_VINTAAVA: '/games/katha-vintaava',
  SAREGAMAPA: '/games/saregamapa',
  FANDOM: '/fandom',
  STORE: '/store',
  RECOMMENDATIONS: '/recommendations',
} as const

export const GENRE_OPTIONS = [
  'Action',
  'Drama',
  'Comedy',
  'Romance',
  'Thriller',
  'Horror',
  'Family',
  'Social',
  'Historical',
  'Biographical',
  'Fantasy',
  'Sci-Fi',
] as const
