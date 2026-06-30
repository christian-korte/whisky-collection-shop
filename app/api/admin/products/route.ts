import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, saveProducts } from '@/lib/products'
import { WhiskyProduct } from '@/types'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function GET() {
  return NextResponse.json(getAllProducts())
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const products = getAllProducts()

  let slug = generateSlug(body.name)
  if (products.some(p => p.slug === slug)) {
    slug = `${slug}-${Date.now()}`
  }

  const id = `product-${Date.now()}`
  const newProduct: WhiskyProduct = {
    id,
    slug,
    name: body.name,
    distillery: body.distillery,
    region: body.region,
    country: body.country,
    vintage: body.vintage ?? null,
    bottled: body.bottled ?? null,
    age: body.age ?? null,
    cask: body.cask ?? null,
    bottler: body.bottler,
    strength: body.strength,
    volume: body.volume,
    condition: body.condition ?? 'sealed',
    rating: body.rating ?? null,
    price: body.price,
    status: body.status ?? 'available',
    description: body.description ?? '',
    images: body.images ?? [],
    packIds: body.packIds ?? [],
    featured: body.featured ?? false,
  }

  products.push(newProduct)
  saveProducts(products)
  return NextResponse.json(newProduct, { status: 201 })
}
