'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Movie } from '@/types/movie'
import {
  FeaturedSection,
  SearchBar,
  FilterBar,
  MovieGrid,
} from '@/components/fandom'
import { Button, Spinner } from '@/components/ui'

export default function FandomPage() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch featured movie
  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch('/api/movies/featured')
        if (response.ok) {
          const data = await response.json()
          setFeaturedMovie(data)
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error)
      } finally {
        setFeaturedLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  // Fetch movies
  const fetchMovies = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
      })

      if (searchQuery) {
        params.append('q', searchQuery)
      }

      if (selectedGenre) {
        params.append('genre', selectedGenre)
      }

      const response = await fetch(`/api/movies?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setMovies(data.movies)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery, selectedGenre])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handleGenreChange = useCallback((genre: string | null) => {
    setSelectedGenre(genre)
    setCurrentPage(1)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Telugu Cinema Fandom
        </h1>
        <p className="text-text-secondary">
          Explore the world of Telugu cinema - from classics to the latest blockbusters
        </p>
      </div>

      {/* Featured Section */}
      {featuredLoading ? (
        <div className="flex items-center justify-center h-64 bg-bg-secondary border border-border-primary rounded-2xl mb-8">
          <Spinner size="lg" />
        </div>
      ) : (
        featuredMovie && <FeaturedSection movie={featuredMovie} />
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          onGenreChange={handleGenreChange}
          selectedGenre={selectedGenre}
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : selectedGenre
            ? `${selectedGenre} Movies`
            : 'All Movies'}
        </h2>
      </div>

      {/* Movie Grid */}
      <MovieGrid movies={movies} loading={loading} />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === pageNum
                      ? 'bg-accent-primary text-white'
                      : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-border-primary'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <svg
              className="w-5 h-5"
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
        </div>
      )}
    </div>
  )
}
