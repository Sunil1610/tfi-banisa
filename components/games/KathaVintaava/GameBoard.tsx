'use client'

import React, { useState, useEffect } from 'react'
import type { Movie } from '@/types/movie'
import type { GameState, Clue } from '@/types/game'
import { ClueCard } from './ClueCard'
import { GuessInput } from './GuessInput'
import { GuessHistory } from './GuessHistory'
import { GameResultModal } from './GameResultModal'
import { Spinner } from '@/components/ui'
import { kathaVintaavaAPI } from '@/lib/api'
import { getCluesForMovie, revealNextClue } from '@/lib/utils/gameLogic'
import { useKathaVintaavaStore } from '@/store/gameStore'

interface GameBoardProps {
  mode: 'daily' | 'practice'
  allMovies: Movie[]
}

export const GameBoard: React.FC<GameBoardProps> = ({ mode, allMovies }) => {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [movieId, setMovieId] = useState<string | null>(null)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [clues, setClues] = useState<Clue[]>([])
  const [loading, setLoading] = useState(true)
  const [guessing, setGuessing] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)

  const { setCurrentGame, updateStatistics } = useKathaVintaavaStore()

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [mode])

  // Update clues when game state changes
  useEffect(() => {
    if (gameState && movieId) {
      const movieData = allMovies.find((m) => m.id === movieId)
      if (movieData) {
        const allClues = getCluesForMovie(movieData)
        const revealedClues = revealNextClue(gameState, allClues)
        setClues(revealedClues)
      }
    }
  }, [gameState, movieId, allMovies])

  // Show result modal when game ends
  useEffect(() => {
    if (gameState && gameState.gameStatus !== 'playing' && movie) {
      setShowResultModal(true)
      updateStatistics(
        gameState.gameStatus === 'won',
        gameState.attempts
      )
    }
  }, [gameState?.gameStatus])

  const initializeGame = async () => {
    setLoading(true)
    try {
      const response =
        mode === 'daily'
          ? await kathaVintaavaAPI.getDailyChallenge()
          : await kathaVintaavaAPI.startGame()

      setGameState(response.gameState)
      setMovieId(response.movieId)
      setCurrentGame(response.gameState)
    } catch (error) {
      console.error('Failed to initialize game:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGuess = async (guess: string) => {
    if (!gameState || !movieId || guessing) return

    setGuessing(true)
    try {
      const response = await kathaVintaavaAPI.makeGuess({
        movieId,
        guess,
        gameState,
      })

      setGameState(response.gameState)
      setCurrentGame(response.gameState)

      if (response.movie) {
        setMovie(response.movie)
      }
    } catch (error) {
      console.error('Failed to process guess:', error)
    } finally {
      setGuessing(false)
    }
  }

  const handlePlayAgain = () => {
    setShowResultModal(false)
    setMovie(null)
    initializeGame()
  }

  const handleCloseModal = () => {
    setShowResultModal(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!gameState) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Failed to load game. Please try again.</p>
      </div>
    )
  }

  const isGameActive = gameState.gameStatus === 'playing'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3 text-text-primary">
          Katha Vintaava
        </h1>
        <p className="text-text-secondary text-lg">
          {mode === 'daily' ? 'Daily Challenge' : 'Practice Mode'}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-border-primary">
          <span className="text-text-muted text-sm">Attempts:</span>
          <span className="font-semibold text-accent-primary">
            {gameState.attempts}/{gameState.maxAttempts}
          </span>
        </div>
      </div>

      {/* Clues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clues.map((clue, index) => (
          <ClueCard key={index} clue={clue} index={index} />
        ))}
      </div>

      {/* Guess Input */}
      {isGameActive && (
        <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">
            Make Your Guess
          </h3>
          <GuessInput
            onGuess={handleGuess}
            disabled={guessing || !isGameActive}
            movies={allMovies}
          />
        </div>
      )}

      {/* Guess History */}
      {gameState.guesses.length > 0 && (
        <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
          <GuessHistory
            guesses={gameState.guesses}
            maxAttempts={gameState.maxAttempts}
          />
        </div>
      )}

      {/* Result Modal */}
      {movie && (
        <GameResultModal
          isOpen={showResultModal}
          onClose={handleCloseModal}
          won={gameState.gameStatus === 'won'}
          movie={movie}
          gameState={gameState}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  )
}
