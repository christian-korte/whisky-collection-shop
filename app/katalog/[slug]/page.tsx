import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/products'
import ProductDetailClient from './ProductDetailClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} – Christians Whisky Sammlung`,
    description: product.description,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
