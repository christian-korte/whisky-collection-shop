import Link from 'next/link'
import Image from 'next/image'
import StatusBadge from './StatusBadge'
import { WhiskyProduct } from '@/types'

export default function ProductCard({ product }: { product: WhiskyProduct }) {
  return (
    <Link href={`/katalog/${product.slug}`} className="group block">
      <div className="bg-[#1a1a1a] border border-amber-900/20 rounded-xl overflow-hidden hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
          <Image
            src={product.images[0] || 'https://placehold.co/800x600/1a1a1a/d97706?text=Whisky'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute top-3 left-3">
            <StatusBadge status={product.status} />
          </div>
        </div>
        <div className="p-4">
          <p className="text-amber-500/70 text-xs font-medium uppercase tracking-wider mb-1">
            {product.distillery} · {product.region}
          </p>
          <h3 className="font-playfair text-[#f5f0e8] font-semibold text-base mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="text-2xl font-bold text-amber-500">
              {product.price.toLocaleString('de-DE')} €
            </span>
            <span className="text-xs text-[#f5f0e8]/40">
              {product.strength}% · {product.volume}ml
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
