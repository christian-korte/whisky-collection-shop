import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { getAllProducts } from '@/lib/products'
import AdminProductTable from './AdminProductTable'

export const dynamic = 'force-dynamic'

function readStats(): { visits: Record<string, number>; offers: Record<string, number> } {
  try {
    const p = path.join(process.cwd(), 'data', 'stats.json')
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch {}
  return { visits: {}, offers: {} }
}

export default function AdminDashboard() {
  const products = getAllProducts()
  const stats = readStats()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-playfair text-2xl font-bold text-[#f5f0e8]">
          Produktverwaltung ({products.length} Flaschen)
        </h1>
        <Link
          href="/admin/products/neu"
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
        >
          + Neuer Whisky
        </Link>
      </div>
      <AdminProductTable products={products} stats={stats} />
    </div>
  )
}
