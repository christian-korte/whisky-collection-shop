import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json')

function readSettings() {
  if (existsSync(SETTINGS_PATH)) {
    try {
      return JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'))
    } catch {}
  }
  return {}
}

export async function GET() {
  return NextResponse.json(readSettings())
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const settings = readSettings()

  // Nur erlaubte Felder aktualisieren
  if (body.paypalLink !== undefined) {
    settings.paypalLink = body.paypalLink
  }

  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2))
  return NextResponse.json({ success: true })
}
