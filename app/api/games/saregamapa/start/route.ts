import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { initializeSongGame, selectRandomSong } from '@/lib/utils/songGameLogic'

export async function POST() {
  try {
    const songs = await prisma.song.findMany()

    if (songs.length === 0) {
      return NextResponse.json(
        { error: 'No songs available' },
        { status: 404 }
      )
    }

    const song = selectRandomSong(songs)
    const gameState = initializeSongGame(song.id)

    return NextResponse.json({
      gameState,
      songId: song.id,
    })
  } catch (error) {
    console.error('Error starting song game:', error)
    return NextResponse.json(
      { error: 'Failed to start game' },
      { status: 500 }
    )
  }
}
