'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StatusDropdown from './StatusDropdown'
import DeleteButton from './DeleteButton'
import PreisEdit from './PreisEdit'

interface Product {
  id: string
  slug: string
  name: string
  distillery?: string
  price?: number
  status: 'available' | 'reserved' | 'sold'
  featured?: boolean
  images?: string[]
  region?: string
  category?: string
}

interface Stats {
  visits: Record<string, number>
  offers: Record<string, number>
}

interface Props {
  products: Product[]
  stats: Stats
}

type SortKey = 'name' | 'price' | 'status' | 'visits' | 'offers'
type FilterStatus = 'all' | 'available' | 'reserved' | 'sold'

export default function AdminProductTable({ products, stats }: Props) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const displayProducts = useMemo(() => {
    let list = products

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.distillery ?? '').toLowerCase().includes(q) ||
        (p.region ?? '').toLowerCase().includes(q)
      )
    }

    if (filterStatus !== 'all') {
      list = list.filter(p => p.status === filterStatus)
    }

    list = [...list].sort((a, b) => {
      let va: number | string = 0
      let vb: number | string = 0
      switch (sortKey) {
        case 'name':   va = a.name; vb = b.name; break
        case 'price':  va = a.price ?? 0; vb = b.price ?? 0; break
        case 'status': va = a.status; vb = b.status; break
        case 'visits': va = stats.visits?.[a.slug] ?? 0; vb = stats.visits?.[b.slug] ?? 0; break
        case 'offers': va = stats.offers?.[a.id] ?? 0; vb = stats.offers?.[b.id] ?? 0; break
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return list
  }, [products, stats, search, filterStatus, sortKey, sortDir])

  function SortHeader({ label, col, className }: { label: string; col: SortKey; className?: string }) {
    const active = sortKey === col
    const toggleSort = () => {
      if (active) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
      else { setSortKey(col); setSortDir('asc') }
    }
    return (
      <th
        className={`px-4 py-3 cursor-pointer select-none hover:text-amber-400 transition-colors ${active ? 'text-amber-400' : ''} ${className ?? ''}`}
        onClick={toggleSort}
      >
        {label}{' '}
        {active ? (sortDir === 'asc' ? '↑' : '↓') : <span className="opacity-30">↕</span>}
      </th>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          placeholder="Suche nach Name, Destillerie, Region…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-[#111] border border-amber-900/30 rounded-lg px-4 py-2 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-600 text-sm"
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as FilterStatus)}
          className="bg-[#111] border border-amber-900/30 rounded-lg px-4 py-2 text-[#f5f0e8] focus:outline-none focus:border-amber-600 text-sm"
        >
          <option value="all">Alle Status</option>
          <option value="available">Verfügbar</option>
          <option value="reserved">Reserviert</option>
          <option value="sold">Verkauft</option>
        </select>
      </div>

      {(search || filterStatus !== 'all') && (
        <p className="text-[#f5f0e8]/50 text-xs mb-3">
          {displayProducts.length} von {products.length} Flaschen
        </p>
      )}

      <div className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-900/30 text-[#f5f0e8]/60 text-left">
              <th className="px-3 py-3 w-14">Bild</th>
              <SortHeader label="Name" col="name" />
              <th className="px-4 py-3 hidden md:table-cell">Destillerie</th>
              <SortHeader label="Preis" col="price" />
              <SortHeader label="Status" col="status" />
              <th className="px-4 py-3 hidden lg:table-cell">Featured</th>
              <SortHeader label="Besuche" col="visits" className="hidden lg:table-cell text-center" />
              <SortHeader label="Angebote" col="offers" className="hidden lg:table-cell text-center" />
              <th className="px-4 py-3">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {displayProducts.map(product => {
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
                    <PreisEdit productId={product.id} currentPrice={product.price ?? 0} />
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
