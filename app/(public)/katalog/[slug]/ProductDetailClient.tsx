'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { WhiskyProduct } from '@/types'
import StatusBadge from '@/components/StatusBadge'
import KaufanfrageModal from '@/components/KaufanfrageModal'
import PrivatverkaufBanner from '@/components/PrivatverkaufBanner'

export default function ProductDetailClient({ product }: { product: WhiskyProduct }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    fetch('/api/stats/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: product.slug }),
    }).catch(() => {})
  }, [product.slug])

  // Sync selectedImage state when carousel scrolls (e.g. via swipe)
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedImage(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const details: { label: string; value: string | number | null }[] = [
    { label: 'Destillerie', value: product.distillery },
    { label: 'Region', value: product.region },
    { label: 'Land', value: product.country },
    { label: 'Jahrgang', value: product.vintage },
    { label: 'Abfülljahr', value: product.bottled },
    { label: 'Alter', value: product.age ? `${product.age} Jahre` : null },
    { label: 'Stärke', value: `${product.strength}% vol` },
    { label: 'Inhalt', value: `${product.volume} ml` },
    { label: 'Fass', value: product.cask },
    { label: 'Abfüller', value: product.bottler },
    { label: 'Zustand', value: product.condition === 'sealed' ? 'Originalverschlossen' : 'Geöffnet' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#f5f0e8]/40 mb-8">
        <Link href="/" className="hover:text-amber-400 transition-colors">Start</Link>
        <span className="mx-2">/</span>
        <Link href="/katalog" className="hover:text-amber-400 transition-colors">Katalog</Link>
        <span className="mx-2">/</span>
        <span className="text-[#f5f0e8]/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          {/* Embla Carousel — supports swipe on touch devices */}
          <div className="overflow-hidden rounded-2xl bg-[#111] mb-4" ref={emblaRef}>
            <div className="flex">
              {product.images.map((img, i) => (
                <div key={i} className="flex-none w-full relative aspect-[4/3]">
                  <Image
                    src={img}
                    alt={`${product.name} – Bild ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedImage(i)
                    emblaApi?.scrollTo(i)
                  }}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <p className="text-amber-500/70 text-sm font-medium uppercase tracking-wider">
              {product.distillery} · {product.region}
            </p>
            <StatusBadge status={product.status} />
          </div>

          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-4">
            {product.name}
          </h1>

          <p className="text-[#f5f0e8]/70 leading-relaxed mb-6">{product.description}</p>

          {/* Rating */}
          {product.rating && (
            <div className="mb-6">
              <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4 inline-flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{product.rating.score}</div>
                  <div className="text-xs text-amber-500/70">Punkte</div>
                </div>
                <div className="h-10 w-px bg-amber-800/40" />
                <div>
                  <div className="text-sm font-medium text-[#f5f0e8]/80">{product.rating.source}</div>
                  <div className="text-xs text-[#f5f0e8]/40">Bewertung</div>
                </div>
              </div>
              <div className="mt-2">
                <a
                  href={product.whiskybaseUrl ?? `https://www.whiskybase.com/search?q=${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400/60 hover:text-amber-400 transition-colors"
                >
                  Auf Whiskybase prüfen ↗
                </a>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            <span className="text-5xl font-bold text-amber-500">
              {product.price.toLocaleString('de-DE')} €
            </span>
          </div>

          {/* CTA */}
          {product.status === 'available' && (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-semibold px-10 py-4 rounded-xl transition-colors text-lg mb-6"
            >
              Kaufanfrage stellen
            </button>
          )}

          {product.status === 'reserved' && (
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4 mb-6">
              <p className="text-amber-400 font-medium">Diese Flasche ist bereits reserviert.</p>
              <p className="text-[#f5f0e8]/60 text-sm mt-1">
                Interesse trotzdem? Schreib an{' '}
                <a href="mailto:info@christian-korte.com" className="text-amber-400 hover:underline">
                  info@christian-korte.com
                </a>
              </p>
            </div>
          )}

          {product.status === 'sold' && (
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 mb-6">
              <p className="text-zinc-400 font-medium">Diese Flasche wurde bereits verkauft.</p>
            </div>
          )}

          <PrivatverkaufBanner />
        </div>
      </div>

      {/* Produktdaten Tabelle */}
      <div className="mt-12">
        <h2 className="font-playfair text-2xl font-bold text-[#f5f0e8] mb-6">Produktdetails</h2>
        <div className="bg-[#1a1a1a] border border-amber-900/20 rounded-xl overflow-hidden">
          <table className="w-full">
            <tbody>
              {details.filter(d => d.value !== null).map((detail, i) => (
                <tr key={detail.label} className={i % 2 === 0 ? 'bg-[#161616]' : ''}>
                  <td className="px-6 py-3 text-sm font-medium text-[#f5f0e8]/50 w-40">{detail.label}</td>
                  <td className="px-6 py-3 text-sm text-[#f5f0e8]/90">{detail.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-10">
        <Link href="/katalog" className="text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Zurück zum Katalog
        </Link>
      </div>

      {modalOpen && (
        <KaufanfrageModal
          productName={product.name}
          productId={product.id}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
