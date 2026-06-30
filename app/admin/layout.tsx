import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="bg-[#1a1a1a] border-b border-amber-900/30 px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-playfair text-xl font-bold text-amber-500">
          Admin — Christians Whisky Sammlung
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#f5f0e8]/60 hover:text-amber-400 text-sm transition-colors">
            ← Zur Website
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
