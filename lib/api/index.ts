import { api } from './client'
import type { Movie } from '@/types/movie'
import type { GameState, SongGameState } from '@/types/game'
import type { Product } from '@/types/product'

/**
 * Movie API
 */
export const movieAPI = {
  getAll: (params?: { page?: number; limit?: number; genre?: string }) =>
    api.get<Movie[]>('/api/movies', { params }),

  getById: (id: string) =>
    api.get<Movie>(`/api/movies/${id}`),

  getFeatured: () =>
    api.get<Movie>('/api/movies/featured'),

  search: (query: string) =>
    api.get<Movie[]>('/api/movies/search', { params: { q: query } }),
}

/**
 * Katha Vintaava Game API
 */
export const kathaVintaavaAPI = {
  startGame: () =>
    api.post<{ gameState: GameState; movieId: string }>('/api/games/katha-vintaava/start'),

  makeGuess: (data: { movieId: string; guess: string; gameState: GameState }) =>
    api.post<{ correct: boolean; gameState: GameState; movie?: Movie }>('/api/games/katha-vintaava/guess', data),

  getDailyChallenge: () =>
    api.get<{ gameState: GameState; movieId: string }>('/api/games/katha-vintaava/daily'),

  getStats: () =>
    api.get('/api/games/katha-vintaava/stats'),
}

/**
 * Saregamapa Game API
 */
export const saregamapaAPI = {
  startGame: () =>
    api.post<{ gameState: SongGameState; songId: string }>('/api/games/saregamapa/start'),

  makeGuess: (data: { songId: string; guess: string; gameState: SongGameState }) =>
    api.post<{ correct: boolean; gameState: SongGameState }>('/api/games/saregamapa/guess', data),

  getDailyChallenge: () =>
    api.get<{ gameState: SongGameState; songId: string }>('/api/games/saregamapa/daily'),

  getStats: () =>
    api.get('/api/games/saregamapa/stats'),

  getAudioSegment: (songId: string, segment: number) =>
    api.get(`/api/games/saregamapa/audio/${songId}/${segment}`),
}

/**
 * Store API
 */
export const storeAPI = {
  getProducts: (params?: { category?: string; featured?: boolean }) =>
    api.get<Product[]>('/api/store/products', { params }),

  getProductById: (id: string) =>
    api.get<Product>(`/api/store/products/${id}`),

  getFeaturedProducts: () =>
    api.get<Product[]>('/api/store/products/featured'),
}

/**
 * Recommendations API
 */
export const recommendationsAPI = {
  getToday: () =>
    api.get<{ movie: Movie; description: string; curator?: string }>('/api/recommendations/today'),

  getArchive: (params?: { page?: number; limit?: number }) =>
    api.get('/api/recommendations/archive', { params }),

  addToWatchlist: (movieId: string) =>
    api.post('/api/recommendations/watchlist', { movieId }),

  removeFromWatchlist: (movieId: string) =>
    api.delete(`/api/recommendations/watchlist/${movieId}`),

  markAsWatched: (movieId: string) =>
    api.patch(`/api/recommendations/watchlist/${movieId}`, { watched: true }),
}

// Export all APIs
export { api } from './client'
