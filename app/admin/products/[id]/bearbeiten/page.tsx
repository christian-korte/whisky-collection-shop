import { getAllProducts } from '@/lib/products'
import { notFound } from 'next/navigation'
import BearbeitenClient from './BearbeitenClient'

export const dynamic = 'force-dynamic'

export default function BearbeitenPage({ params }: { params: { id: string } }) {
  const products = getAllProducts()
  const product = products.find(p => p.id === params.id)
  if (!product) notFound()
  return <BearbeitenClient product={product} />
}
