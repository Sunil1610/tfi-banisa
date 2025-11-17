import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    // Get today's date to exclude today's recommendation
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [recommendations, total] = await Promise.all([
      prisma.dailyRecommendation.findMany({
        where: {
          date: {
            lt: today, // Only past recommendations
          },
        },
        skip,
        take: limit,
        orderBy: {
          date: 'desc',
        },
        include: {
          movie: true,
        },
      }),
      prisma.dailyRecommendation.count({
        where: {
          date: {
            lt: today,
          },
        },
      }),
    ])

    return NextResponse.json({
      recommendations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching recommendation archive:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recommendation archive' },
      { status: 500 }
    )
  }
}
