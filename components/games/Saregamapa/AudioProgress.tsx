'use client'

import React from 'react'
import { AUDIO_SEGMENTS } from '@/lib/constants'
import { formatAudioDuration } from '@/lib/utils/songGameLogic'

interface AudioProgressProps {
  unlockedDuration: number
  attempts: number
}

export const AudioProgress: React.FC<AudioProgressProps> = ({
  unlockedDuration,
  attempts,
}) => {
  return (
    <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-text-primary">
        Audio Progress
      </h3>

      <div className="space-y-3">
        {AUDIO_SEGMENTS.map((duration, index) => {
          const isUnlocked = duration <= unlockedDuration
          const isCurrent = index === Math.min(attempts, AUDIO_SEGMENTS.length - 1)

          return (
            <div
              key={duration}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isUnlocked
                  ? 'bg-bg-tertiary border border-border-hover'
                  : 'bg-bg-primary border border-border-primary'
              } ${isCurrent ? 'ring-2 ring-accent-primary' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isUnlocked
                    ? 'bg-accent-primary/20 border border-accent-primary'
                    : 'bg-bg-secondary border border-border-primary'
                }`}
              >
                {isUnlocked ? (
                  <svg
                    className="w-4 h-4 text-accent-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-text-muted"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${
                      isUnlocked ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {formatAudioDuration(duration)}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    Attempt {index + 1}
                  </span>
                </div>
              </div>

              {isUnlocked && (
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span>Each wrong guess unlocks 5 more seconds</span>
      </div>
    </div>
  )
}
