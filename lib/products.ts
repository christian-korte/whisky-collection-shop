import fs from 'fs'
import path from 'path'
import { WhiskyProduct, Pack } from '@/types'

const productsPath = path.join(process.cwd(), 'data', 'products.json')
const packsPath = path.join(process.cwd(), 'data', 'packs.json')

export function getAllProducts(): WhiskyProduct[] {
  return JSON.parse(fs.readFileSync(productsPath, 'utf-8')) as WhiskyProduct[]
}

export function getProductBySlug(slug: string): WhiskyProduct | undefined {
  return getAllProducts().find(p => p.slug === slug)
}

export function getFeaturedProducts(): WhiskyProduct[] {
  return getAllProducts()
    .filter(p => p.featured && p.status === 'available')
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
}

export function getAllPacks(): Pack[] {
  return JSON.parse(fs.readFileSync(packsPath, 'utf-8')) as Pack[]
}

export function getPackBySlug(slug: string): Pack | undefined {
  return getAllPacks().find(p => p.slug === slug)
}

export function getProductsByIds(ids: string[]): WhiskyProduct[] {
  return getAllProducts().filter(p => ids.includes(p.id))
}

export function saveProducts(products: WhiskyProduct[]): void {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8')
}

export function savePacks(packs: Pack[]): void {
  fs.writeFileSync(packsPath, JSON.stringify(packs, null, 2), 'utf-8')
}
