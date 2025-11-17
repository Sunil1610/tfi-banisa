'use client'

import React from 'react'
import { Badge } from '@/components/ui'
import { ProductCategory } from '@/types/product'

interface StoreFilterBarProps {
  onCategoryChange: (category: ProductCategory | null) => void
  selectedCategory: ProductCategory | null
}

const CATEGORIES: ProductCategory[] = ['Poster', 'Apparel', 'Collectibles', 'Books', 'Other']

export const StoreFilterBar: React.FC<StoreFilterBarProps> = ({
  onCategoryChange,
  selectedCategory,
}) => {
  const handleCategoryClick = (category: ProductCategory) => {
    if (selectedCategory === category) {
      onCategoryChange(null)
    } else {
      onCategoryChange(category)
    }
  }

  const handleClearAll = () => {
    onCategoryChange(null)
  }

  const activeFiltersCount = selectedCategory ? 1 : 0

  return (
    <div className="bg-bg-secondary border border-border-primary rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-text-primary">Filter by Category</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>

        {selectedCategory && (
          <button
            onClick={handleClearAll}
            className="text-sm text-accent-primary hover:text-accent-hover transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-accent-primary text-white'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-primary hover:text-text-primary border border-border-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
