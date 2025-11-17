'use client'

import React from 'react'
import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { CardSkeleton } from '@/components/ui/Skeleton'

interface ProductWithMovie extends Product {
  movie?: {
    id: string
    title: string
    titleTelugu: string
    year: number
    posterUrl: string
  }
}

interface ProductGridProps {
  products: ProductWithMovie[]
  loading?: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          className="w-16 h-16 text-text-tertiary mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No products found</h3>
        <p className="text-text-secondary text-center max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
