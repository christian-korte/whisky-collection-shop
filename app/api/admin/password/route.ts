import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'admin-settings.json')

function getPasswordHash(): string {
  if (existsSync(SETTINGS_PATH)) {
    try {
      const s = JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'))
      if (s.passwordHash) return s.passwordHash
    } catch {}
  }
  return process.env.ADMIN_PASSWORD_HASH ?? ''
}

export async function POST(request: NextRequest) {
  const { currentPassword, newPassword } = await request.json()

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Neues Passwort muss mindestens 8 Zeichen haben' }, { status: 400 })
  }

  const currentHash = getPasswordHash()
  const valid = await bcrypt.compare(currentPassword, currentHash)
  if (!valid) {
    return NextResponse.json({ error: 'Aktuelles Passwort ist falsch' }, { status: 401 })
  }

  const newHash = await bcrypt.hash(newPassword, 12)
  const settings = existsSync(SETTINGS_PATH)
    ? JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'))
    : {}
  settings.passwordHash = newHash
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2))

  return NextResponse.json({ success: true })
}
