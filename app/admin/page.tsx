import Link from 'next/link'
import { getAllProducts } from '@/lib/products'
import StatusDropdown from './StatusDropdown'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const products = getAllProducts()

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

      <div className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-900/30 text-[#f5f0e8]/60 text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 hidden md:table-cell">Destillerie</th>
              <th className="px-4 py-3">Preis</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 hidden lg:table-cell">Featured</th>
              <th className="px-4 py-3">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-amber-900/20 hover:bg-[#111]">
                <td className="px-4 py-3 text-[#f5f0e8]">{product.name}</td>
                <td className="px-4 py-3 text-[#f5f0e8]/70 hidden md:table-cell">{product.distillery}</td>
                <td className="px-4 py-3 text-amber-400 font-semibold">
                  {product.price.toLocaleString('de-DE')} €
                </td>
                <td className="px-4 py-3">
                  <StatusDropdown productId={product.id} currentStatus={product.status} />
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-[#f5f0e8]/60">
                  {product.featured ? '⭐ Ja' : 'Nein'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}/bearbeiten`}
                      className="text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Bearbeiten
                    </Link>
                    <DeleteButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
