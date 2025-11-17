import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { initializeGame, selectDailyMovie } from '@/lib/utils/gameLogic'
import { getTodayString } from '@/lib/utils'

export async function GET() {
  try {
    const today = getTodayString()

    // Check if daily challenge already exists
    let dailyChallenge = await prisma.dailyChallenge.findUnique({
      where: { date: new Date(today) },
      include: { movie: true },
    })

    // If no daily challenge exists, create one
    if (!dailyChallenge) {
      const movies = await prisma.movie.findMany()

      if (movies.length === 0) {
        return NextResponse.json(
          { error: 'No movies available' },
          { status: 404 }
        )
      }

      const movie = selectDailyMovie(movies, new Date(today))

      dailyChallenge = await prisma.dailyChallenge.create({
        data: {
          date: new Date(today),
          movieId: movie.id,
        },
        include: { movie: true },
      })
    }

    const gameState = initializeGame(dailyChallenge.movie.id)

    return NextResponse.json({
      gameState,
      movieId: dailyChallenge.movie.id,
      date: today,
    })
  } catch (error) {
    console.error('Error fetching daily challenge:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily challenge' },
      { status: 500 }
    )
  }
}
