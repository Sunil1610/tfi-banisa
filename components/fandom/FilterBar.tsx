'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui'

interface FilterBarProps {
  onGenreChange: (genre: string | null) => void
  selectedGenre: string | null
}

const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Romance',
  'Thriller',
  'Family',
  'Fantasy',
  'Horror',
  'Period',
  'Biopic',
  'Musical',
  'Sports',
]

export const FilterBar: React.FC<FilterBarProps> = ({
  onGenreChange,
  selectedGenre,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      onGenreChange(null)
    } else {
      onGenreChange(genre)
    }
  }

  const handleClearAll = () => {
    onGenreChange(null)
  }

  const visibleGenres = isExpanded ? GENRES : GENRES.slice(0, 6)
  const activeFiltersCount = selectedGenre ? 1 : 0

  return (
    <div className="bg-bg-secondary border border-border-primary rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-text-primary">Filter by Genre</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>

        {selectedGenre && (
          <button
            onClick={handleClearAll}
            className="text-sm text-accent-primary hover:text-accent-hover transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Genre Pills */}
      <div className="flex flex-wrap gap-2">
        {visibleGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedGenre === genre
                ? 'bg-accent-primary text-white'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary hover:text-text-primary border border-border-primary'
            }`}
          >
            {genre}
          </button>
        ))}

        {/* Show More/Less Button */}
        {GENRES.length > 6 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-bg-tertiary text-text-secondary hover:bg-bg-primary hover:text-text-primary border border-border-primary transition-all duration-200 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Show less
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                Show more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
