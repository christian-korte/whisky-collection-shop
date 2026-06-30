import { getAllProducts } from '@/lib/products'
import KatalogClient from './KatalogClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Katalog – Christians Whisky Sammlung',
  description: 'Alle verfügbaren Whisky-Flaschen aus der privaten Sammlung von Christian Korte.',
}

export default function KatalogPage() {
  const products = getAllProducts()
  return <KatalogClient products={products} />
}
