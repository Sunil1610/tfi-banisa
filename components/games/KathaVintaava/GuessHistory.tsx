'use client'

import React from 'react'

interface GuessHistoryProps {
  guesses: string[]
  maxAttempts: number
}

export const GuessHistory: React.FC<GuessHistoryProps> = ({
  guesses,
  maxAttempts,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide mb-3">
        Your Guesses ({guesses.length}/{maxAttempts})
      </h3>

      {guesses.length === 0 ? (
        <div className="text-center py-8 text-text-muted text-sm">
          No guesses yet. Start guessing!
        </div>
      ) : (
        <div className="space-y-2">
          {guesses.map((guess, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <span className="text-text-primary line-through opacity-60">
                {guess}
              </span>
              <span className="ml-auto text-xs text-text-muted">
                Attempt {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
