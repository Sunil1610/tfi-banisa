'use client'

import React, { useEffect } from 'react'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { Spinner } from '@/components/ui'
import { formatDuration } from '@/lib/utils'

interface AudioPlayerProps {
  audioUrl: string
  maxDuration?: number
  autoPlay?: boolean
  onEnded?: () => void
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  maxDuration,
  autoPlay = false,
  onEnded,
}) => {
  const [state, controls] = useAudioPlayer()

  useEffect(() => {
    if (audioUrl) {
      controls.load(audioUrl)
    }
  }, [audioUrl])

  useEffect(() => {
    if (audioUrl && autoPlay && !state.loading) {
      controls.play()
    }
  }, [audioUrl, autoPlay, state.loading])

  const handlePlayPause = () => {
    if (state.isPlaying) {
      controls.pause()
    } else {
      controls.play()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    controls.seek(time)
  }

  const displayDuration = maxDuration || state.duration
  const displayCurrentTime = Math.min(state.currentTime, displayDuration)

  return (
    <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
      {state.error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Failed to load audio</p>
          <p className="text-sm text-text-muted">{state.error}</p>
        </div>
      ) : state.loading ? (
        <div className="flex items-center justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Waveform / Progress Bar */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max={displayDuration}
              step="0.1"
              value={displayCurrentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary"
              style={{
                background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${
                  (displayCurrentTime / displayDuration) * 100
                }%, var(--bg-tertiary) ${
                  (displayCurrentTime / displayDuration) * 100
                }%, var(--bg-tertiary) 100%)`,
              }}
            />
          </div>

          {/* Time Display */}
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>{formatDuration(Math.floor(displayCurrentTime))}</span>
            <span>{formatDuration(Math.floor(displayDuration))}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-accent-primary hover:bg-accent-hover transition-colors"
            >
              {state.isPlaying ? (
                <svg
                  className="w-6 h-6 text-bg-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-bg-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Replay Button */}
            <button
              onClick={() => controls.seek(0)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-tertiary hover:bg-accent-subtle transition-colors"
              title="Replay"
            >
              <svg
                className="w-5 h-5 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={state.volume}
                onChange={(e) => controls.setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
