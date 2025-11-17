'use client'

import React from 'react'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import { Badge } from '@/components/ui'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/fandom/${movie.id}`}>
      <div className="group relative bg-bg-secondary border border-border-primary rounded-xl overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-lg h-full">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden bg-bg-tertiary">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-tertiary">
              <svg
                className="w-16 h-16"
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
          <div className="absolute top-3 right-3">
            <div className="bg-bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-text-primary">
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1 group-hover:text-accent-primary transition-colors">
            {movie.title}
          </h3>

          {/* Telugu Title */}
          <p className="text-sm text-text-secondary mb-2 line-clamp-1">
            {movie.titleTelugu}
          </p>

          {/* Year and Genre */}
          <div className="flex items-center gap-2 mb-3 text-sm text-text-tertiary">
            <span>{movie.year}</span>
            <span>•</span>
            <span className="line-clamp-1">{movie.genre.slice(0, 2).join(', ')}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {movie.genre.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="secondary" size="sm">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Cast Info */}
          <div className="mt-3 pt-3 border-t border-border-primary">
            <div className="text-xs text-text-tertiary space-y-1">
              <p className="line-clamp-1">
                <span className="text-text-secondary">Cast:</span> {movie.leadActor}, {movie.leadActress}
              </p>
              <p className="line-clamp-1">
                <span className="text-text-secondary">Director:</span> {movie.director}
              </p>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/0 to-bg-primary/0 group-hover:from-bg-primary/50 group-hover:to-transparent pointer-events-none transition-all duration-300" />
      </div>
    </Link>
  )
}
