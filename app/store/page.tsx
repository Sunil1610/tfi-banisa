'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Product, ProductCategory } from '@/types/product'

// SEO Note: For client components, metadata should be set via Next.js head or layout
import { ProductGrid, StoreFilterBar } from '@/components/store'
import { Button, Spinner } from '@/components/ui'

interface ProductWithMovie extends Product {
  movie?: {
    id: string
    title: string
    titleTelugu: string
    year: number
    posterUrl: string
  }
}

export default function StorePage() {
  const [products, setProducts] = useState<ProductWithMovie[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/store/products/featured')
        if (response.ok) {
          const data = await response.json()
          setFeaturedProducts(data)
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setFeaturedLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
      })

      if (selectedCategory) {
        params.append('category', selectedCategory)
      }

      const response = await fetch(`/api/store/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleCategoryChange = useCallback((category: ProductCategory | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Telugu Cinema Store
        </h1>
        <p className="text-text-secondary">
          Explore exclusive merchandise from your favorite Telugu movies
        </p>
      </div>

      {/* Featured Products Section */}
      {!featuredLoading && featuredProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 3).map((product) => (
              <div key={product.id}>
                <div className="group relative bg-bg-secondary border border-border-primary rounded-xl overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-lg">
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
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-text-primary mb-3">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="primary" size="md" className="w-full">
                        Buy Now
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-6">
        <StoreFilterBar
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">
          {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
        </h2>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} loading={loading} />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === pageNum
                      ? 'bg-accent-primary text-white'
                      : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-border-primary'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  )
}
