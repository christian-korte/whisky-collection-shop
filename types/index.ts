export interface WhiskyProduct {
  id: string
  slug: string
  name: string
  distillery: string
  region: string
  country: string
  vintage: number | null
  bottled: number | null
  age: number | null
  cask: string | null
  bottler: string
  strength: number
  volume: number
  condition: 'sealed' | 'opened'
  rating: { source: string; score: number } | null
  price: number
  status: 'available' | 'reserved' | 'sold'
  description: string
  images: string[]
  packIds: string[]
  featured: boolean
  whiskybaseUrl?: string
}

export interface Pack {
  id: string
  slug: string
  name: string
  description: string
  productIds: string[]
  price: number
  images: string[]
}
