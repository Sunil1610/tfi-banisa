import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { initializeGame, selectRandomMovie } from '@/lib/utils/gameLogic'

export async function POST() {
  try {
    const movies = await prisma.movie.findMany()

    if (movies.length === 0) {
      return NextResponse.json(
        { error: 'No movies available' },
        { status: 404 }
      )
    }

    const movie = selectRandomMovie(movies)
    const gameState = initializeGame(movie.id)

    return NextResponse.json({
      gameState,
      movieId: movie.id,
    })
  } catch (error) {
    console.error('Error starting game:', error)
    return NextResponse.json(
      { error: 'Failed to start game' },
      { status: 500 }
    )
  }
}
