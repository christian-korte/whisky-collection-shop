'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import PrivatverkaufBanner from '@/components/PrivatverkaufBanner'
import { WhiskyProduct } from '@/types'

type SortKey = 'price-asc' | 'price-desc' | 'name' | 'rating'
type StatusFilter = 'all' | 'available' | 'reserved' | 'sold'

export default function KatalogClient({ products }: { products: WhiskyProduct[] }) {
  const [region, setRegion] = useState('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [priceMax, setPriceMax] = useState(10000)
  const [sort, setSort] = useState<SortKey>('price-desc')

  const regions = useMemo(() => {
    const set = new Set(products.map(p => p.region))
    return ['all', ...Array.from(set).sort()]
  }, [products])

  const filtered = useMemo(() => {
    let list = [...products]
    if (region !== 'all') list = list.filter(p => p.region === region)
    if (status !== 'all') list = list.filter(p => p.status === status)
    list = list.filter(p => p.price <= priceMax)

    list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'rating') {
        const ra = a.rating?.score ?? 0
        const rb = b.rating?.score ?? 0
        return rb - ra
      }
      return 0
    })

    return list
  }, [products, region, status, priceMax, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold text-[#f5f0e8] mb-2">Gesamte Sammlung</h1>
        <p className="text-[#f5f0e8]/50">{filtered.length} von {products.length} Flaschen</p>
      </div>

      <div className="mb-6">
        <PrivatverkaufBanner />
      </div>

      {/* Filter Bar */}
      <div className="bg-[#1a1a1a] border border-amber-900/20 rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs text-[#f5f0e8]/50 mb-1 uppercase tracking-wider">Region</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="bg-[#111] border border-amber-900/30 rounded-lg px-3 py-2 text-[#f5f0e8] text-sm focus:outline-none focus:border-amber-600"
          >
            {regions.map(r => (
              <option key={r} value={r}>{r === 'all' ? 'Alle Regionen' : r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-[#f5f0e8]/50 mb-1 uppercase tracking-wider">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as StatusFilter)}
            className="bg-[#111] border border-amber-900/30 rounded-lg px-3 py-2 text-[#f5f0e8] text-sm focus:outline-none focus:border-amber-600"
          >
            <option value="all">Alle</option>
            <option value="available">Verfügbar</option>
            <option value="reserved">Reserviert</option>
            <option value="sold">Verkauft</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-[#f5f0e8]/50 mb-1 uppercase tracking-wider">
            Max. Preis: {priceMax.toLocaleString('de-DE')} €
          </label>
          <input
            type="range"
            min={100}
            max={10000}
            step={100}
            value={priceMax}
            onChange={e => setPriceMax(Number(e.target.value))}
            className="w-40 accent-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs text-[#f5f0e8]/50 mb-1 uppercase tracking-wider">Sortierung</label>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="bg-[#111] border border-amber-900/30 rounded-lg px-3 py-2 text-[#f5f0e8] text-sm focus:outline-none focus:border-amber-600"
          >
            <option value="price-desc">Preis absteigend</option>
            <option value="price-asc">Preis aufsteigend</option>
            <option value="name">Name A–Z</option>
            <option value="rating">Bewertung</option>
          </select>
        </div>

        <button
          onClick={() => { setRegion('all'); setStatus('all'); setPriceMax(10000); setSort('price-desc') }}
          className="text-xs text-amber-500/70 hover:text-amber-400 underline mt-auto pb-2"
        >
          Filter zurücksetzen
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#f5f0e8]/40">
          Keine Flaschen entsprechen den gewählten Filtern.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
