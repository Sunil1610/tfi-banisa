'use client'

import React, { useState } from 'react'
import type { Movie } from '@/types/movie'
import type { GameState } from '@/types/game'
import { Modal, Button } from '@/components/ui'
import { generateShareText } from '@/lib/utils/gameLogic'

interface GameResultModalProps {
  isOpen: boolean
  onClose: () => void
  won: boolean
  movie: Movie
  gameState: GameState
  onPlayAgain: () => void
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  onClose,
  won,
  movie,
  gameState,
  onPlayAgain,
}) => {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const shareText = generateShareText(gameState, won)
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center">
        {/* Result Icon */}
        <div className="mb-6">
          {won ? (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/20">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/20">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-text-primary">
          {won ? 'Congratulations!' : 'Game Over'}
        </h2>

        <p className="text-text-secondary mb-6">
          {won
            ? `You guessed it in ${gameState.attempts} ${
                gameState.attempts === 1 ? 'attempt' : 'attempts'
              }!`
            : 'Better luck next time!'}
        </p>

        {/* Movie Info */}
        <div className="bg-bg-tertiary rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-text-primary">
            {movie.title}
          </h3>
          <p className="text-sm text-text-secondary mb-3">{movie.titleTelugu}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-muted">Year:</span>
              <span className="ml-2 text-text-primary">{movie.year}</span>
            </div>
            <div>
              <span className="text-text-muted">Director:</span>
              <span className="ml-2 text-text-primary">{movie.director}</span>
            </div>
            <div className="col-span-2">
              <span className="text-text-muted">Cast:</span>
              <span className="ml-2 text-text-primary">
                {movie.leadActor}, {movie.leadActress}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genre.map((g, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button onClick={handleShare} variant="primary" className="w-full">
            {copied ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share Result
              </>
            )}
          </Button>

          <Button onClick={onPlayAgain} variant="secondary" className="w-full">
            Play Again
          </Button>
        </div>
      </div>
    </Modal>
  )
}
