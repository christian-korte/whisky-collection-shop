'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Status = 'available' | 'reserved' | 'sold'

const statusColors: Record<Status, string> = {
  available: 'text-green-400',
  reserved: 'text-amber-400',
  sold: 'text-gray-500',
}

export default function StatusDropdown({
  productId,
  currentStatus,
}: {
  productId: string
  currentStatus: Status
}) {
  const [status, setStatus] = useState<Status>(currentStatus)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function handleChange(newStatus: Status) {
    setSaving(true)
    await fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setStatus(newStatus)
    setSaving(false)
    router.refresh()
  }

  return (
    <select
      value={status}
      onChange={e => handleChange(e.target.value as Status)}
      disabled={saving}
      className={`bg-[#0f0f0f] border border-amber-900/30 rounded px-2 py-1 text-sm ${statusColors[status]} focus:outline-none focus:border-amber-500`}
    >
      <option value="available">Verfügbar</option>
      <option value="reserved">Reserviert</option>
      <option value="sold">Verkauft</option>
    </select>
  )
}
