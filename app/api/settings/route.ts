import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json')

export async function GET() {
  if (existsSync(SETTINGS_PATH)) {
    try {
      const settings = JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'))
      // Nur öffentliche Daten zurückgeben (kein passwordHash oder ähnliches)
      return NextResponse.json({ paypalLink: settings.paypalLink ?? '' })
    } catch {}
  }
  return NextResponse.json({ paypalLink: '' })
}
