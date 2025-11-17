'use client'

import React from 'react'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { Badge, Button } from '@/components/ui'
import { formatRelativeTime } from '@/lib/utils/dateUtils'

interface DailyRecommendation {
  id: string
  date: Date
  movieId: string
  movie: Movie
  description: string
  curator?: string
}

interface DailyPickCardProps {
  recommendation: DailyRecommendation
}

export const DailyPickCard: React.FC<DailyPickCardProps> = ({ recommendation }) => {
  const { movie, description, curator } = recommendation

  return (
    <div className="relative bg-gradient-to-br from-bg-secondary to-bg-tertiary border-2 border-accent-primary rounded-2xl overflow-hidden p-8">
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-accent-primary text-white px-4 py-2 rounded-lg font-semibold text-sm">
            TODAY'S PICK
          </div>
          <div className="text-text-tertiary text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Poster */}
        <div className="md:col-span-2">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-bg-tertiary shadow-2xl">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                <svg
                  className="w-24 h-24"
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

            {/* Rating Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-bg-primary/95 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-lg font-bold text-text-primary">
                  {movie.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 flex flex-col justify-center">
          {/* Title */}
          <h2 className="text-4xl font-bold text-text-primary mb-2">
            {movie.title}
          </h2>
          <p className="text-xl text-text-secondary mb-4">{movie.titleTelugu}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-text-secondary font-medium">{movie.year}</span>
            <span className="text-text-tertiary">•</span>
            <div className="flex flex-wrap gap-2">
              {movie.genre.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="primary" size="md">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-bg-primary/50 border border-border-primary rounded-lg p-4 mb-6">
            <p className="text-text-primary leading-relaxed mb-3">
              {description}
            </p>
            {curator && (
              <p className="text-sm text-text-tertiary italic">
                — Recommended by {curator}
              </p>
            )}
          </div>

          {/* Movie Details */}
          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-text-tertiary min-w-[100px] text-sm">
                Director:
              </span>
              <span className="text-text-primary text-sm font-medium">
                {movie.director}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-text-tertiary min-w-[100px] text-sm">
                Starring:
              </span>
              <span className="text-text-primary text-sm font-medium">
                {movie.leadActor}, {movie.leadActress}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/fandom/${movie.id}`}>
              <Button variant="primary" size="lg">
                View Details
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>

            {movie.trailerUrl && (
              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Watch Trailer
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 rounded-bl-full" />
    </div>
  )
}
