import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    // Get today's date at midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Try to find today's recommendation
    let recommendation = await prisma.dailyRecommendation.findUnique({
      where: {
        date: today,
      },
      include: {
        movie: true,
      },
    })

    // If no recommendation exists for today, create one
    if (!recommendation) {
      // Find a movie that hasn't been recommended recently
      const recentRecommendations = await prisma.dailyRecommendation.findMany({
        orderBy: {
          date: 'desc',
        },
        take: 30, // Don't repeat movies from last 30 days
        select: {
          movieId: true,
        },
      })

      const excludedMovieIds = recentRecommendations.map((r) => r.movieId)

      // Find a highly-rated movie that hasn't been recommended recently
      const movie = await prisma.movie.findFirst({
        where: {
          id: {
            notIn: excludedMovieIds,
          },
        },
        orderBy: [
          { rating: 'desc' },
          { popularity: 'desc' },
        ],
      })

      if (movie) {
        recommendation = await prisma.dailyRecommendation.create({
          data: {
            date: today,
            movieId: movie.id,
            description: `A must-watch ${movie.genre.join(', ')} film that showcases the best of Telugu cinema.`,
            curator: 'Telugu Cinema Hub',
          },
          include: {
            movie: true,
          },
        })
      } else {
        return NextResponse.json(
          { error: 'No movies available for recommendation' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error('Error fetching today\'s recommendation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch today\'s recommendation' },
      { status: 500 }
    )
  }
}
