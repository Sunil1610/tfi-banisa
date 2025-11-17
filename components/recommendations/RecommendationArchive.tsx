'use client'

import React from 'react'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { Badge } from '@/components/ui'
import { formatRelativeTime } from '@/lib/utils/dateUtils'

interface DailyRecommendation {
  id: string
  date: Date
  movieId: string
  movie: Movie
  description: string
  curator?: string
}

interface RecommendationArchiveProps {
  recommendations: DailyRecommendation[]
}

export const RecommendationArchive: React.FC<RecommendationArchiveProps> = ({
  recommendations,
}) => {
  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-bg-secondary border border-border-primary rounded-xl">
        <svg
          className="w-16 h-16 text-text-tertiary mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No past recommendations
        </h3>
        <p className="text-text-secondary text-center max-w-md">
          Check back tomorrow for more movie recommendations!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Link
          key={recommendation.id}
          href={`/fandom/${recommendation.movie.id}`}
          className="block"
        >
          <div className="group bg-bg-secondary border border-border-primary rounded-xl p-6 hover:border-border-hover transition-all duration-300 hover:shadow-lg">
            <div className="grid md:grid-cols-6 gap-6">
              {/* Poster */}
              <div className="md:col-span-1">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-bg-tertiary">
                  {recommendation.movie.posterUrl ? (
                    <img
                      src={recommendation.movie.posterUrl}
                      alt={recommendation.movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-5 flex flex-col justify-center">
                {/* Date */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-text-tertiary">
                    {formatRelativeTime(new Date(recommendation.date))}
                  </span>
                  <span className="text-text-tertiary">•</span>
                  <span className="text-sm text-text-tertiary">
                    {new Date(recommendation.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
                  {recommendation.movie.title}
                </h3>
                <p className="text-lg text-text-secondary mb-3">
                  {recommendation.movie.titleTelugu}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-text-primary">
                      {recommendation.movie.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-text-tertiary">•</span>
                  <span className="text-sm text-text-secondary">
                    {recommendation.movie.year}
                  </span>
                  <span className="text-text-tertiary">•</span>
                  <div className="flex flex-wrap gap-1.5">
                    {recommendation.movie.genre.slice(0, 3).map((genre) => (
                      <Badge key={genre} variant="secondary" size="sm">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm line-clamp-2 mb-2">
                  {recommendation.description}
                </p>

                {/* Curator */}
                {recommendation.curator && (
                  <p className="text-xs text-text-tertiary italic">
                    Recommended by {recommendation.curator}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
