'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WhiskyProduct } from '@/types'

const inputCls =
  'w-full bg-[#0f0f0f] border border-amber-900/30 rounded px-3 py-2 text-[#f5f0e8] text-sm focus:outline-none focus:border-amber-500'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[#f5f0e8]/70 text-xs mb-1">{label}</label>
      {children}
    </div>
  )
}

export default function BearbeitenClient({ product }: { product: WhiskyProduct }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<string[]>(product.images)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    name: product.name,
    distillery: product.distillery,
    region: product.region,
    country: product.country,
    vintage: product.vintage != null ? String(product.vintage) : '',
    bottled: product.bottled != null ? String(product.bottled) : '',
    age: product.age != null ? String(product.age) : '',
    cask: product.cask ?? '',
    bottler: product.bottler,
    strength: String(product.strength),
    volume: String(product.volume),
    condition: product.condition,
    ratingSource: product.rating?.source ?? '',
    ratingScore: product.rating?.score != null ? String(product.rating.score) : '',
    whiskybaseUrl: product.whiskybaseUrl ?? '',
    price: String(product.price),
    status: product.status,
    description: product.description,
    featured: product.featured,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('slug', product.slug)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (res.ok) {
        const { url } = await res.json()
        setImages(prev => [...prev, url])
      }
    }
    setUploading(false)
    e.target.value = ''
  }

  async function handleDeleteImage(imageUrl: string) {
    const res = await fetch(`/api/admin/products/${product.id}/images`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    })
    if (res.ok) {
      setImages(prev => prev.filter(img => img !== imageUrl))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      name: form.name,
      distillery: form.distillery,
      region: form.region,
      country: form.country,
      vintage: form.vintage ? parseInt(form.vintage) : null,
      bottled: form.bottled ? parseInt(form.bottled) : null,
      age: form.age ? parseInt(form.age) : null,
      cask: form.cask || null,
      bottler: form.bottler,
      strength: parseFloat(form.strength),
      volume: parseInt(form.volume),
      condition: form.condition,
      rating:
        form.ratingSource && form.ratingScore
          ? { source: form.ratingSource, score: parseFloat(form.ratingScore) }
          : null,
      whiskybaseUrl: form.whiskybaseUrl || undefined,
      price: parseFloat(form.price),
      status: form.status,
      description: form.description,
      images,
      featured: form.featured,
    }

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Fehler beim Speichern')
    }
    setSaving(false)
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-playfair text-2xl font-bold text-[#f5f0e8] mb-6">
        Whisky bearbeiten: {product.name}
      </h1>
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded text-red-400 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basis-Infos */}
        <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6 space-y-4">
          <h2 className="text-amber-400 font-semibold mb-2">Basis-Informationen</h2>
          <Field label="Name *">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Destillerie *">
              <input
                name="distillery"
                value={form.distillery}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Abfüller *">
              <input
                name="bottler"
                value={form.bottler}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Region *">
              <input
                name="region"
                value={form.region}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Land">
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Beschreibung">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={inputCls + ' resize-none'}
            />
          </Field>
        </section>

        {/* Details */}
        <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6 space-y-4">
          <h2 className="text-amber-400 font-semibold mb-2">Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Jahrgang">
              <input
                name="vintage"
                type="number"
                value={form.vintage}
                onChange={handleChange}
                className={inputCls}
                placeholder="z.B. 1998"
              />
            </Field>
            <Field label="Abgefüllt">
              <input
                name="bottled"
                type="number"
                value={form.bottled}
                onChange={handleChange}
                className={inputCls}
                placeholder="z.B. 2020"
              />
            </Field>
            <Field label="Alter (Jahre)">
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Stärke (%)">
              <input
                name="strength"
                type="number"
                step="0.1"
                value={form.strength}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Inhalt (ml)">
              <input
                name="volume"
                type="number"
                value={form.volume}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Zustand">
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="sealed">Versiegelt</option>
                <option value="opened">Geöffnet</option>
              </select>
            </Field>
          </div>
          <Field label="Fasstyp">
            <input
              name="cask"
              value={form.cask}
              onChange={handleChange}
              className={inputCls}
              placeholder="z.B. Sherry Butt"
            />
          </Field>
        </section>

        {/* Rating */}
        <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6 space-y-4">
          <h2 className="text-amber-400 font-semibold mb-2">Rating (optional)</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Quelle">
              <input
                name="ratingSource"
                value={form.ratingSource}
                onChange={handleChange}
                className={inputCls}
                placeholder="z.B. Whisky Advocate"
              />
            </Field>
            <Field label="Punkte">
              <input
                name="ratingScore"
                type="number"
                step="0.1"
                value={form.ratingScore}
                onChange={handleChange}
                className={inputCls}
                placeholder="z.B. 95"
              />
            </Field>
          </div>
          <Field label="Whiskybase-URL (optional)">
            <input
              name="whiskybaseUrl"
              value={form.whiskybaseUrl}
              onChange={handleChange}
              className={inputCls}
              placeholder="https://www.whiskybase.com/whiskies/..."
            />
            {form.whiskybaseUrl && (
              <a
                href={form.whiskybaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-xs mt-1 inline-flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Auf Whiskybase öffnen
              </a>
            )}
          </Field>
        </section>

        {/* Preis & Status */}
        <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6 space-y-4">
          <h2 className="text-amber-400 font-semibold mb-2">Preis & Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Preis (€) *">
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                <option value="available">Verfügbar</option>
                <option value="reserved">Reserviert</option>
                <option value="sold">Verkauft</option>
              </select>
            </Field>
          </div>
          <label className="flex items-center gap-2 text-[#f5f0e8]/80 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="accent-amber-500"
            />
            Als Featured auf der Startseite anzeigen
          </label>
        </section>

        {/* Bestehende Bilder */}
        {images.length > 0 && (
          <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6 space-y-4">
            <h2 className="text-amber-400 font-semibold mb-2">Bestehende Bilder</h2>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    className="w-full h-24 object-cover rounded border border-amber-900/30"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Weitere Bilder hochladen */}
        <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6 space-y-4">
          <h2 className="text-amber-400 font-semibold mb-2">Weitere Bilder hochladen</h2>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageUpload}
            disabled={uploading}
            className="text-[#f5f0e8]/70 text-sm"
          />
          {uploading && <p className="text-amber-400 text-sm">Hochladen...</p>}
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded transition-colors"
          >
            {saving ? 'Speichern...' : 'Änderungen speichern'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="text-[#f5f0e8]/60 hover:text-[#f5f0e8] py-2 px-4 rounded transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  )
}
