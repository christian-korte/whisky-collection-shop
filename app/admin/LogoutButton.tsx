'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/admin/login') return null

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-[#f5f0e8]/60 hover:text-red-400 transition-colors"
    >
      Abmelden
    </button>
  )
}
