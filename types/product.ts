export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  category: ProductCategory
  movieId?: string
  imageUrl: string[]
  purchaseUrl: string
  inStock: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export type ProductCategory = 'Poster' | 'Apparel' | 'Collectibles' | 'Books' | 'Other'
