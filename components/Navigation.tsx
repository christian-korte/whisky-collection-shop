'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="relative bg-cover bg-center sticky top-0 z-40 border-b border-amber-900/30"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597202496047-8af47ddf05da?w=1920&q=80')" }}
    >
      {/* Dark overlay so text remains readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-playfair text-xl font-bold text-amber-500 hover:text-amber-400 transition-colors">
            Christians Whisky Sammlung
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/katalog" className="text-[#f5f0e8]/80 hover:text-amber-400 transition-colors text-sm font-medium">
              Katalog
            </Link>
            <Link href="/pakete" className="text-[#f5f0e8]/80 hover:text-amber-400 transition-colors text-sm font-medium">
              Pakete
            </Link>
            <Link href="/impressum" className="text-[#f5f0e8]/80 hover:text-amber-400 transition-colors text-sm font-medium">
              Impressum
            </Link>
            <Link href="/admin/login" className="text-[#f5f0e8]/40 hover:text-amber-400 transition-colors" aria-label="Admin-Login" title="Admin-Login">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z" />
              </svg>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#f5f0e8]/80 hover:text-amber-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-amber-900/30 flex flex-col gap-4">
            <Link href="/katalog" className="text-[#f5f0e8]/80 hover:text-amber-400 transition-colors" onClick={() => setMenuOpen(false)}>Katalog</Link>
            <Link href="/pakete" className="text-[#f5f0e8]/80 hover:text-amber-400 transition-colors" onClick={() => setMenuOpen(false)}>Pakete</Link>
            <Link href="/impressum" className="text-[#f5f0e8]/80 hover:text-amber-400 transition-colors" onClick={() => setMenuOpen(false)}>Impressum</Link>
            <Link href="/admin/login" className="text-[#f5f0e8]/40 hover:text-amber-400 transition-colors" onClick={() => setMenuOpen(false)}>Admin-Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
