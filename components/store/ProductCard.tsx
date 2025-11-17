'use client'

import React from 'react'
import { Product } from '@/types/product'
import { Badge, Button } from '@/components/ui'

interface ProductWithMovie extends Product {
  movie?: {
    id: string
    title: string
    titleTelugu: string
    year: number
    posterUrl: string
  }
}

interface ProductCardProps {
  product: ProductWithMovie
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`
    }
    return `${currency} ${price.toLocaleString()}`
  }

  return (
    <div className="group relative bg-bg-secondary border border-border-primary rounded-xl overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-lg h-full flex flex-col">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-bg-tertiary">
        {product.imageUrl && product.imageUrl.length > 0 ? (
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-tertiary">
            <svg
              className="w-16 h-16"
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
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="secondary" size="sm">
            {product.category}
          </Badge>
          {product.featured && (
            <Badge variant="primary" size="sm">
              Featured
            </Badge>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-bg-primary border border-border-primary px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold text-text-secondary">
                Out of Stock
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
          {product.name}
        </h3>

        {/* Movie Association */}
        {product.movie && (
          <p className="text-sm text-text-tertiary mb-2 line-clamp-1">
            From: {product.movie.title} ({product.movie.year})
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-text-primary">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>
        </div>

        {/* Purchase Button */}
        <a
          href={product.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant={product.inStock ? 'primary' : 'secondary'}
            size="md"
            className="w-full"
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <>
                Buy Now
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </>
            ) : (
              'Out of Stock'
            )}
          </Button>
        </a>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/0 to-bg-primary/0 group-hover:from-bg-primary/30 group-hover:to-transparent pointer-events-none transition-all duration-300" />
    </div>
  )
}
