'use client'

import { useState, useEffect } from 'react'

export default function EinstellungenPage() {
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [pwStatus, setPwStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [pwError, setPwError] = useState('')

  const [paypalLink, setPaypalLink] = useState('')
  const [paypalStatus, setPaypalStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [paypalError, setPaypalError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => setPaypalLink(d.paypalLink ?? ''))
      .catch(() => {})
  }, [])

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError('Passwörter stimmen nicht überein')
      return
    }
    setPwStatus('loading')
    setPwError('')
    const res = await fetch('/api/admin/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw }),
    })
    const data = await res.json()
    if (res.ok) {
      setPwStatus('success')
      setPwForm({ current: '', newPw: '', confirm: '' })
    } else {
      setPwStatus('error')
      setPwError(data.error ?? 'Fehler beim Ändern')
    }
  }

  async function handlePaypalSave(e: React.FormEvent) {
    e.preventDefault()
    setPaypalStatus('loading')
    setPaypalError('')
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paypalLink }),
    })
    if (res.ok) {
      setPaypalStatus('success')
    } else {
      setPaypalStatus('error')
      setPaypalError('Fehler beim Speichern')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-playfair text-2xl font-bold text-amber-500">Einstellungen</h1>

      {/* Passwort ändern */}
      <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6">
        <h2 className="text-[#f5f0e8] text-lg font-semibold mb-4">Passwort ändern</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-[#f5f0e8]/70 text-sm mb-1">Aktuelles Passwort</label>
            <input
              type="password"
              required
              value={pwForm.current}
              onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
              className="w-full bg-[#0f0f0f] border border-amber-900/30 rounded px-3 py-2 text-[#f5f0e8] focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-[#f5f0e8]/70 text-sm mb-1">Neues Passwort</label>
            <input
              type="password"
              required
              minLength={8}
              value={pwForm.newPw}
              onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))}
              className="w-full bg-[#0f0f0f] border border-amber-900/30 rounded px-3 py-2 text-[#f5f0e8] focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-[#f5f0e8]/70 text-sm mb-1">Passwort bestätigen</label>
            <input
              type="password"
              required
              value={pwForm.confirm}
              onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
              className="w-full bg-[#0f0f0f] border border-amber-900/30 rounded px-3 py-2 text-[#f5f0e8] focus:outline-none focus:border-amber-500"
            />
          </div>
          {pwError && <p className="text-red-400 text-sm">{pwError}</p>}
          {pwStatus === 'success' && <p className="text-green-400 text-sm">Passwort erfolgreich geändert!</p>}
          <button
            type="submit"
            disabled={pwStatus === 'loading'}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {pwStatus === 'loading' ? 'Wird gespeichert...' : 'Passwort ändern'}
          </button>
        </form>
      </section>

      {/* PayPal-Link */}
      <section className="bg-[#1a1a1a] border border-amber-900/30 rounded-lg p-6">
        <h2 className="text-[#f5f0e8] text-lg font-semibold mb-4">Zahlungsdaten</h2>
        <p className="text-[#f5f0e8]/60 text-sm mb-4">
          Der PayPal-Link wird Käufern nach der Kaufanfrage angezeigt.
        </p>
        <form onSubmit={handlePaypalSave} className="space-y-4">
          <div>
            <label className="block text-[#f5f0e8]/70 text-sm mb-1">PayPal.me-Link</label>
            <input
              type="url"
              value={paypalLink}
              onChange={e => setPaypalLink(e.target.value)}
              placeholder="https://paypal.me/deinname"
              className="w-full bg-[#0f0f0f] border border-amber-900/30 rounded px-3 py-2 text-[#f5f0e8] focus:outline-none focus:border-amber-500"
            />
          </div>
          {paypalError && <p className="text-red-400 text-sm">{paypalError}</p>}
          {paypalStatus === 'success' && <p className="text-green-400 text-sm">PayPal-Link gespeichert!</p>}
          <button
            type="submit"
            disabled={paypalStatus === 'loading'}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {paypalStatus === 'loading' ? 'Wird gespeichert...' : 'Speichern'}
          </button>
        </form>
      </section>

      {/* Navigation zurück */}
      <a href="/admin" className="inline-block text-amber-400 hover:text-amber-300 text-sm">
        ← Zurück zur Produktverwaltung
      </a>
    </div>
  )
}
