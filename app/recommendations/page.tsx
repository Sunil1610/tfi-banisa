'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Movie } from '@/types/movie'
import {
  DailyPickCard,
  RecommendationArchive,
  WatchlistButton,
} from '@/components/recommendations'
import { Button, Spinner } from '@/components/ui'

interface DailyRecommendation {
  id: string
  date: Date
  movieId: string
  movie: Movie
  description: string
  curator?: string
}

export default function RecommendationsPage() {
  const [todayRecommendation, setTodayRecommendation] =
    useState<DailyRecommendation | null>(null)
  const [pastRecommendations, setPastRecommendations] = useState<
    DailyRecommendation[]
  >([])
  const [loading, setLoading] = useState(true)
  const [archiveLoading, setArchiveLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch today's recommendation
  useEffect(() => {
    const fetchTodayRecommendation = async () => {
      try {
        const response = await fetch('/api/recommendations/today')
        if (response.ok) {
          const data = await response.json()
          setTodayRecommendation(data)
        }
      } catch (error) {
        console.error('Error fetching today\'s recommendation:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTodayRecommendation()
  }, [])

  // Fetch archive
  const fetchArchive = useCallback(async () => {
    setArchiveLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      })

      const response = await fetch(
        `/api/recommendations/archive?${params.toString()}`
      )
      if (response.ok) {
        const data = await response.json()
        setPastRecommendations(data.recommendations)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching archive:', error)
    } finally {
      setArchiveLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    fetchArchive()
  }, [fetchArchive])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Daily Recommendations
        </h1>
        <p className="text-text-secondary">
          Discover handpicked Telugu cinema gems, updated daily
        </p>
      </div>

      {/* Today's Recommendation */}
      <div className="mb-12">
        {loading ? (
          <div className="flex items-center justify-center h-96 bg-bg-secondary border border-border-primary rounded-2xl">
            <Spinner size="lg" />
          </div>
        ) : todayRecommendation ? (
          <>
            <DailyPickCard recommendation={todayRecommendation} />
            <div className="mt-4 flex justify-center">
              <WatchlistButton
                movieId={todayRecommendation.movieId}
                variant="primary"
                size="lg"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-bg-secondary border border-border-primary rounded-2xl">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No recommendation available
            </h3>
            <p className="text-text-secondary text-center max-w-md">
              Check back later for today's movie recommendation!
            </p>
          </div>
        )}
      </div>

      {/* Archive Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">
            Past Recommendations
          </h2>
        </div>

        {archiveLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <RecommendationArchive recommendations={pastRecommendations} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
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
          </>
        )}
      </div>
    </div>
  )
}
