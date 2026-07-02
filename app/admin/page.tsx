import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProducts } from '@/lib/products'
import StatusDropdown from './StatusDropdown'
import DeleteButton from './DeleteButton'
import PreisEdit from './PreisEdit'

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

      <div className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-900/30 text-[#f5f0e8]/60 text-left">
              <th className="px-3 py-3 w-14">Bild</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 hidden md:table-cell">Destillerie</th>
              <th className="px-4 py-3">Preis</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 hidden lg:table-cell">Featured</th>
              <th className="px-4 py-3 hidden lg:table-cell text-center">Besuche</th>
              <th className="px-4 py-3 hidden lg:table-cell text-center">Angebote</th>
              <th className="px-4 py-3">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const visits = stats.visits?.[product.slug] ?? 0
              const offers = stats.offers?.[product.id] ?? 0
              return (
                <tr key={product.id} className="border-b border-amber-900/20 hover:bg-[#111]">
                  <td className="px-3 py-2">
                    {product.images?.[0] ? (
                      <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded bg-amber-900/20 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-amber-900/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v4m6-4v4M9 11h6m-7 8h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#f5f0e8]">{product.name}</td>
                  <td className="px-4 py-3 text-[#f5f0e8]/70 hidden md:table-cell">{product.distillery}</td>
                  <td className="px-4 py-3">
                    <PreisEdit productId={product.id} currentPrice={product.price} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusDropdown productId={product.id} currentStatus={product.status} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#f5f0e8]/60">
                    {product.featured ? '⭐ Ja' : 'Nein'}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-center">
                    <span className={visits > 0 ? 'text-amber-400 font-semibold' : 'text-[#f5f0e8]/30'}>
                      {visits}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-center">
                    <span className={offers > 0 ? 'text-amber-400 font-semibold' : 'text-[#f5f0e8]/30'}>
                      {offers}
                    </span>
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
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
