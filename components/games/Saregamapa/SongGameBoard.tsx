'use client'

import React, { useState, useEffect } from 'react'
import type { SongGameState } from '@/types/game'
import { AudioPlayer } from './AudioPlayer'
import { AudioProgress } from './AudioProgress'
import { SongResultModal } from './SongResultModal'
import { GuessInput } from '../KathaVintaava/GuessInput'
import { GuessHistory } from '../KathaVintaava/GuessHistory'
import { Spinner } from '@/components/ui'
import { saregamapaAPI } from '@/lib/api'
import { useSaregamapaStore } from '@/store/gameStore'

interface Song {
  id: string
  title: string
  titleTelugu: string
  movie: string
  singers: string[]
  musicDirector: string
  lyricist: string
  year: number
  audioUrl: string
  audioSegments: any
  posterUrl: string
  popularity: number
}

interface SongGameBoardProps {
  mode: 'daily' | 'practice'
  allSongs: Song[]
}

export const SongGameBoard: React.FC<SongGameBoardProps> = ({ mode, allSongs }) => {
  const [gameState, setGameState] = useState<SongGameState | null>(null)
  const [songId, setSongId] = useState<string | null>(null)
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [guessing, setGuessing] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string>('')

  const { setCurrentGame, updateStatistics } = useSaregamapaStore()

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [mode])

  // Update audio URL when game state changes
  useEffect(() => {
    if (gameState && songId) {
      const currentSong = allSongs.find((s) => s.id === songId)
      if (currentSong && currentSong.audioSegments) {
        // Get the appropriate segment based on unlocked duration
        const segment = currentSong.audioSegments[gameState.unlockedDuration.toString()]
        if (segment) {
          setAudioUrl(segment)
        }
      }
    }
  }, [gameState, songId, allSongs])

  // Show result modal when game ends
  useEffect(() => {
    if (gameState && gameState.gameStatus !== 'playing' && song) {
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
          ? await saregamapaAPI.getDailyChallenge()
          : await saregamapaAPI.startGame()

      setGameState(response.gameState)
      setSongId(response.songId)
      setCurrentGame(response.gameState)
    } catch (error) {
      console.error('Failed to initialize game:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGuess = async (guess: string) => {
    if (!gameState || !songId || guessing) return

    setGuessing(true)
    try {
      const response = await saregamapaAPI.makeGuess({
        songId,
        guess,
        gameState,
      })

      setGameState(response.gameState)
      setCurrentGame(response.gameState)

      if (response.song) {
        setSong(response.song)
      }
    } catch (error) {
      console.error('Failed to process guess:', error)
    } finally {
      setGuessing(false)
    }
  }

  const handlePlayAgain = () => {
    setShowResultModal(false)
    setSong(null)
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

  // Convert songs to format compatible with GuessInput (which expects movies)
  const songsAsMovies = allSongs.map((s) => ({
    id: s.id,
    title: s.title,
    titleTelugu: s.titleTelugu,
    alternativeTitles: [],
    year: s.year,
    genre: [],
    leadActor: s.singers[0] || '',
    leadActress: '',
    director: s.musicDirector,
    plotHint: '',
    description: '',
    posterUrl: s.posterUrl,
    rating: 0,
    popularity: s.popularity,
    trivia: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3 text-text-primary">
          Saregamapa
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audio Player */}
        <div>
          <AudioPlayer
            audioUrl={audioUrl}
            maxDuration={gameState.unlockedDuration}
            autoPlay={false}
          />
        </div>

        {/* Audio Progress */}
        <div>
          <AudioProgress
            unlockedDuration={gameState.unlockedDuration}
            attempts={gameState.attempts}
          />
        </div>
      </div>

      {/* Guess Input */}
      {isGameActive && (
        <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">
            Guess the Song
          </h3>
          <GuessInput
            onGuess={handleGuess}
            disabled={guessing || !isGameActive}
            movies={songsAsMovies}
          />
          <p className="text-xs text-text-muted mt-3">
            Listen to the audio clip and type the song name
          </p>
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
      {song && (
        <SongResultModal
          isOpen={showResultModal}
          onClose={handleCloseModal}
          won={gameState.gameStatus === 'won'}
          song={song}
          gameState={gameState}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  )
}
