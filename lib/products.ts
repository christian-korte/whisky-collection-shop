import productsData from '@/data/products.json'
import packsData from '@/data/packs.json'
import { WhiskyProduct, Pack } from '@/types'

export function getAllProducts(): WhiskyProduct[] {
  return productsData as WhiskyProduct[]
}

export function getProductBySlug(slug: string): WhiskyProduct | undefined {
  return (productsData as WhiskyProduct[]).find(p => p.slug === slug)
}

export function getFeaturedProducts(): WhiskyProduct[] {
  return (productsData as WhiskyProduct[])
    .filter(p => p.featured && p.status === 'available')
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
}

export function getAllPacks(): Pack[] {
  return packsData as Pack[]
}

export function getPackBySlug(slug: string): Pack | undefined {
  return (packsData as Pack[]).find(p => p.slug === slug)
}

export function getProductsByIds(ids: string[]): WhiskyProduct[] {
  return (productsData as WhiskyProduct[]).filter(p => ids.includes(p.id))
}
