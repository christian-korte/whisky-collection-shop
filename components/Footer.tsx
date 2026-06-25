import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-amber-900/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-lg font-bold text-amber-500 mb-3">Christians Whisky Sammlung</h3>
            <p className="text-[#f5f0e8]/60 text-sm">
              Private Kollektion – ausgewählte Einzelfassabfüllungen und Raritäten aus Schottland und Japan.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#f5f0e8]/90 mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/katalog" className="text-[#f5f0e8]/60 hover:text-amber-400 transition-colors">Katalog</Link></li>
              <li><Link href="/pakete" className="text-[#f5f0e8]/60 hover:text-amber-400 transition-colors">Pakete</Link></li>
              <li><Link href="/impressum" className="text-[#f5f0e8]/60 hover:text-amber-400 transition-colors">Impressum</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#f5f0e8]/90 mb-3">Kontakt</h4>
            <a href="mailto:info@christian-korte.com" className="text-amber-500 hover:text-amber-400 text-sm transition-colors">
              info@christian-korte.com
            </a>
            <p className="text-[#f5f0e8]/60 text-xs mt-3">
              Zahlung per PayPal oder Banküberweisung
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-amber-900/20 text-center">
          <p className="text-[#f5f0e8]/40 text-xs">
            Privatverkauf · Kein Gewerbe · Nur für Personen ab 18 Jahren
          </p>
        </div>
      </div>
    </footer>
  )
}
