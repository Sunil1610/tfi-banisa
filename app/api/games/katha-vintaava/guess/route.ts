import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { makeGuess } from '@/lib/utils/gameLogic'
import type { GameState } from '@/types/game'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { movieId, guess, gameState } = body as {
      movieId: string
      guess: string
      gameState: GameState
    }

    if (!movieId || !guess || !gameState) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    })

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    const result = makeGuess(guess, movie, gameState)

    // Save game statistics if game is finished
    if (result.gameState.gameStatus !== 'playing') {
      await prisma.gameStats.create({
        data: {
          movieId: movie.id,
          guessCount: result.gameState.attempts,
          won: result.correct,
        },
      })
    }

    return NextResponse.json({
      correct: result.correct,
      gameState: result.gameState,
      movie: result.correct || result.gameState.gameStatus === 'lost' ? movie : undefined,
    })
  } catch (error) {
    console.error('Error processing guess:', error)
    return NextResponse.json(
      { error: 'Failed to process guess' },
      { status: 500 }
    )
  }
}
