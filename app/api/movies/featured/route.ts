import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    // Get the movie with highest popularity and rating
    const featuredMovie = await prisma.movie.findFirst({
      orderBy: [
        { popularity: 'desc' },
        { rating: 'desc' },
      ],
    })

    if (!featuredMovie) {
      return NextResponse.json(
        { error: 'No featured movie found' },
        { status: 404 }
      )
    }

    return NextResponse.json(featuredMovie)
  } catch (error) {
    console.error('Error fetching featured movie:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured movie' },
      { status: 500 }
    )
  }
}
