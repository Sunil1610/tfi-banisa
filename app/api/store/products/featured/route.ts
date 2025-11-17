import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        featured: true,
        inStock: true,
      },
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
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
    })

    return NextResponse.json(featuredProducts)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    )
  }
}
