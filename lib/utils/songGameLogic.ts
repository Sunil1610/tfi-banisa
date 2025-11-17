import type { SongGameState } from '@/types/game'
import { AUDIO_SEGMENTS, MAX_ATTEMPTS } from '@/lib/constants'
import { titlesMatch } from '@/lib/utils'

/**
 * Initialize a new song game state
 */
export function initializeSongGame(songId: string): SongGameState {
  return {
    songId,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS,
    guesses: [],
    unlockedDuration: AUDIO_SEGMENTS[0], // Start with 5 seconds
    gameStatus: 'playing',
    currentAudioUrl: '',
  }
}

/**
 * Get unlocked duration based on attempts
 */
export function getUnlockedDuration(attempts: number): number {
  const index = Math.min(attempts, AUDIO_SEGMENTS.length - 1)
  return AUDIO_SEGMENTS[index]
}

/**
 * Check if a guess is correct for a song
 */
export function checkSongGuess(guess: string, songTitle: string): boolean {
  return titlesMatch(guess, songTitle, [])
}

/**
 * Process a song guess and update game state
 */
export function makeSongGuess(
  guess: string,
  songTitle: string,
  currentState: SongGameState
): { gameState: SongGameState; correct: boolean } {
  const correct = checkSongGuess(guess, songTitle)
  const newAttempts = currentState.attempts + 1
  const newDuration = getUnlockedDuration(newAttempts)

  const newGameState: SongGameState = {
    ...currentState,
    attempts: newAttempts,
    guesses: [...currentState.guesses, guess],
    unlockedDuration: newDuration,
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
 * Select a random song for practice mode
 */
export function selectRandomSong<T extends { id: string }>(songs: T[]): T {
  const randomIndex = Math.floor(Math.random() * songs.length)
  return songs[randomIndex]
}

/**
 * Select daily song based on date
 */
export function selectDailySong<T extends { id: string }>(
  songs: T[],
  date: Date = new Date()
): T {
  const dateString = date.toISOString().split('T')[0]
  const seed = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0)
  const index = seed % songs.length
  return songs[index]
}

/**
 * Generate share text for song game
 */
export function generateSongShareText(gameState: SongGameState, won: boolean): string {
  const attempts = gameState.attempts
  const maxAttempts = gameState.maxAttempts

  // Create emoji grid - audio segments
  const grid = Array.from({ length: maxAttempts }, (_, i) => {
    if (i < attempts - 1) return '🔊' // Incorrect guesses with audio
    if (i === attempts - 1 && won) return '🎵' // Winning guess
    if (i === attempts - 1 && !won) return '🔊' // Last incorrect guess
    return '🔇' // Not attempted
  }).join('')

  const status = won ? `${attempts}/${maxAttempts}` : 'X/6'

  return `Saregamapa ${status}\n\n${grid}\n\nPlay at Telugu Cinema Hub`
}

/**
 * Format duration display (e.g., "5s", "10s", "30s")
 */
export function formatAudioDuration(seconds: number): string {
  return `${seconds}s`
}

/**
 * Get audio segment URL based on attempt number
 */
export function getAudioSegmentUrl(baseUrl: string, attempts: number): string {
  const duration = getUnlockedDuration(attempts)
  return baseUrl.replace('{duration}', duration.toString())
}
