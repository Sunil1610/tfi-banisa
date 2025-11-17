import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { makeSongGuess } from '@/lib/utils/songGameLogic'
import type { SongGameState } from '@/types/game'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { songId, guess, gameState } = body as {
      songId: string
      guess: string
      gameState: SongGameState
    }

    if (!songId || !guess || !gameState) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const song = await prisma.song.findUnique({
      where: { id: songId },
    })

    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      )
    }

    const result = makeSongGuess(guess, song.title, gameState)

    // Save game statistics if game is finished
    if (result.gameState.gameStatus !== 'playing') {
      await prisma.songGameStats.create({
        data: {
          songId: song.id,
          guessCount: result.gameState.attempts,
          won: result.correct,
        },
      })
    }

    return NextResponse.json({
      correct: result.correct,
      gameState: result.gameState,
      song: result.correct || result.gameState.gameStatus === 'lost' ? song : undefined,
    })
  } catch (error) {
    console.error('Error processing guess:', error)
    return NextResponse.json(
      { error: 'Failed to process guess' },
      { status: 500 }
    )
  }
}
