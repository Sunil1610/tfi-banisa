'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui'

interface WatchlistButtonProps {
  movieId: string
  userId?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  movieId,
  userId = 'guest', // Default to guest user for demo
  variant = 'secondary',
  size = 'md',
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleWatchlistToggle = async () => {
    setLoading(true)
    try {
      if (isInWatchlist) {
        // Remove from watchlist
        const response = await fetch('/api/recommendations/watchlist', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            movieId,
          }),
        })

        if (response.ok) {
          setIsInWatchlist(false)
        }
      } else {
        // Add to watchlist
        const response = await fetch('/api/recommendations/watchlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            movieId,
            watched: false,
          }),
        })

        if (response.ok) {
          setIsInWatchlist(true)
        }
      }
    } catch (error) {
      console.error('Error toggling watchlist:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleWatchlistToggle}
      disabled={loading}
    >
      {isInWatchlist ? (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          In Watchlist
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add to Watchlist
        </>
      )}
    </Button>
  )
}
