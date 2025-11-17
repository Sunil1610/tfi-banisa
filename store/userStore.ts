import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferences {
  theme: 'dark' | 'light'
  soundEnabled: boolean
  language: 'en' | 'te'
  autoPlayAudio: boolean
}

interface WatchlistItem {
  movieId: string
  addedAt: string
  watched: boolean
}

interface UserState {
  preferences: UserPreferences
  watchlist: WatchlistItem[]
  setPreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void
  addToWatchlist: (movieId: string) => void
  removeFromWatchlist: (movieId: string) => void
  markAsWatched: (movieId: string) => void
  isInWatchlist: (movieId: string) => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      preferences: {
        theme: 'dark',
        soundEnabled: true,
        language: 'en',
        autoPlayAudio: false,
      },
      watchlist: [],
      setPreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        })),
      addToWatchlist: (movieId) =>
        set((state) => {
          if (state.watchlist.some((item) => item.movieId === movieId)) {
            return state
          }
          return {
            watchlist: [
              ...state.watchlist,
              {
                movieId,
                addedAt: new Date().toISOString(),
                watched: false,
              },
            ],
          }
        }),
      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.movieId !== movieId),
        })),
      markAsWatched: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.map((item) =>
            item.movieId === movieId ? { ...item, watched: true } : item
          ),
        })),
      isInWatchlist: (movieId) =>
        get().watchlist.some((item) => item.movieId === movieId),
    }),
    {
      name: 'user-preferences-storage',
    }
  )
)
