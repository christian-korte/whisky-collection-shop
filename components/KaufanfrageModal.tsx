'use client'

import { useState } from 'react'

interface Props {
  productName: string
  productId: string
  onClose: () => void
}

export default function KaufanfrageModal({ productName, productId, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    ageConfirmed: false,
    privateConfirmed: false,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productName, productId }),
      })

      if (!res.ok) throw new Error('Fehler beim Senden')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut oder schreib direkt an info@christian-korte.com')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#1a1a1a] border border-amber-900/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-playfair text-xl font-bold text-[#f5f0e8]">Kaufanfrage</h2>
              <p className="text-amber-500/80 text-sm mt-1">{productName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
              aria-label="Schließen"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#f5f0e8] mb-2">Anfrage gesendet!</h3>
              <p className="text-[#f5f0e8]/70 text-sm mb-4">
                Ich melde mich in Kürze bei dir. Zahlung ist per PayPal möglich:
              </p>
              <a
                href="mailto:info@christian-korte.com"
                className="text-amber-400 font-medium"
              >
                info@christian-korte.com
              </a>
              <button
                onClick={onClose}
                className="mt-6 w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Schließen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#f5f0e8]/80 mb-1">
                  Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#111] border border-amber-900/30 rounded-lg px-4 py-2.5 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-600 transition-colors text-sm"
                  placeholder="Dein vollständiger Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#f5f0e8]/80 mb-1">
                  E-Mail <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#111] border border-amber-900/30 rounded-lg px-4 py-2.5 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-600 transition-colors text-sm"
                  placeholder="deine@email.de"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#f5f0e8]/80 mb-1">
                  Telefon <span className="text-[#f5f0e8]/40">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#111] border border-amber-900/30 rounded-lg px-4 py-2.5 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-600 transition-colors text-sm"
                  placeholder="+49 ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#f5f0e8]/80 mb-1">
                  Nachricht <span className="text-[#f5f0e8]/40">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[#111] border border-amber-900/30 rounded-lg px-4 py-2.5 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-amber-600 transition-colors text-sm resize-none"
                  placeholder="Fragen, Anmerkungen, Wunschtermin..."
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.ageConfirmed}
                    onChange={e => setForm(f => ({ ...f, ageConfirmed: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 accent-amber-500"
                  />
                  <span className="text-sm text-[#f5f0e8]/70">
                    Ich bestätige, dass ich mindestens 18 Jahre alt bin. <span className="text-amber-500">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.privateConfirmed}
                    onChange={e => setForm(f => ({ ...f, privateConfirmed: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 accent-amber-500"
                  />
                  <span className="text-sm text-[#f5f0e8]/70">
                    Ich nehme zur Kenntnis, dass es sich um einen Privatverkauf ohne Gewährleistungsrechte gem. § 437 BGB handelt. <span className="text-amber-500">*</span>
                  </span>
                </label>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/20 border border-red-900/30 rounded-lg p-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {status === 'sending' ? 'Wird gesendet...' : 'Anfrage absenden'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
