import type { GameState, Clue, ClueType } from '@/types/game'
import type { Movie } from '@/types/movie'
import { CLUE_ORDER, MAX_ATTEMPTS } from '@/lib/constants'
import { titlesMatch } from '@/lib/utils'

/**
 * Initialize a new game state
 */
export function initializeGame(movieId: string): GameState {
  return {
    movieId,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS,
    guesses: [],
    revealedClues: [],
    gameStatus: 'playing',
  }
}

/**
 * Get clues for a movie in order
 */
export function getCluesForMovie(movie: Movie): Clue[] {
  return [
    {
      type: 'year',
      value: movie.year.toString(),
      revealed: false,
    },
    {
      type: 'genre',
      value: movie.genre,
      revealed: false,
    },
    {
      type: 'actor',
      value: movie.leadActor,
      revealed: false,
    },
    {
      type: 'actress',
      value: movie.leadActress,
      revealed: false,
    },
    {
      type: 'director',
      value: movie.director,
      revealed: false,
    },
    {
      type: 'hint',
      value: movie.plotHint,
      revealed: false,
    },
  ]
}

/**
 * Reveal the next clue based on current attempts
 */
export function revealNextClue(gameState: GameState, allClues: Clue[]): Clue[] {
  const clueIndex = Math.min(gameState.attempts, allClues.length - 1)

  return allClues.map((clue, index) => ({
    ...clue,
    revealed: index <= clueIndex,
  }))
}

/**
 * Check if a guess is correct
 */
export function checkGuess(guess: string, movie: Movie): boolean {
  return titlesMatch(guess, movie.title, movie.alternativeTitles)
}

/**
 * Process a guess and update game state
 */
export function makeGuess(
  guess: string,
  movie: Movie,
  currentState: GameState
): { gameState: GameState; correct: boolean } {
  const correct = checkGuess(guess, movie)
  const newAttempts = currentState.attempts + 1

  const newGameState: GameState = {
    ...currentState,
    attempts: newAttempts,
    guesses: [...currentState.guesses, guess],
    gameStatus: correct
      ? 'won'
      : newAttempts >= MAX_ATTEMPTS
      ? 'lost'
      : 'playing',
  }

  return {
    gameState: newGameState,
    correct,
  }
}

/**
 * Select a random movie for practice mode
 */
export function selectRandomMovie(movies: Movie[]): Movie {
  const randomIndex = Math.floor(Math.random() * movies.length)
  return movies[randomIndex]
}

/**
 * Select daily movie based on date
 */
export function selectDailyMovie(movies: Movie[], date: Date = new Date()): Movie {
  // Use date as seed for consistent daily movie
  const dateString = date.toISOString().split('T')[0]
  const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0)
  const index = seed % movies.length
  return movies[index]
}

/**
 * Get clue icon based on type
 */
export function getClueIcon(type: ClueType): string {
  const icons: Record<ClueType, string> = {
    year: '📅',
    genre: '🎭',
    actor: '👨‍🎤',
    actress: '👩‍🎤',
    director: '🎬',
    hint: '💡',
  }
  return icons[type]
}

/**
 * Get clue label based on type
 */
export function getClueLabel(type: ClueType): string {
  const labels: Record<ClueType, string> = {
    year: 'Release Year',
    genre: 'Genre',
    actor: 'Lead Actor',
    actress: 'Lead Actress',
    director: 'Director',
    hint: 'Plot Hint',
  }
  return labels[type]
}

/**
 * Format share text for social media
 */
export function generateShareText(gameState: GameState, won: boolean): string {
  const attempts = gameState.attempts
  const maxAttempts = gameState.maxAttempts

  // Create emoji grid
  const grid = Array.from({ length: maxAttempts }, (_, i) => {
    if (i < attempts - 1) return '⬜' // Incorrect guesses
    if (i === attempts - 1 && won) return '🟩' // Winning guess
    if (i === attempts - 1 && !won) return '⬜' // Last incorrect guess
    return '⬛' // Not attempted
  }).join('')

  const status = won ? `${attempts}/${maxAttempts}` : 'X/6'

  return `Katha Vintaava ${status}\n\n${grid}\n\nPlay at Telugu Cinema Hub`
}
