import Image from 'next/image'
import Link from 'next/link'
import { getAllPacks, getProductsByIds } from '@/lib/products'

export const dynamic = 'force-dynamic'
import PrivatverkaufBanner from '@/components/PrivatverkaufBanner'
import StatusBadge from '@/components/StatusBadge'

export const metadata = {
  title: 'Pakete – Christians Whisky Sammlung',
  description: 'Kuratierte Whisky-Pakete aus der privaten Sammlung.',
}

export default function PaketePage() {
  const packs = getAllPacks()

  return (
    <div>
      {/* Page Header with Background */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1a1000] to-[#0f0f0f] py-16 px-4 mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1000]/70 to-[#0f0f0f]/90" />
        <div className="max-w-7xl mx-auto relative">
          <p className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-3">Sammlung</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-3">Kuratierte Pakete</h1>
          <p className="text-[#f5f0e8]/60 text-lg max-w-2xl">Ausgewählte Zusammenstellungen mehrerer Flaschen zu einem attraktiven Paketpreis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <PrivatverkaufBanner />
      </div>

      <div className="space-y-8">
        {packs.map(pack => {
          const products = getProductsByIds(pack.productIds)
          const totalSingle = products.reduce((sum, p) => sum + p.price, 0)
          const savings = totalSingle - pack.price

          return (
            <div key={pack.id} className="bg-[#1a1a1a] border border-amber-900/20 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Pack Image */}
                <div className="lg:col-span-2 relative aspect-video lg:aspect-auto min-h-[200px] bg-[#111]">
                  <Image
                    src={pack.images[0]}
                    alt={pack.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Pack Details */}
                <div className="lg:col-span-3 p-6 md:p-8">
                  <h2 className="font-playfair text-2xl font-bold text-[#f5f0e8] mb-2">{pack.name}</h2>
                  <p className="text-[#f5f0e8]/60 mb-6 leading-relaxed">{pack.description}</p>

                  {/* Products in Pack */}
                  <div className="space-y-3 mb-6">
                    {products.map(product => (
                      <div key={product.id} className="flex items-center justify-between bg-[#111] rounded-lg px-4 py-3">
                        <div className="flex items-center gap-3">
                          <StatusBadge status={product.status} />
                          <Link href={`/katalog/${product.slug}`} className="text-sm text-[#f5f0e8]/80 hover:text-amber-400 transition-colors">
                            {product.name}
                          </Link>
                        </div>
                        <span className="text-sm font-medium text-amber-500">
                          {product.price.toLocaleString('de-DE')} €
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-[#f5f0e8]/40 line-through">
                        Einzeln: {totalSingle.toLocaleString('de-DE')} €
                      </p>
                      <p className="text-sm text-green-400 font-medium">
                        Du sparst: {savings.toLocaleString('de-DE')} €
                      </p>
                      <p className="text-4xl font-bold text-amber-500 mt-1">
                        {pack.price.toLocaleString('de-DE')} €
                      </p>
                    </div>
                    <a
                      href={`mailto:info@christian-korte.com?subject=Kaufanfrage: ${encodeURIComponent(pack.name)}`}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      Paket anfragen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {packs.length === 0 && (
        <div className="text-center py-16 text-[#f5f0e8]/40">
          Aktuell sind keine Pakete verfügbar. Schau bald wieder vorbei.
        </div>
      )}
      </div>
    </div>
  )
}
