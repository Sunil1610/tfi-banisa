import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId, movieId, watched } = await request.json()

    if (!userId || !movieId) {
      return NextResponse.json(
        { error: 'userId and movieId are required' },
        { status: 400 }
      )
    }

    // Check if movie exists
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    })

    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    // Check if already in watchlist
    const existing = await prisma.watchlist.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    if (existing) {
      // Update watched status
      const updated = await prisma.watchlist.update({
        where: {
          userId_movieId: {
            userId,
            movieId,
          },
        },
        data: {
          watched: watched ?? existing.watched,
        },
      })
      return NextResponse.json(updated)
    } else {
      // Create new watchlist entry
      const watchlistItem = await prisma.watchlist.create({
        data: {
          userId,
          movieId,
          watched: watched ?? false,
        },
      })
      return NextResponse.json(watchlistItem)
    }
  } catch (error) {
    console.error('Error managing watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to manage watchlist' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const watchlist = await prisma.watchlist.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        movie: true,
      },
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch watchlist' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId, movieId } = await request.json()

    if (!userId || !movieId) {
      return NextResponse.json(
        { error: 'userId and movieId are required' },
        { status: 400 }
      )
    }

    await prisma.watchlist.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to remove from watchlist' },
      { status: 500 }
    )
  }
}
