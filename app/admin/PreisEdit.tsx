'use client'

import { useState } from 'react'

export default function PreisEdit({ productId, currentPrice }: { productId: string; currentPrice: number }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(currentPrice))
  const [displayed, setDisplayed] = useState(currentPrice)
  const [error, setError] = useState('')

  async function save() {
    const parsed = parseFloat(value)
    if (isNaN(parsed) || parsed <= 0) {
      setError('Ungültiger Preis')
      return
    }
    setError('')
    const res = await fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parsed }),
    })
    if (res.ok) {
      setDisplayed(parsed)
      setEditing(false)
    } else {
      setError('Fehler beim Speichern')
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') { setEditing(false); setValue(String(displayed)); setError('') }
            }}
            onBlur={save}
            autoFocus
            className="w-24 bg-[#111] border border-amber-600 rounded px-2 py-1 text-amber-400 text-sm focus:outline-none"
          />
          <span className="text-amber-400 text-sm">€</span>
        </div>
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    )
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="text-amber-400 font-semibold hover:text-amber-300 transition-colors text-left"
      title="Klicken zum Bearbeiten"
    >
      {displayed.toLocaleString('de-DE')} €
    </button>
  )
}
