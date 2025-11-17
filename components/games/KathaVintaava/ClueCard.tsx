'use client'

import React from 'react'
import type { Clue } from '@/types/game'
import { getClueIcon, getClueLabel } from '@/lib/utils/gameLogic'

interface ClueCardProps {
  clue: Clue
  index: number
}

export const ClueCard: React.FC<ClueCardProps> = ({ clue, index }) => {
  const icon = getClueIcon(clue.type)
  const label = getClueLabel(clue.type)
  const isArray = Array.isArray(clue.value)

  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
        clue.revealed
          ? 'border-border-hover bg-bg-tertiary'
          : 'border-border-primary bg-bg-secondary'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`text-2xl transition-opacity duration-300 ${
              clue.revealed ? 'opacity-100' : 'opacity-30'
            }`}
          >
            {icon}
          </div>
          <h3
            className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
              clue.revealed ? 'text-text-primary' : 'text-text-tertiary'
            }`}
          >
            {label}
          </h3>
        </div>

        <div className="relative min-h-[3rem] flex items-center">
          {!clue.revealed ? (
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-text-muted text-sm">Locked</span>
            </div>
          ) : (
            <div
              className="animate-fadeIn"
              style={{
                animation: 'fadeIn 0.5s ease-in',
              }}
            >
              {isArray ? (
                <div className="flex flex-wrap gap-2">
                  {(clue.value as string[]).map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-text-primary text-lg font-medium">
                  {clue.value as string}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      {clue.revealed && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-primary/20">
          <div
            className="h-full bg-accent-primary"
            style={{
              width: '100%',
              animation: 'progressBar 0.5s ease-out',
            }}
          />
        </div>
      )}
    </div>
  )
}

// Add these keyframe animations to your globals.css
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// @keyframes progressBar {
//   from { width: 0; }
//   to { width: 100%; }
// }
