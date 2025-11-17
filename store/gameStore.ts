import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameState, SongGameState } from '@/types/game'

interface KathaVintaavaState {
  currentGame: GameState | null
  dailyGameId: string | null
  lastPlayedDate: string | null
  statistics: {
    gamesPlayed: number
    gamesWon: number
    currentStreak: number
    maxStreak: number
    guessDistribution: Record<number, number>
  }
  setCurrentGame: (game: GameState | null) => void
  setDailyGameId: (id: string) => void
  updateStatistics: (won: boolean, attempts: number) => void
  resetDailyGame: () => void
}

export const useKathaVintaavaStore = create<KathaVintaavaState>()(
  persist(
    (set, get) => ({
      currentGame: null,
      dailyGameId: null,
      lastPlayedDate: null,
      statistics: {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: {},
      },
      setCurrentGame: (game) => set({ currentGame: game }),
      setDailyGameId: (id) => {
        const today = new Date().toDateString()
        set({ dailyGameId: id, lastPlayedDate: today })
      },
      updateStatistics: (won, attempts) => {
        const { statistics, lastPlayedDate } = get()
        const today = new Date().toDateString()
        const isConsecutive = lastPlayedDate === new Date(Date.now() - 86400000).toDateString()

        const newStreak = won ? (isConsecutive ? statistics.currentStreak + 1 : 1) : 0

        set({
          statistics: {
            gamesPlayed: statistics.gamesPlayed + 1,
            gamesWon: statistics.gamesWon + (won ? 1 : 0),
            currentStreak: newStreak,
            maxStreak: Math.max(statistics.maxStreak, newStreak),
            guessDistribution: {
              ...statistics.guessDistribution,
              [attempts]: (statistics.guessDistribution[attempts] || 0) + 1,
            },
          },
          lastPlayedDate: today,
        })
      },
      resetDailyGame: () => set({ currentGame: null, dailyGameId: null }),
    }),
    {
      name: 'katha-vintaava-storage',
    }
  )
)

interface SaregamapaState {
  currentGame: SongGameState | null
  dailyGameId: string | null
  lastPlayedDate: string | null
  statistics: {
    gamesPlayed: number
    gamesWon: number
    currentStreak: number
    maxStreak: number
    guessDistribution: Record<number, number>
  }
  setCurrentGame: (game: SongGameState | null) => void
  setDailyGameId: (id: string) => void
  updateStatistics: (won: boolean, attempts: number) => void
  resetDailyGame: () => void
}

export const useSaregamapaStore = create<SaregamapaState>()(
  persist(
    (set, get) => ({
      currentGame: null,
      dailyGameId: null,
      lastPlayedDate: null,
      statistics: {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: {},
      },
      setCurrentGame: (game) => set({ currentGame: game }),
      setDailyGameId: (id) => {
        const today = new Date().toDateString()
        set({ dailyGameId: id, lastPlayedDate: today })
      },
      updateStatistics: (won, attempts) => {
        const { statistics, lastPlayedDate } = get()
        const today = new Date().toDateString()
        const isConsecutive = lastPlayedDate === new Date(Date.now() - 86400000).toDateString()

        const newStreak = won ? (isConsecutive ? statistics.currentStreak + 1 : 1) : 0

        set({
          statistics: {
            gamesPlayed: statistics.gamesPlayed + 1,
            gamesWon: statistics.gamesWon + (won ? 1 : 0),
            currentStreak: newStreak,
            maxStreak: Math.max(statistics.maxStreak, newStreak),
            guessDistribution: {
              ...statistics.guessDistribution,
              [attempts]: (statistics.guessDistribution[attempts] || 0) + 1,
            },
          },
          lastPlayedDate: today,
        })
      },
      resetDailyGame: () => set({ currentGame: null, dailyGameId: null }),
    }),
    {
      name: 'saregamapa-storage',
    }
  )
)
