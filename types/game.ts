export type ClueType = 'year' | 'genre' | 'actor' | 'actress' | 'director' | 'hint'

export interface Clue {
  type: ClueType
  value: string | string[]
  revealed: boolean
}

export interface GameState {
  movieId: string
  attempts: number
  maxAttempts: number
  guesses: string[]
  revealedClues: Clue[]
  gameStatus: 'playing' | 'won' | 'lost'
}

export interface SongGameState {
  songId: string
  attempts: number
  maxAttempts: number
  guesses: string[]
  unlockedDuration: number
  gameStatus: 'playing' | 'won' | 'lost'
  currentAudioUrl: string
}

export interface GameStats {
  id: string
  movieId: string
  userId?: string
  guessCount: number
  won: boolean
  playedAt: Date
}
