import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const movieId = searchParams.get('movieId')
    const featured = searchParams.get('featured')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (category) {
      where.category = category
    }

    if (movieId) {
      where.movieId = movieId
    }

    if (featured === 'true') {
      where.featured = true
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' },
        ],
        include: {
          movie: {
            select: {
              id: true,
              title: true,
              titleTelugu: true,
              year: true,
              posterUrl: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
