import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { initializeSongGame, selectDailySong } from '@/lib/utils/songGameLogic'
import { getTodayString } from '@/lib/utils'

export async function GET() {
  try {
    const today = getTodayString()

    // Check if daily song challenge already exists
    let dailyChallenge = await prisma.dailySongChallenge.findUnique({
      where: { date: new Date(today) },
      include: { song: true },
    })

    // If no daily challenge exists, create one
    if (!dailyChallenge) {
      const songs = await prisma.song.findMany()

      if (songs.length === 0) {
        return NextResponse.json(
          { error: 'No songs available' },
          { status: 404 }
        )
      }

      const song = selectDailySong(songs, new Date(today))

      dailyChallenge = await prisma.dailySongChallenge.create({
        data: {
          date: new Date(today),
          songId: song.id,
        },
        include: { song: true },
      })
    }

    const gameState = initializeSongGame(dailyChallenge.song.id)

    return NextResponse.json({
      gameState,
      songId: dailyChallenge.song.id,
      date: today,
    })
  } catch (error) {
    console.error('Error fetching daily song challenge:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily challenge' },
      { status: 500 }
    )
  }
}
