import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'
import StatusBadge from '@/components/StatusBadge'
import PrivatverkaufBanner from '@/components/PrivatverkaufBanner'

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1000] to-[#0f0f0f] py-24 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1000]/60 to-[#0f0f0f]/80" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-4">Private Kollektion</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-[#f5f0e8] mb-6 leading-tight">
            Christians Whisky<br />
            <span className="text-amber-500">Sammlung</span>
          </h1>
          <p className="text-[#f5f0e8]/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Ausgewählte Einzelfassabfüllungen und Raritäten aus Schottland und Japan –
            über Jahre zusammengetragen, jetzt zu fairen Preisen abzugeben.
          </p>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Zur vollständigen Sammlung
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Privatverkauf Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PrivatverkaufBanner />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-[#f5f0e8]">Highlights der Sammlung</h2>
            <p className="text-[#f5f0e8]/50 mt-1">Die wertvollsten verfügbaren Flaschen</p>
          </div>
          <Link href="/katalog" className="text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium hidden sm:block">
            Alle ansehen →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <Link key={product.id} href={`/katalog/${product.slug}`} className="group block">
              <div className="bg-[#1a1a1a] border border-amber-900/20 rounded-xl overflow-hidden hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={product.status} />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-amber-500/70 text-xs font-medium uppercase tracking-wider mb-1">
                    {product.distillery} · {product.region}
                  </p>
                  <h3 className="font-playfair text-[#f5f0e8] font-semibold text-lg mb-3 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#f5f0e8]/50 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-amber-500">
                      {product.price.toLocaleString('de-DE')} €
                    </span>
                    {product.rating && (
                      <span className="text-xs text-[#f5f0e8]/40">
                        {product.rating.source}: {product.rating.score}/100
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 border border-amber-600/50 hover:border-amber-500 text-amber-500 hover:text-amber-400 font-medium px-8 py-3 rounded-xl transition-all"
          >
            Alle {'{'}10{'}'} Flaschen ansehen
          </Link>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="bg-[#111] border-y border-amber-900/20 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.575 1.399a.75.75 0 01-.98-.034L15 14.25m4.8.75l.75 2.625a.75.75 0 01-.519.932l-3 .75a.75.75 0 01-.932-.519L15 14.25m-8.25.75l-.75 2.625a.75.75 0 00.519.932l3 .75a.75.75 0 00.932-.519L11.25 15" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#f5f0e8] mb-2">Kuratierte Raritäten</h3>
              <p className="text-[#f5f0e8]/50 text-sm">Ausschließlich besondere Abfüllungen – keine Standard-Supermarkt-Whiskys.</p>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#f5f0e8] mb-2">Flexible Zahlung</h3>
              <p className="text-[#f5f0e8]/50 text-sm">PayPal oder Banküberweisung – unkompliziert und sicher.</p>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#f5f0e8] mb-2">Persönliche Übergabe</h3>
              <p className="text-[#f5f0e8]/50 text-sm">Bevorzugt persönliche Übergabe oder versicherter Versand nach Absprache.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
